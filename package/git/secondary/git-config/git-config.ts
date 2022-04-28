import { injectable } from '../../../core/injector/injectable';
import { SimpleGitOptions } from 'simple-git/src/lib/types';

@injectable()
export class GitConfig {
  safeMode = false;
  repoUrl: string = undefined;
  commitBranch: string = undefined;
  gitConfig: SimpleGitOptions = undefined;
  defaultVersion = '0.0.0';
  simpleGitOptions = {};
  tagPattern = '([0-9]+).([0-9]+).([0-9]+)';
}
