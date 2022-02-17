import { Inject, Injectable } from '@nestjs/common';
import simpleGit, { SimpleGit } from 'simple-git';
import { SimpleGitOptions } from 'simple-git/src/lib/types';
import { SimpleGitOptionsToken } from '../config/simple-git-options';
import { GitConfigToken, GitConfig } from '../config/git-config';

@Injectable()
export class GitService {
  protected git: SimpleGit;

  constructor(
    @Inject(SimpleGitOptionsToken)
    protected simpleGitOptions: Partial<SimpleGitOptions>,
    @Inject(GitConfigToken)
    protected gitConfig: GitConfig,
  ) {}

  getInstance(): SimpleGit {
    if (this.git) {
      return this.git;
    }

    this.git = this.configure(this.simpleGitOptions, this.gitConfig);

    return this.git;
  }

  protected configure(
    options: Partial<SimpleGitOptions>,
    config: GitConfig,
  ): SimpleGit {
    const gitInstance = simpleGit(options);

    for (const field in config) {
      gitInstance.addConfig(field, config.field);
    }

    return gitInstance;
  }
}
