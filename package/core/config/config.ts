import { injectable } from '../injector/injectable';

@injectable()
export class Config {
  safeMode = false;
}
