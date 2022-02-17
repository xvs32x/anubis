import { Injectable } from '@nestjs/common';
import { LogLevel } from './log-level';

@Injectable()
export class LoggerService {
  write(message: string, level: LogLevel = LogLevel.info) {
    switch (level) {
      case LogLevel.error:
        console.error(message);
        break;
      default:
        console.log(message);
        break;
    }
  }
}
