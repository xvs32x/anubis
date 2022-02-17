import { Injectable } from '@nestjs/common';

@Injectable()
export class VersionToTagService {
  parse(version: string): string {
    return version;
  }
}
