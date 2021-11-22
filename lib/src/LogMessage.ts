import { LogLevel } from './LogLevel';
import { LogConfig } from './LogConfig';

export interface LogMessage<T> {

    hostname?: string;
    date?: Date;
    level?: LogLevel;
    message: T;
    index?: string;
    config?: LogConfig;

}
