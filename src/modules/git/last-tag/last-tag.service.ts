import { Injectable } from '@nestjs/common';
import { Application } from '../../../models/application';
import { GitService } from '../git/git.service';

@Injectable()
export class LastTagService {
  constructor(protected gitService: GitService) {}
  async getLastTag(app: Application): Promise<string | undefined> {
    try {
      const tags = await this.gitService
        .getInstance()
        .tags(['-l', `${app.name}-*`]);
      return tags.latest;
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}
