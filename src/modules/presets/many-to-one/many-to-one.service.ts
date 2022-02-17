import { Inject, Injectable } from '@nestjs/common';
import { Preset } from '../preset';
import { LoggerService } from '../../logger/logger.service';
import { SafeModeToken } from '../../config/safe-mode';

@Injectable()
export class ManyToOneService implements Preset {
  constructor(
    @Inject(SafeModeToken) protected safeMode: boolean,
    protected loggerService: LoggerService,
  ) {}
  publish() {
    if (this.safeMode) {
      this.loggerService.write(
        'Script is running in safe mode. Nothing is going to be released',
      );
    }
  }
}
