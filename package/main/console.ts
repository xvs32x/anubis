import { BootstrapConsole } from 'nestjs-console';
import { AppModule } from './app.module';
import { Config } from '../modules/core/models/config';
import { DynamicModule } from '@nestjs/common';
import { GitModule } from '../modules/git/git.module';
import { ReporterModule } from '../modules/reporter/reporter.module';
import { GithubModule } from '../modules/github/github.module';

export function registerPipeline(Pipeline, config: Config[]) {
  const module: DynamicModule = {
    module: AnubisModule,
    providers: [Pipeline],
    imports: [
      ReporterModule.withConfig(config),
      GitModule.withConfig(config),
      GithubModule.withConfig(config),
    ],
  };
  registerModule(module);
}

class AnubisModule {}

/**
 * @Deprecated
 * @param Module
 */
export function registerModule(Module) {
  const bootstrap = new BootstrapConsole({
    module: AppModule.configurePreset(Module),
    useDecorators: true,
  });

  bootstrap.init().then(async (app) => {
    try {
      await app.init();
      await bootstrap.boot();
      await app.close();
    } catch (e) {
      console.error(e);
      await app.close();
      process.exit(1);
    }
  });
}
