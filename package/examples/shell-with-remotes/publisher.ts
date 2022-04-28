import { injectable } from '../../core/injector/injectable';
import { Anubis } from '../../core/anubis/anubis';
import { GitService } from '../../git/git.service';
import { Application } from '../../core/anubis/application.model';
import { ReporterService } from '../../core/reporter/reporter.service';
import { GitConfig as GitConfigDefault } from '../../git/secondary/git-config/git-config';
import { Config as ConfigDefault } from '../../core/config/config';

const apps: Application[] = [
  {
    name: `shell-with-remotes-shell`,
    path: [`package/examples/shell-with-remotes/shell`],
  },
  {
    name: `shell-with-remotes-remote1`,
    path: [`package/examples/shell-with-remotes/remote-1`],
  },
  {
    name: `shell-with-remotes-remote2`,
    path: [`package/examples/shell-with-remotes/remote-2`],
  },
];

@injectable()
class Config extends ConfigDefault {
  safeMode = true;
}

@injectable()
class GitConfig extends GitConfigDefault {
  repoUrl = 'git@github.com:xvs32x/anubis.git';
  commitBranch = 'origin/main';
}

@injectable()
class Pipeline {
  constructor(
    protected gitService: GitService,
    protected reporterService: ReporterService,
  ) {}

  async git() {
    for await (const app of apps) {
      await this.gitService.release(app);
    }
    this.reporterService.printTableOfChanges();
  }
}

Anubis.registerPipeline(Pipeline, Config, GitConfig);
