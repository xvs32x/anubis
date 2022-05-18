import simpleGit, { SimpleGit } from 'simple-git';
import { GitConfigService } from '../git-config/git-config.service';
import { SimpleGitOptions } from 'simple-git/src/lib/types';
import { Application } from '../../../core/anubis/application.model';
import { ReporterService } from '../../../core/reporter/reporter.service';
import {
  BranchSummary,
  ConfigGetResult,
  PushResult,
} from 'simple-git/typings/response';
import { injectable } from '../../../core/injector/injectable';
import { GitConfig } from '../git-config/git-config';

@injectable()
export class GitApiService {
  protected git: SimpleGit;
  protected config: GitConfig;
  constructor(
    protected gitConfigService: GitConfigService,
    protected reporterService: ReporterService,
  ) {
    this.config = this.gitConfigService.getConfig();
  }
  async getAppIsChangedSinceLastTag(app: Application): Promise<boolean> {
    const branch = await this.getCurrentBranch();
    try {
      const lastTag = await this.getLastTag(app);

      if (!lastTag) {
        return true;
      }

      const changes = await this.getInstance().diffSummary([
        `${branch}..${lastTag}`,
        ...app.path,
      ]);
      return !!changes.changed || !!changes.deletions || !!changes.insertions;
    } catch (e) {
      this.reporterService.shutdown(new Error(e));
    }
  }
  async getRepoUrl(): Promise<string> {
    try {
      const config: ConfigGetResult = await this.getInstance().getConfig(
        'remote.origin.url',
      );
      return config.value;
    } catch (e) {
      this.reporterService.shutdown(new Error(e));
    }
  }
  async getCurrentBranch(): Promise<string> {
    try {
      const branches: BranchSummary = await this.getInstance().branch();
      return branches.current;
    } catch (e) {
      this.reporterService.shutdown(new Error(e));
    }
  }
  async addNewTag(tag: string): Promise<PushResult> {
    const repoUrl = await this.getRepoUrl();
    try {
      await this.getInstance().addAnnotatedTag(tag, '');
      return await this.getInstance().pushTags(['--repo', repoUrl]);
    } catch (e) {
      this.reporterService.shutdown(new Error(e));
    }
  }
  async getLastTag(app: Application): Promise<string | undefined> {
    try {
      const tags = await this.getInstance().tags(['-l', `${app.name}-*`]);
      return tags.latest;
    } catch (e) {
      this.reporterService.shutdown(new Error(e));
    }
  }
  getInstance(): SimpleGit {
    if (this.git) {
      return this.git;
    }

    this.git = this.configure(this.config.gitConfig);

    return this.git;
  }
  protected configure(config: SimpleGitOptions): SimpleGit {
    const gitInstance = simpleGit();

    for (const field in config) {
      gitInstance.addConfig(field, config[field]);
    }

    return gitInstance;
  }
}
