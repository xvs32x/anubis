import { Injectable } from '@nestjs/common';
import { TableOfChangesService } from '../../../adapters/table-of-changes/table-of-changes.service';

@Injectable()
export class ReporterService {
  constructor(public tableOfChanges: TableOfChangesService) {}
}
