import { LogMessage } from '../LogMessage';
import { BackendConfig } from './BackendConfig';

export interface Backend {

    config: BackendConfig;

    emit<T>(message: LogMessage<T>): void;

    raw<T>(message: LogMessage<T>): void;

}
