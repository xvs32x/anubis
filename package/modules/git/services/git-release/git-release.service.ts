import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Application } from '../../../../models/application';
import { GitService } from '../../facades/git/git.service';
import { SafeMode } from '../../../config/providers/safe-mode';
import { LoggerService } from '../../../logger/services/logger.service';
import { DefaultVersion } from '../../providers/default-version';
import { ReporterService } from '../../../reporter/facades/reporter/reporter/reporter.service';

@Injectable()
export class GitReleaseService {
  constructor(
    @Inject(forwardRef(() => GitService)) protected gitService: GitService,
    protected reporterService: ReporterService,
    protected loggerService: LoggerService,
    @Inject(SafeMode) protected safeMode: boolean,
    @Inject(DefaultVersion) protected defaultVersion: string,
  ) {}
  async release(app: Application): Promise<void> {
    if (this.safeMode) {
      await this.preRelease(app);
      return;
    }
    const isChanged = await this.gitService.getIsContainChanges(app);
    if (isChanged) {
      const currentTag = await this.gitService.getLastTag(app);
      const currentVersion = currentTag
        ? this.gitService.convertTagToVersion(currentTag)
        : this.defaultVersion;
      const nextVersion = this.gitService.getNextVersion(currentVersion);
      const nextTag = this.gitService.convertVersionToTag(app, nextVersion);
      this.reporterService.tableOfChanges.push({
        name: app.name,
        currentTag,
        nextTag,
      });
      await this.gitService.addNewTag(nextTag);
    }
  }
  protected async preRelease(app: Application) {
    this.loggerService.write(
      `${app.name}: SafeMode is set. Nothing is going to be released.`,
    );
    const isChanged = await this.gitService.getIsContainChanges(app);
    const currentTag = await this.gitService.getLastTag(app);
    const currentVersion = currentTag
      ? this.gitService.convertTagToVersion(currentTag)
      : this.defaultVersion;
    const nextVersion = this.gitService.getNextVersion(currentVersion);
    const nextTag = isChanged
      ? this.gitService.convertVersionToTag(app, nextVersion)
      : false;
    this.reporterService.tableOfChanges.push({
      name: app.name,
      isChanged,
      currentTag,
      nextTag,
    });
  }
}
