import { Command, Console } from 'nestjs-console';
import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Application } from '../../models/application';
import { SafeModeToken } from '../../modules/config/safe-mode';
import { GitReleaseService } from '../../modules/git/adapters/git-release/git-release.service';
import { TableOfChangesService } from '../../modules/git/adapters/table-of-changes/table-of-changes.service';
import { GitModule } from '../../modules/git/git.module';
import { registerModule } from '../../main/console';
import { RepoUrlToken } from '../../modules/git/config/repo-url';
import { CommitBranchToken } from '../../modules/git/config/commit-branch';
import { VersionToTagService } from '../../modules/git/adapters/version-to-tag/version-to-tag.service';

const appPath = 'shell-with-remotes';

const shell: Application = {
  name: `${appPath}-shell`,
  path: [`src/examples/${appPath}/shell`],
};

const remotes: Application[] = [
  {
    name: `${appPath}-remote1`,
    path: [`src/examples/${appPath}/remote-1`],
  },
  {
    name: `${appPath}-remote2`,
    path: [`src/examples/${appPath}/remote-2`],
  },
];

const config: Provider[] = [
  {
    provide: SafeModeToken,
    useValue: false,
  },
  {
    provide: RepoUrlToken,
    useValue: 'git@github.com:xvs32x/anubis.git',
  },
  {
    provide: CommitBranchToken,
    useValue: 'origin/main',
  },
  {
    provide: VersionToTagService,
    useValue: {
      convert(app: Application, version: string) {
        return `${app.name}-${version}`;
      },
    },
  },
];

@Console({
  command: 'publish',
  description: 'Publish the app',
})
class ConsoleService {
  constructor(
    protected gitReleaseService: GitReleaseService,
    protected tableOfChangesService: TableOfChangesService,
  ) {}

  @Command({
    command: 'git',
    description: 'Create a new tag for every app and push it into the git repo',
  })
  async git(): Promise<void> {
    await this.gitReleaseService.release(shell);
    for (const remote of remotes) {
      await this.gitReleaseService.release(remote);
    }
    this.tableOfChangesService.print();
  }
}

@Module({
  providers: [ConsoleService],
  imports: [GitModule.withConfig(config)],
})
class RemotesToShellModule {}

registerModule(RemotesToShellModule);
