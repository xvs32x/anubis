import { Injectable } from '@nestjs/common';
import * as semver from 'semver';
import { TagToVersionService } from '../tag-to-version/tag-to-version.service';

@Injectable()
export class NextVersionService {
  constructor(protected tagToVersionService: TagToVersionService) {}
  getNextVersion(
    tag: string,
    release: 'major' | 'minor' | 'patch',
  ): string | null {
    const version = this.tagToVersionService.parse(tag);
    return semver.inc(version, release);
  }
}
