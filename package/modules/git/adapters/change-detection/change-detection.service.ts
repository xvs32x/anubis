import { Inject, Injectable } from '@nestjs/common';
import { LoggerService } from '../../../logger/services/logger.service';
import { Application } from '../../../../models/application';
import { LastTagService } from '../last-tag/last-tag.service';
import { CommitBranch } from '../../providers/commit-branch';
import { LogLevel } from '../../../logger/models/log-level';
import { GitInstanceService } from '../git-instance/git-instance.service';

@Injectable()
export class ChangeDetectionService {
  constructor(
    protected loggerService: LoggerService,
    protected lastTagService: LastTagService,
    protected gitInstanceService: GitInstanceService,
    @Inject(CommitBranch) protected commitBranch: string,
  ) {}
  async getIsChanged(app: Application): Promise<boolean> {
    try {
      const lastTag = await this.lastTagService.getLastTag(app);

      if (!lastTag) {
        return true;
      }

      const changes = await this.gitInstanceService
        .getInstance()
        .diffSummary([`${this.commitBranch}..${lastTag}`, ...app.path]);
      return !!changes.changed || !!changes.deletions || !!changes.insertions;
    } catch (e) {
      this.loggerService.write(e, LogLevel.error);
      process.exit(1);
    }
  }
}
