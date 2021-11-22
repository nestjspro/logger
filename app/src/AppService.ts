import { Injectable } from '@nestjs/common';
import { LogLevel } from '../../lib/dist/LogLevel';
import { LoggerService } from '../../lib/dist/LoggerService';
import { CustomMessage } from './CustomMessage';

@Injectable()
export class AppService {

    public constructor(private readonly loggerService: LoggerService) {

        loggerService.log({

            level: LogLevel.DEBUG,
            message: {
                a: 'b',
                one: 2,
                test: 'only console'
            },
            config: { backends: 'console' }

        });

        loggerService.log({

            level: LogLevel.DEBUG,
            index: 'test-1',
            message: {
                a: 'b',
                one: 2,
                test: 'only elasticsearch'
            },
            config: { backends: 'es' }

        });

        loggerService.log<CustomMessage>({

            level: LogLevel.DEBUG,
            index: 'test-1',
            message: {
                fieldA: 'b',
                fieldB: 2
            },
            config: { backends: [ 'console', 'es' ] }

        });

        loggerService.debug<CustomMessage>({
            fieldA: 'b',
            fieldB: 2
        });
        loggerService.info<CustomMessage>({
            fieldA: 'b',
            fieldB: 2
        });


    }

}
