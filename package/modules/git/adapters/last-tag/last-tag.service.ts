import { Injectable } from '@nestjs/common';
import { Application } from '../../../../models/application';
import { GitInstanceService } from '../git-instance/git-instance.service';

@Injectable()
export class LastTagService {
  constructor(protected gitInstanceService: GitInstanceService) {}
  async getLastTag(app: Application): Promise<string | undefined> {
    try {
      const tags = await this.gitInstanceService
        .getInstance()
        .tags(['-l', `${app.name}-*`]);
      return tags.latest;
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}
