import { injectable } from '../../../core/injector/injectable';
import { ReporterService } from '../../../core/reporter/reporter.service';
import { GitConfig } from './git-config';

@injectable()
export class GitConfigService {
  constructor(
    protected reporterService: ReporterService,
    protected gitConfig: GitConfig,
  ) {}
  getConfig(): GitConfig {
    return this.gitConfig;
  }
}
