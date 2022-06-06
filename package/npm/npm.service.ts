import { injectable } from '../core/injector/injectable';
import { Application } from '../core/anubis/application.model';
import { NpmApiService } from './secondary/npm-api/npm-api.service';

@injectable()
export class NpmService {
  constructor(protected npmApiService: NpmApiService) {}
  async release(app: Application) {
    await this.npmApiService.publish(app);
  }
}
