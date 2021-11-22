import { Backend } from '../Backend';
import { LogMessage } from '../../LogMessage';
import { Client } from '@elastic/elasticsearch';
import { ElasticsearchBackendConfig } from './ElasticsearchBackendConfig';
import { LogLevel } from '../../LogLevel';
import * as os from 'os';

export class ElasticsearchBackend implements Backend {

    public config: ElasticsearchBackendConfig;

    private client: Client;

    public constructor(config: ElasticsearchBackendConfig) {

        this.config = config;
        this.client = new Client(config.clientOptions);

    }

    public emit<T>(message: LogMessage<T>): void {

        this.client.index({

            index: message.index || this.config.index,
            body: {

                date: message.date || new Date(),
                hostname: message.hostname || os.hostname(),
                level: {

                    number: message.level,
                    name: LogLevel[ message.level ]

                },
                message: message.message

            }

        });

    }

}
