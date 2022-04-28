export class Terminal {
  static getRunCommand(): string {
    const args = Terminal.getArgs();
    return args[0];
  }
  static getArgs(): string[] {
    const [bin, publisher, ...args] = process.argv;
    return args;
  }
}
