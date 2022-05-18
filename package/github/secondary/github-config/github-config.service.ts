import { injectable } from '../../../core/injector/injectable';
import { GithubConfig } from './github-config';
import { ReporterService } from '../../../core/reporter/reporter.service';

@injectable()
export class GithubConfigService {
  constructor(
    protected githubConfig: GithubConfig,
    protected reporterService: ReporterService,
  ) {}
  getConfig(): GithubConfig {
    if (!this.githubConfig.owner) {
      this.reporterService.shutdown('GithubConfig owner must be set');
    }
    if (!this.githubConfig.repo) {
      this.reporterService.shutdown('GithubConfig repo must be set');
    }
    if (!this.githubConfig.token) {
      this.reporterService.shutdown('GithubConfig token must be set');
    }
    return this.githubConfig;
  }
}
