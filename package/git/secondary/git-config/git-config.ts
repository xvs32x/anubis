import { injectable } from '../../../core/injector/injectable';
import { SimpleGitOptions } from 'simple-git/src/lib/types';

@injectable()
export class GitConfig {
  defaultVersion = '0.0.0';
  tagPattern = '([0-9]+).([0-9]+).([0-9]+)';
  gitConfig: SimpleGitOptions = undefined;
}
