import { Injectable } from '@nestjs/common';
import { ChangeDetectionService } from '../../adapters/change-detection/change-detection.service';
import { Application } from '../../../../models/application';
import { LastTagService } from '../../adapters/last-tag/last-tag.service';
import { NewTagService } from '../../adapters/new-tag/new-tag.service';
import { NextVersionService } from '../../adapters/next-version/next-version.service';
import { TagToVersionService } from '../../adapters/tag-to-version/tag-to-version.service';
import { VersionToTagService } from '../../adapters/version-to-tag/version-to-tag.service';
import { PushResult } from 'simple-git/typings/response';

@Injectable()
export class GitFacadeService {
  constructor(
    protected changeDetectionService: ChangeDetectionService,
    protected lastTagService: LastTagService,
    protected newTagService: NewTagService,
    protected nextVersionService: NextVersionService,
    protected tagToVersionService: TagToVersionService,
    protected versionToTagService: VersionToTagService,
  ) {}
  getIsContainChanges(app: Application): Promise<boolean> {
    return this.changeDetectionService.getIsChanged(app);
  }
  getLastTag(app: Application): Promise<string | undefined> {
    return this.lastTagService.getLastTag(app);
  }
  addNewTag(tag: string): Promise<PushResult> {
    return this.newTagService.addNewTag(tag);
  }
  getNextVersion(
    currentVersion: string,
    release: 'major' | 'minor' | 'patch' = 'patch',
  ): string | null {
    return this.nextVersionService.getNextVersion(currentVersion, release);
  }
  convertTagToVersion(tag: string): string {
    return this.tagToVersionService.convert(tag);
  }
  convertVersionToTag(app: Application, version: string): string {
    return this.versionToTagService.convert(app, version);
  }
}
