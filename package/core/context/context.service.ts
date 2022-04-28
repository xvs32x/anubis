import { injectable } from '../injector/injectable';

@injectable()
export class ContextService {
  protected context: object = {};
  get<T>(key: string): T {
    return this.context[key];
  }
  set(key: string, value: any): void {
    this.context[key] = value;
  }
}
