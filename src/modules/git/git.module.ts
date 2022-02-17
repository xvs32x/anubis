import { Module } from '@nestjs/common';
import { GitConfigFactory } from './config/git-config';
import { SimpleGitOptionsFactory } from './config/simple-git-options';
import { GitService } from './git/git.service';
import { RepoUrlFactory } from './config/repo-url';
import { LastTagService } from './last-tag/last-tag.service';
import { NewTagService } from './new-tag/new-tag.service';
import { NextVersionService } from './next-version/next-version.service';
import { TagToVersionService } from './tag-to-version/tag-to-version.service';
import { VersionToTagService } from './version-to-tag/version-to-tag.service';
import { TagPatternFactory } from './config/tag-pattern';

@Module({
  providers: [
    GitConfigFactory,
    SimpleGitOptionsFactory,
    RepoUrlFactory,
    TagPatternFactory,
    GitService,
    LastTagService,
    NewTagService,
    NextVersionService,
    TagToVersionService,
    VersionToTagService,
  ],
})
export class GitModule {}
