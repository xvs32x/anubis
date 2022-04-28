import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { LoggerService } from '../../logger/services/logger.service';
import { LogLevel } from '../../logger/models/log-level';

export const GithubOwner = 'GithubOwnerToken';

export const GithubOwnerProvider: Provider = {
  provide: GithubOwner,
  inject: [LoggerService],
  useFactory: (loggerService: LoggerService) => {
    loggerService.write('"GithubOwner" is not provided!', LogLevel.error);
    return null;
  },
};
