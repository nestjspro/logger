import { LogLevel } from '../../LogLevel';
import { ClientOptions } from '@elastic/elasticsearch';

export interface ElasticsearchBackendConfig {

    name: string;
    level?: LogLevel;
    index?: string;
    clientOptions: ClientOptions;

}
