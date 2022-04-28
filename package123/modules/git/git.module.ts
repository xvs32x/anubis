import { DynamicModule, Module } from '@nestjs/common';
import { GitConfigProvider } from './providers/git-config';
import { SimpleGitOptionsProvider } from './providers/simple-git-options';
import { RepoUrlProvider } from './providers/repo-url';
import { LastTagService } from './services/last-tag/last-tag.service';
import { NewTagService } from './services/new-tag/new-tag.service';
import { NextVersionService } from './services/next-version/next-version.service';
import { TagToVersionService } from './services/tag-to-version/tag-to-version.service';
import { VersionToTagService } from './services/version-to-tag/version-to-tag.service';
import { TagPatternProvider } from './providers/tag-pattern';
import { ChangeDetectionService } from './services/change-detection/change-detection.service';
import { GitInstanceService } from './services/git-instance/git-instance.service';
import { LoggerModule } from '../logger/logger.module';
import { CommitBranchProvider } from './providers/commit-branch';
import { GitService } from './facades/git/git.service';
import { GitReleaseService } from './services/git-release/git-release.service';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { DefaultVersionProvider } from './providers/default-version';
import { ReporterModule } from '../reporter/reporter.module';

@Module({})
export class GitModule {
  static withConfig(providers: Provider[] = []): DynamicModule {
    return {
      module: GitModule,
      imports: [LoggerModule, ReporterModule.withConfig(providers)],
      exports: [GitService],
      providers: [
        GitConfigProvider,
        SimpleGitOptionsProvider,
        RepoUrlProvider,
        TagPatternProvider,
        CommitBranchProvider,
        DefaultVersionProvider,
        LastTagService,
        NewTagService,
        NextVersionService,
        TagToVersionService,
        VersionToTagService,
        ChangeDetectionService,
        GitInstanceService,
        GitService,
        GitReleaseService,
        ...providers,
      ],
    };
  }
}
