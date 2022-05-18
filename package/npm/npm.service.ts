import { injectable } from '../core/injector/injectable';
import { Application } from '../core/anubis/application.model';

@injectable()
export class NpmService {
  async release(app: Application) {
    console.log(app);
  }
}
