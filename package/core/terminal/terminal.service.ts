import { injectable } from '../injector/injectable';
import { exec, ExecOptions } from "shelljs";
import { ReporterService } from '../reporter/reporter.service';

@injectable()
export class TerminalService {
  constructor(protected reporterService: ReporterService) {}

  getRunCommand(): string {
    const args = this.getArgs();
    return args[0];
  }
  getArgs(): string[] {
    const [bin, publisher, ...args] = process.argv;
    return args;
  }
  exec(command: string, options: ExecOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, options, (code, stdout, stderr) => {
        if (code !== 0) {
          this.reporterService.warn(
            'Command "%s" finished with not zero code',
            command,
          );
        }
        if (stderr) {
          reject(stderr);
        } else {
          resolve(stdout ? stdout : '');
        }
      });
    });
  }
}
