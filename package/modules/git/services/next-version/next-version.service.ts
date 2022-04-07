import { Injectable } from '@nestjs/common';
import * as semver from 'semver';

@Injectable()
export class NextVersionService {
  getNextVersion(
    currentVersion: string,
    release: 'major' | 'minor' | 'patch' = 'patch',
  ): string | null {
    return semver.inc(currentVersion, release);
  }
}
