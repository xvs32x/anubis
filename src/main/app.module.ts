import { DynamicModule, Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { ConsoleModule } from 'nestjs-console';

@Module({})
export class AppModule {
  static configurePreset(Module): DynamicModule {
    return {
      module: AppModule,
      imports: [ConsoleModule, Module],
      providers: [AppService],
    };
  }
}
