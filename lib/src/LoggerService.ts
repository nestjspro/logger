import { Injectable, Inject } from '@nestjs/common';
import { LoggerConfig } from './LoggerConfig';
import { LogMessage } from './LogMessage';
import { LogLevel } from './LogLevel';

@Injectable()
export class LoggerService {

    private config: LoggerConfig;

    public constructor(@Inject('LOGGER_CONFIG') config: LoggerConfig) {

        this.config = config;

    }

    /**
     * Emit a raw message and do not form our own object that gets indexed.
     *
     * @param message
     * @param {Array<string>} backends
     */
    public raw<T>(message: LogMessage<T>): void {

        if (message.config && message.config.backends) {

            if (Array.isArray(message.config.backends)) {

                for (let i = 0; i < message.config.backends.length; i++) {

                    this.config.backends.filter(backend => backend.config.name === message.config.backends[ i ]).forEach(backend => backend.raw(message));

                }

            } else {

                this.config.backends.filter(backend => backend.config.name === message.config.backends).forEach(backend => backend.raw(message));

            }

        } else {

            this.config.backends.forEach(backend => backend.raw(message));

        }

    }

    /**
     * Emit a well formed log message.
     *
     * @param {LogMessage<T>} message
     */
    public log<T>(message: LogMessage<T>): void {

        if (message.config && message.config.backends) {

            if (Array.isArray(message.config.backends)) {

                for (let i = 0; i < message.config.backends.length; i++) {

                    this.config.backends.filter(backend => backend.config.name === message.config.backends[ i ]).forEach(backend => backend.emit(message));

                }

            } else {

                this.config.backends.filter(backend => backend.config.name === message.config.backends).forEach(backend => backend.emit(message));

            }

        } else {

            this.config.backends.forEach(backend => backend.emit(message));

        }

    }

    /**
     * Helper method to emit a message at the debug level.
     *
     * @param {LogMessage<T> | string | T} message
     */
    public error<T>(message: LogMessage<T> | T | string): void {

        if (message[ 'message' ]) {

            (message as LogMessage<T>).level = LogLevel.ERROR;

            this.log(message as LogMessage<T>);

        } else {

            this.log({ level: LogLevel.ERROR, message });

        }

    }

    /**
     * Helper method to emit a message at the debug level.
     *
     * @param {LogMessage<T> | string | T} message
     */
    public info<T>(message: LogMessage<T> | T | string): void {

        if (message[ 'message' ]) {

            (message as LogMessage<T>).level = LogLevel.INFO;

            this.log(message as LogMessage<T>);

        } else {

            this.log({ level: LogLevel.INFO, message });

        }

    }

    /**
     * Helper method to emit a message at the debug level.
     *
     * @param {LogMessage<T> | string | T} message
     */
    public debug<T>(message: LogMessage<T> | T | string): void {

        if (message[ 'message' ]) {

            (message as LogMessage<T>).level = LogLevel.DEBUG;

            this.log(message as LogMessage<T>);

        } else {

            this.log({ level: LogLevel.DEBUG, message });

        }

    }

    /**
     * Helper method to emit a message at the WARNING level.
     *
     * @param {LogMessage<T> | string | T} message
     */
    public warning<T>(message: LogMessage<T> | T | string): void {

        if (message[ 'message' ]) {

            (message as LogMessage<T>).level = LogLevel.WARNING;

            this.log(message as LogMessage<T>);

        } else {

            this.log({ level: LogLevel.WARNING, message });

        }

    }

    /**
     * Helper method to emit a message at the critical level.
     *
     * @param {LogMessage<T> | string | T} message
     */
    public critical<T>(message: LogMessage<T> | T | string): void {

        if (message[ 'message' ]) {

            (message as LogMessage<T>).level = LogLevel.CRITICAL;

            this.log(message as LogMessage<T>);

        } else {

            this.log({ level: LogLevel.CRITICAL, message });

        }

    }

}
