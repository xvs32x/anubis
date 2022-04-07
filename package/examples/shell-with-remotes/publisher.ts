import { Application } from '../../models/application';
import { SafeMode } from '../../modules/config/providers/safe-mode';
import { RepoUrl } from '../../modules/git/providers/repo-url';
import { CommitBranch } from '../../modules/git/providers/commit-branch';
import { VersionToTagService } from '../../modules/git/services/version-to-tag/version-to-tag.service';
import { registerPipeline } from '../../main/console';
import { TagPattern } from '../../modules/git/providers/tag-pattern';
import { Pipeline } from '../../modules/core/decorators/pipeline';
import { Step } from '../../modules/core/decorators/step';
import { Config } from '../../modules/core/models/config';
import { GitService } from '../../modules/git/facades/git/git.service';
import { ReporterService } from '../../modules/reporter/facades/reporter/reporter/reporter.service';

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

const config: Config[] = [
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

@Pipeline({
  command: 'publish',
  description: 'Publish the app',
})
class PipelineService {
  constructor(
    protected gitService: GitService,
    protected reporterService: ReporterService,
  ) {}

  @Step({
    command: 'git',
    description: 'Create a new tag for every app and push it into the git repo',
  })
  async git(): Promise<void> {
    await this.gitService.release(shell);
    for (const remote of remotes) {
      await this.gitService.release(remote);
    }
    this.reporterService.tableOfChanges.print();
  }
}

registerPipeline(PipelineService, config);
