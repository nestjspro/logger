import { Injectable } from '@nestjs/common';
import { LogLevel } from '../../lib/dist/LogLevel';
import { LoggerService } from '../../lib/dist/LoggerService';
import { CustomMessage } from './CustomMessage';

@Injectable()
export class AppService {

    public constructor(private readonly loggerService: LoggerService) {

        loggerService.log({

            config: { backends: 'console' },

            level: LogLevel.DEBUG,
            message: {
                a: 'b',
                one: 2,
                test: 'only console'
            }

        });

        loggerService.log({

            config: { backends: 'es' },

            level: LogLevel.DEBUG,
            index: 'test-1',
            message: {
                a: 'b',
                one: 2,
                test: 'only elasticsearch'
            }

        });

        loggerService.log<CustomMessage>({

            config: { backends: [ 'console', 'es' ] },

            level: LogLevel.DEBUG,
            index: 'test-1',
            message: {
                fieldA: 'b',
                fieldB: 2
            }

        });

        loggerService.debug<CustomMessage>({

            fieldA: 'b',
            fieldB: 2

        });

        loggerService.info<CustomMessage>({

            fieldA: 'b',
            fieldB: 2

        });

        loggerService.raw<any>({

            config: { backends: [ 'es' ] },
            message: {

                '@timestamp': new Date(),
                a: 'raw message',
                b: 123

            }

        });

        loggerService.raw<any>({

            message: {

                '@timestamp': new Date(),
                a: 'raw message',
                b: 123

            }

        });

    }

}
