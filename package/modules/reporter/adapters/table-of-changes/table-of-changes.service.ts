import { Injectable } from '@nestjs/common';

@Injectable()
export class TableOfChangesService {
  protected rows: any[] = [];
  push(row: any) {
    this.rows.push(row);
  }
  print() {
    if (this.rows.length) {
      console.table(this.rows);
    } else {
      console.table(['Nothing is released']);
    }
  }
}
