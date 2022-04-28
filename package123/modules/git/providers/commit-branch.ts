import { LoggerService } from '../../logger/services/logger.service';
import { LogLevel } from '../../logger/models/log-level';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';

export const CommitBranch = 'commitBranchToken';

export const CommitBranchProvider: Provider = {
  provide: CommitBranch,
  inject: [LoggerService],
  useFactory: (loggerService: LoggerService) => {
    loggerService.write('"CommitBranchToken" is not provided!', LogLevel.error);
    return null;
  },
};
