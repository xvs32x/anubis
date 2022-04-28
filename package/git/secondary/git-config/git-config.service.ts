import { injectable } from '../../../core/injector/injectable';
import { ReporterService } from '../../../core/reporter/reporter.service';
import { GitConfig } from './git-config';

@injectable()
export class GitConfigService {
  undefinedMessage = 'Property %s should have valid value!';
  constructor(
    protected reporterService: ReporterService,
    protected gitConfig: GitConfig,
  ) {}
  getConfig(): GitConfig {
    if (this.checkIsUndefined(this.gitConfig.repoUrl)) {
      this.reporterService.shutdown(this.undefinedMessage, 'repoUrl');
    }
    if (this.checkIsUndefined(this.gitConfig.commitBranch)) {
      this.reporterService.shutdown(this.undefinedMessage, 'commitBranch');
    }
    return this.gitConfig;
  }
  protected checkIsUndefined(value: any) {
    return typeof value === 'undefined';
  }
}
