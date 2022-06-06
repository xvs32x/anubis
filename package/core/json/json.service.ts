import { injectable } from '../injector/injectable';
import { ReporterService } from '../reporter/reporter.service';

@injectable()
export class JsonService {
  constructor(protected reporterService: ReporterService) {}
  parse<T>(json: string, defaultValue: any = {}): T {
    try {
      return JSON.parse(json);
    } catch (e) {
      this.reporterService.warn('Can not parse JSON %s', e);
      return defaultValue;
    }
  }
}
