import { Injectable } from '@nestjs/common';
import { TableOfChangesService } from '../../../services/table-of-changes/table-of-changes.service';

@Injectable()
export class ReporterService {
  constructor(public tableOfChanges: TableOfChangesService) {}
}
