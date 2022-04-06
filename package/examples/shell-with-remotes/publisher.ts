import { Command, Console } from 'nestjs-console';
import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { Application } from '../../models/application';
import { SafeMode } from '../../modules/config/providers/safe-mode';
import { GitReleaseService } from '../../modules/git/adapters/git-release/git-release.service';
import { TableOfChangesService } from '../../modules/git/adapters/table-of-changes/table-of-changes.service';
import { GitModule } from '../../modules/git/git.module';
import { RepoUrl } from '../../modules/git/providers/repo-url';
import { CommitBranch } from '../../modules/git/providers/commit-branch';
import { VersionToTagService } from '../../modules/git/adapters/version-to-tag/version-to-tag.service';
import { registerModule } from '../../main/console';
import { TagPattern } from '../../modules/git/providers/tag-pattern';

const appPath = 'shell-with-remotes';

const shell: Application = {
  name: `${appPath}-shell`,
  path: [`package/examples/${appPath}/shell`],
};

const remotes: Application[] = [
  {
    name: `${appPath}-remote1`,
    path: [`package/examples/${appPath}/remote-1`],
  },
  {
    name: `${appPath}-remote2`,
    path: [`package/examples/${appPath}/remote-2`],
  },
];

const config: Provider[] = [
  {
    provide: SafeMode,
    useValue: true,
  },
  {
    provide: RepoUrl,
    useValue: 'git@github.com:xvs32x/anubis.git',
  },
  {
    provide: CommitBranch,
    useValue: 'origin/main',
  },
  {
    provide: TagPattern,
    useValue: '^.+([0-9]+).([0-9]+).([0-9]+)',
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
