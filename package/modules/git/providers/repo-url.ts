import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { LoggerService } from '../../logger/services/logger.service';
import { LogLevel } from '../../logger/models/log-level';

export const RepoUrl = 'RepoUrlToken';

export const RepoUrlProvider: Provider = {
  provide: RepoUrl,
  inject: [LoggerService],
  useFactory: (loggerService: LoggerService) => {
    loggerService.write('"RepoUrlToken" is not provided!', LogLevel.error);
    return null;
  },
};
