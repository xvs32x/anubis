import { injectable } from '../../core/injector/injectable';
import { Anubis } from '../../core/anubis/anubis';
import { GitService } from '../../git/git.service';
import { Application } from '../../core/anubis/application.model';
import { ReporterService } from '../../core/reporter/reporter.service';
import { GitConfig as GitConfigDefault } from '../../git/secondary/git-config/git-config';
import { Config as ConfigDefault } from '../../core/config/config';
import { GitSemverService as GitSemverServiceDefault } from '../../git/secondary/git-semver/git-semver.service';
import { GithubService } from '../../github/github.service';
import { GithubConfig as GithubConfigDefault } from '../../github/secondary/github-config/github-config';
import { NpmService } from '../../npm/npm.service';

const apps: Application[] = [
  {
    name: `micro1`,
    path: [`package/examples/micros/micro-1`],
  },
  {
    name: `micro2`,
    path: [`package/examples/micros/micro-2`],
  },
  {
    name: `micro3`,
    path: [`package/examples/micros/micro-3`],
  },
];

class Config extends ConfigDefault {
  safeMode = false;
}

class GitConfig extends GitConfigDefault {
  tagPattern = '^.+([0-9]+).([0-9]+).([0-9]+)';
}

class GithubConfig extends GithubConfigDefault {
  owner = 'xvs32x';
  repo = 'anubis';
}

class GitSemverService extends GitSemverServiceDefault {
  convertVersionToTag(app: Application, version: string): string {
    return `${app.name}-${version}`;
  }
}

@injectable()
class Pipeline {
  constructor(
    protected gitService: GitService,
    protected githubService: GithubService,
    protected npmService: NpmService,
    protected reporterService: ReporterService,
  ) {}

  async git() {
    for await (const app of apps) {
      await this.gitService.release(app);
    }
    this.reporterService.printTableOfChanges();
  }

  async github() {
    for await (const app of apps) {
      await this.githubService.release(app);
    }
    this.reporterService.printTableOfChanges();
  }

  async npm() {
    for await (const app of apps) {
      await this.npmService.release(app);
    }
    this.reporterService.printTableOfChanges();
  }
}

Anubis.registerPipeline(
  Pipeline,
  Config,
  GitConfig,
  GitSemverService,
  GithubConfig,
);
