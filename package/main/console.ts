import { BootstrapConsole } from 'nestjs-console';
import { AppModule } from './app.module';

export function registerModule(Preset) {
  const bootstrap = new BootstrapConsole({
    module: AppModule.configurePreset(Preset),
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
