import { injectable } from '../core/injector/injectable';
import { GitConfigService } from './secondary/git-config/git-config.service';
import { GitApiService } from './secondary/git-api/git-api.service';
import { Application } from '../core/anubis/application.model';
import { GitSemverService } from './secondary/git-semver/git-semver.service';
import { ReporterService } from '../core/reporter/reporter.service';
import { GitConfig } from './secondary/git-config/git-config';
import { Config } from '../core/config/config';

@injectable()
export class GitService {
  gitConfig: GitConfig;
  constructor(
    protected gitConfigService: GitConfigService,
    protected gitApiService: GitApiService,
    protected gitSemverService: GitSemverService,
    protected reporterService: ReporterService,
    protected config: Config,
  ) {
    this.gitConfig = this.gitConfigService.getConfig();
  }
  async release(app: Application): Promise<void> {
    if (this.config.safeMode) {
      await this.preRelease(app);
      return;
    }
    // const isChanged = await this.gitApiService.getAppIsChangedSinceLastTag(app);
    // if (isChanged) {
    //   const currentTag = await this.gitApiService.getLastTag(app);
    //   const currentVersion = currentTag
    //     ? this.gitSemverService.convertTagToVersion(currentTag)
    //     : this.gitConfig.defaultVersion;
    //   const nextVersion = this.gitSemverService.getNextVersion(currentVersion);
    //   const nextTag = this.gitSemverService.convertVersionToTag(
    //     app,
    //     nextVersion,
    //   );
    //   this.reporterService.pushRowIntoTable({
    //     name: app.name,
    //     currentTag,
    //     nextTag,
    //   });
    //   await this.gitApiService.addNewTag(nextTag);
    // }
  }
  protected async preRelease(app: Application) {
    const isChanged = await this.gitApiService.getAppIsChangedSinceLastTag(app);
    const currentTag = await this.gitApiService.getLastTag(app);
    const currentVersion = currentTag
      ? this.gitSemverService.convertTagToVersion(currentTag)
      : this.gitConfig.defaultVersion;
    const nextVersion = this.gitSemverService.getNextVersion(currentVersion);
    const nextTag = isChanged
      ? this.gitSemverService.convertVersionToTag(app, nextVersion)
      : false;
    this.reporterService.pushRowIntoTable({
      name: app.name,
      isChanged,
      currentTag,
      nextTag,
    });
  }
}
