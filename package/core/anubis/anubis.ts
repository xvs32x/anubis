import { Dependency } from '../injector/secondary/dependency';
import { Container } from '../injector/container';
import { Terminal } from '../terminal/terminal';
import { Dependencies } from '../injector/secondary/dependencies';
import { ReporterService } from '../reporter/reporter.service';
import { Config } from '../config/config';

export class Anubis {
  static registerPipeline<T>(
    Pipeline: Dependency<T>,
    ...providers: Dependencies
  ) {
    Container.get(ReporterService).info('Anubis is starting...');
    Anubis.#registerProviders(providers);
    Anubis.#checkConfig();
    Anubis.#runCommand(Container.get(Pipeline), Terminal.getRunCommand());
  }
  static #registerProviders(providers: Dependencies = []): void {
    providers.forEach((Constructor) => {
      Container.set(Constructor);
    });
  }
  static #runCommand(pipeline, runCommand): void {
    const reporterService = Container.get(ReporterService);
    reporterService.info('Running command "%s"', runCommand);
    if (typeof pipeline[runCommand] === 'function') {
      pipeline[runCommand]();
    } else {
      reporterService.shutdown(
        'Can not find method %s or it is not a function.',
        runCommand,
      );
    }
  }
  static #checkConfig(): void {
    const config = Container.get(Config);
    if (config.safeMode) {
      Container.get(ReporterService).warn(
        'SafeMode is turned on. Nothing is going to be released.',
      );
    }
  }
}
