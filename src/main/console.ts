import { BootstrapConsole } from 'nestjs-console';
import { DynamicModule } from '@nestjs/common';

export interface PublishConfig {
  preset: any;
}

export class Publisher {
  static module(Preset: any): DynamicModule {
    return {
      module: Publisher,
      imports: [Preset],
    };
  }
}

export function run(Preset) {
  const bootstrap = new BootstrapConsole({
    module: Publisher.module(Preset),
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
