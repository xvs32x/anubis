import { injectable } from '../core/injector/injectable';
import { Application } from '../core/anubis/application.model';
import { GithubConfig } from './secondary/github-config/github-config';
import { GithubConfigService } from './secondary/github-config/github-config.service';
import { GithubApiService } from './secondary/github-api/github-api.service';
import { GitApiService } from '../git/secondary/git-api/git-api.service';
import { ReporterService } from '../core/reporter/reporter.service';
import { Config } from '../core/config/config';

@injectable()
export class GithubService {
  githubConfig: GithubConfig;
  constructor(
    protected githubConfigService: GithubConfigService,
    protected githubApiService: GithubApiService,
    protected gitApiService: GitApiService,
    protected reporterService: ReporterService,
    protected config: Config,
  ) {
    this.githubConfig = this.githubConfigService.getConfig();
  }
  async release(app: Application) {
    if (this.config.safeMode) {
      await this.preRelease(app);
      return;
    }
    const owner = this.githubConfig.owner;
    const repo = this.githubConfig.repo;
    // Try to get the repo to check url is right
    await this.githubApiService.getRepository(owner, repo);
    // Get last published tag and check if it hasn't published yet
    const currentTag = await this.gitApiService.getLastTag(app);
    const isPublished = await this.githubApiService.getLastTagHasPublished(
      owner,
      repo,
      currentTag,
    );
    if (!isPublished) {
      await this.githubApiService.createRelease(owner, repo, currentTag);
      this.reporterService.pushRowIntoTable({
        name: app.name,
        currentTag,
        isPublished: true,
      });
    }
  }
  protected async preRelease(app: Application) {
    const owner = this.githubConfig.owner;
    const repo = this.githubConfig.repo;
    // Try to get the repo to check url is right
    await this.githubApiService.getRepository(owner, repo);
    // Get last published tag and check if it hasn't published yet
    const currentTag = await this.gitApiService.getLastTag(app);
    const isPublished = await this.githubApiService.getLastTagHasPublished(
      owner,
      repo,
      currentTag,
    );
    this.reporterService.pushRowIntoTable({
      name: app.name,
      currentTag,
      willBePublished: !isPublished,
    });
  }
}
