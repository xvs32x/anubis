import { injectable } from '../injector/injectable';

@injectable()
export class TerminalService {
  getRunCommand(): string {
    const args = this.getArgs();
    return args[0];
  }
  getArgs(): string[] {
    const [bin, publisher, ...args] = process.argv;
    return args;
  }
}
