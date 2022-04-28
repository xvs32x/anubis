import { Injectable } from '@nestjs/common';
import { LogLevel } from '../models/log-level';

@Injectable()
export class LoggerService {
  write(message: string, level: LogLevel = LogLevel.info) {
    switch (level) {
      case LogLevel.error:
        throw new Error(message);
      default:
        console.log(message);
        break;
    }
  }
}
