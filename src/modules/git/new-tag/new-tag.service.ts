import { Inject, Injectable } from '@nestjs/common';
import { GitService } from '../git/git.service';
import { RepoUrlToken } from '../config/repo-url';

@Injectable()
export class NewTagService {
  constructor(
    protected gitService: GitService,
    @Inject(RepoUrlToken)
    protected repoUrl: string,
  ) {}
  async addNewTag(tag: string) {
    try {
      await this.gitService.getInstance().addAnnotatedTag(tag, '');
      await this.gitService.getInstance().pushTags(['--repo', this.repoUrl]);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}
