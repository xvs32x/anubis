import { injectable } from '../injector/injectable';

@injectable()
export class ReporterService {
  protected tableOfChanges: any[] = [];

  pushRowIntoTable(row: any) {
    this.tableOfChanges.push(row);
  }

  printTableOfChanges(): void {
    if (this.tableOfChanges.length) {
      console.table(this.tableOfChanges);
    } else {
      console.table(['Nothing is released']);
    }
  }

  clearTableOfChanges(): void {
    this.tableOfChanges.length = 0;
  }

  info(message?: any, ...args): void {
    console.info(`INFO  : ${message}`, ...args);
  }

  log(message?: any, ...args): void {
    console.log(`LOG   : ${message}`, ...args);
  }

  warn(message?: any, ...args): void {
    console.warn(`WARN  : ${message}`, ...args);
  }

  shutdown(message?: any, ...args): void {
    console.error(`ERROR : ${message}`, ...args);
    process.exit(1);
  }
}
