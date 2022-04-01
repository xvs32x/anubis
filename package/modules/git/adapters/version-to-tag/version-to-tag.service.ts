import { Injectable } from '@nestjs/common';
import { Application } from '../../../../models/application';

@Injectable()
export class VersionToTagService {
  convert(app: Application, version: string): string {
    return version;
  }
}
