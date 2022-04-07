import { DynamicModule, Module } from '@nestjs/common';
import { TableOfChangesService } from './services/table-of-changes/table-of-changes.service';
import { ReporterService } from './facades/reporter/reporter/reporter.service';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';

@Module({})
export class ReporterModule {
  static withConfig(providers: Provider[] = []): DynamicModule {
    return {
      module: ReporterModule,
      exports: [ReporterService],
      providers: [TableOfChangesService, ReporterService, ...providers],
    };
  }
}
