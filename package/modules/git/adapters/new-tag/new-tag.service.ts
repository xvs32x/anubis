import { Inject, Injectable } from '@nestjs/common';
import { RepoUrlToken } from '../../config/repo-url';
import { GitInstanceService } from '../git-instance/git-instance.service';
import { PushResult } from 'simple-git/typings/response';

@Injectable()
export class NewTagService {
  constructor(
    protected gitInstanceService: GitInstanceService,
    @Inject(RepoUrlToken)
    protected repoUrl: string,
  ) {}
  async addNewTag(tag: string): Promise<PushResult> {
    try {
      await this.gitInstanceService.getInstance().addAnnotatedTag(tag, '');
      return await this.gitInstanceService
        .getInstance()
        .pushTags(['--repo', this.repoUrl]);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}
