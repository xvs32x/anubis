import { Module } from '@nestjs/common';
import { TableOfChangesService } from './adapters/table-of-changes/table-of-changes.service';
import { ReporterService } from './facades/reporter/reporter/reporter.service';

@Module({
  exports: [ReporterService],
  providers: [TableOfChangesService, ReporterService],
})
export class ReporterModule {}
