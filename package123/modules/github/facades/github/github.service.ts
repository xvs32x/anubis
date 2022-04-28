import { Inject, Injectable } from '@nestjs/common';
import { Application } from '../../../../models/application';
import { SafeMode } from '../../../config/providers/safe-mode';
import { GitService } from '../../../git/facades/git/git.service';
import { GithubInstanceService } from '../../services/github-instance/github-instance.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { LogLevel } from '../../../logger/models/log-level';
import { GithubOwner } from '../../providers/github-owner';
import { GithubRepo } from '../../providers/github-repo';

@Injectable()
export class GithubService {
  constructor(
    protected gitService: GitService,
    protected githubInstanceService: GithubInstanceService,
    protected loggerService: LoggerService,
    @Inject(SafeMode) protected safeMode: boolean,
    @Inject(GithubOwner) protected githubOwner: string,
    @Inject(GithubRepo) protected githubRepo: string,
  ) {}
  async release(app: Application) {
    const owner = this.githubOwner;
    const repo = this.githubRepo;
    // Try to get the repo to check url is right
    await this.getRepository(owner, repo);
    // Get last published tag and check if it hasn't published yet
    const lastTag = await this.gitService.getLastTag(app);
    const isPublished = await this.getLastTagHasPublished(owner, repo, lastTag);
    if (!isPublished) {
      await this.createRelease(owner, repo, lastTag);
    } else {
      this.loggerService.write(`Tag ${lastTag} already published. Canceled.`);
    }
  }

  async getRepository(owner: string, repo: string) {
    try {
      await this.githubInstanceService.getInstance().rest.repos.get({
        owner,
        repo,
      });
      return repo;
    } catch (e) {
      this.loggerService.write(
        `Can not get repo ${owner}/${repo} from gitlab. Please check if it is available`,
        LogLevel.error,
      );
      process.exit(1);
    }
  }

  async getLastTagHasPublished(
    owner: string,
    repo: string,
    tag: string,
  ): Promise<boolean> {
    try {
      await this.githubInstanceService
        .getInstance()
        .rest.repos.getReleaseByTag({
          owner,
          repo,
          tag,
        });
      return true;
    } catch (err) {
      if (err.status === 404) {
        this.loggerService.write(`Tag ${tag} has not published. Publishing...`);
        return false;
      } else {
        this.loggerService.write(
          `Unexpected error during getting the release ${tag}`,
          LogLevel.error,
        );
        process.exit();
      }
    }
  }

  async createRelease(owner, repo, tag) {
    try {
      await this.githubInstanceService.getInstance().rest.repos.createRelease({
        owner,
        repo,
        tag_name: tag,
      });
      this.loggerService.write(`${tag} published successfully!`);
    } catch (e) {
      this.loggerService.write(
        `Can not get create release ${tag}`,
        LogLevel.error,
      );
      process.exit(1);
    }
  }
}
