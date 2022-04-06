import { Inject, Injectable } from '@nestjs/common';
import { Application } from '../../../../models/application';
import { GitFacadeService } from '../../services/git-facade/git-facade.service';
import { TableOfChangesService } from '../table-of-changes/table-of-changes.service';
import { SafeMode } from '../../../config/providers/safe-mode';
import { LoggerService } from '../../../logger/services/logger.service';
import { DefaultVersion } from '../../providers/default-version';

@Injectable()
export class GitReleaseService {
  constructor(
    protected gitFacadeService: GitFacadeService,
    protected tableOfChangeService: TableOfChangesService,
    protected loggerService: LoggerService,
    @Inject(SafeMode) protected safeMode: boolean,
    @Inject(DefaultVersion) protected defaultVersion: string,
  ) {}
  async release(app: Application): Promise<void> {
    if (this.safeMode) {
      await this.preRelease(app);
      return;
    }
    const isChanged = await this.gitFacadeService.getIsContainChanges(app);
    if (isChanged) {
      const currentTag = await this.gitFacadeService.getLastTag(app);
      const currentVersion = currentTag
        ? this.gitFacadeService.convertTagToVersion(currentTag)
        : this.defaultVersion;
      const nextVersion = this.gitFacadeService.getNextVersion(currentVersion);
      const nextTag = this.gitFacadeService.convertVersionToTag(
        app,
        nextVersion,
      );
      this.tableOfChangeService.push({ name: app.name, currentTag, nextTag });
      await this.gitFacadeService.addNewTag(nextTag);
    }
  }
  protected async preRelease(app: Application) {
    this.loggerService.write(
      `${app.name}: SafeMode is set. Nothing is going to be released.`,
    );
    const isChanged = await this.gitFacadeService.getIsContainChanges(app);
    const currentTag = await this.gitFacadeService.getLastTag(app);
    const currentVersion = currentTag
      ? this.gitFacadeService.convertTagToVersion(currentTag)
      : this.defaultVersion;
    const nextVersion = this.gitFacadeService.getNextVersion(currentVersion);
    const nextTag = isChanged
      ? this.gitFacadeService.convertVersionToTag(app, nextVersion)
      : false;
    this.tableOfChangeService.push({
      name: app.name,
      isChanged,
      currentTag,
      nextTag,
    });
  }
}
