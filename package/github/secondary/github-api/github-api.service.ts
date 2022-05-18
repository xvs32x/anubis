import { injectable } from '../../../core/injector/injectable';
import { Octokit } from 'octokit';
import { OctokitOptions } from '@octokit/core/dist-types/types';
import { GithubConfigService } from '../github-config/github-config.service';
import { GithubConfig } from '../github-config/github-config';
import { ReporterService } from '../../../core/reporter/reporter.service';
import { Config } from '../../../core/config/config';

@injectable()
export class GithubApiService {
  protected github: Octokit;
  protected githubConfig: GithubConfig;

  constructor(
    protected githubConfigService: GithubConfigService,
    protected reporterService: ReporterService,
    protected config: Config,
  ) {
    this.githubConfig = this.githubConfigService.getConfig();
  }

  async getRepository(owner: string, repo: string) {
    try {
      await this.getInstance().rest.repos.get({
        owner,
        repo,
      });
      return repo;
    } catch (e) {
      this.reporterService.shutdown(
        `Can not get repo ${owner}/${repo} from github. Please check if it is available. Original error: ${e.toString()}`,
      );
    }
  }

  async createRelease(owner, repo, tag) {
    try {
      await this.getInstance().rest.repos.createRelease({
        owner,
        repo,
        tag_name: tag,
      });
    } catch (e) {
      this.reporterService.shutdown(`Can not get create release ${tag}`);
      process.exit(1);
    }
  }

  async getLastTagHasPublished(
    owner: string,
    repo: string,
    tag: string,
  ): Promise<boolean> {
    try {
      await this.getInstance().rest.repos.getReleaseByTag({
        owner,
        repo,
        tag,
      });
      return true;
    } catch (err) {
      if (err.status !== 404) {
        this.reporterService.shutdown(
          `Unexpected error during getting the release ${tag}`,
        );
      }
      return false;
    }
  }

  getInstance(): Octokit {
    if (this.github) {
      return this.github;
    }

    this.github = this.configure({
      auth: this.githubConfig.token,
    });

    return this.github;
  }

  protected configure(options: OctokitOptions): Octokit {
    return new Octokit(options);
  }
}
