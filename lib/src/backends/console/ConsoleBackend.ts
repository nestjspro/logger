import { Backend } from '../Backend';
import { LogMessage } from '../../LogMessage';
import { ConsoleBackendConfig } from './ConsoleBackendConfig';

export class ConsoleBackend implements Backend {

    public config: ConsoleBackendConfig;

    public constructor(config: ConsoleBackendConfig) {

        this.config = config;

    }

    public emit<T>(message: LogMessage<T>): void {

        console.log(JSON.stringify(message));

    }


    public raw<T>(message: LogMessage<T>): void {

        console.log(JSON.stringify(message));

    }

}
