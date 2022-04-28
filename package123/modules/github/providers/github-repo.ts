import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { LoggerService } from '../../logger/services/logger.service';
import { LogLevel } from '../../logger/models/log-level';

export const GithubRepo = 'GithubRepoToken';

export const GithubRepoProvider: Provider = {
  provide: GithubRepo,
  inject: [LoggerService],
  useFactory: (loggerService: LoggerService) => {
    loggerService.write('"GithubRepo" is not provided!', LogLevel.error);
    return null;
  },
};
