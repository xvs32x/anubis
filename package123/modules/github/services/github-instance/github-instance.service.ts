import { Injectable } from '@nestjs/common';
import { Octokit } from 'octokit';
import { OctokitOptions } from '@octokit/core/dist-types/types';

@Injectable()
export class GithubInstanceService {
  protected github: Octokit;

  getInstance(): Octokit {
    if (this.github) {
      return this.github;
    }

    this.github = this.configure({
      auth: `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`,
    });

    return this.github;
  }

  protected configure(options: OctokitOptions): Octokit {
    return new Octokit(options);
  }
}
