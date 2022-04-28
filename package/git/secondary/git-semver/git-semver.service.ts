import { injectable } from '../../../core/injector/injectable';
import { Application } from '../../../core/anubis/application.model';
import { GitConfigService } from '../git-config/git-config.service';
import * as semver from 'semver';
import { GitConfig } from '../git-config/git-config';

@injectable()
export class GitSemverService {
  gitConfig: GitConfig;
  constructor(protected gitConfigService: GitConfigService) {
    this.gitConfig = this.gitConfigService.getConfig();
  }
  convertTagToVersion(tag: string): string {
    const pattern = this.gitConfig.tagPattern;
    const match = tag.match(pattern);
    return `${match[1]}.${match[2]}.${match[3]}`;
  }
  convertVersionToTag(app: Application, version: string): string {
    return version;
  }
  getNextVersion(
    currentVersion: string,
    release: 'major' | 'minor' | 'patch' = 'patch',
  ): string | null {
    return semver.inc(currentVersion, release);
  }
}
