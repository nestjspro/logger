import { Module, DynamicModule } from '@nestjs/common';
import { LoggerService } from './LoggerService';
import { LoggerConfig } from './LoggerConfig';

@Module({})
export class LoggerModule {

    public static forRoot(config: LoggerConfig): DynamicModule {

        return {

            module: LoggerModule,

            providers: [

                LoggerService,
                {

                    provide: 'LOGGER_CONFIG',
                    useValue: config

                }

            ],

            exports: [

                LoggerService

            ]

        };

    }

}
