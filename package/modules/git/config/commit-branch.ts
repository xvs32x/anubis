import { LoggerService } from '../../logger/services/logger.service';
import { LogLevel } from '../../logger/models/log-level';

export const CommitBranchToken = 'commitBranchToken';

export const CommitBranchFactory = {
  provide: CommitBranchToken,
  useFactory: (loggerService: LoggerService) => {
    loggerService.write('"CommitBranchToken" is not provided!', LogLevel.error);
    return null;
  },
  inject: [LoggerService],
};
