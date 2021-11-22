import { Module } from '@nestjs/common';
import { AppService } from './AppService';
import { LogLevel } from '../../lib/dist/LogLevel';
import { ConsoleBackend } from '../../lib/dist/backends/console/ConsoleBackend';
import { ElasticsearchBackend } from '../../lib/dist/backends/elasticsearch/ElasticsearchBackend';
import { LoggerModule } from '../../lib/dist/LoggerModule';

@Module({

    imports: [

        LoggerModule.forRoot({

            backends: [

                new ConsoleBackend({

                    name: 'console',
                    level: LogLevel.TRACE

                }),

                new ElasticsearchBackend({

                    name: 'es',
                    level: LogLevel.TRACE,
                    index: 'test-default',
                    clientOptions: {

                        nodes: [ 'http://localhost:9200' ]

                    }
                })

            ]

        })

    ],

    providers: [ AppService ]

})
export class AppModule {

}
