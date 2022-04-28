import { Inject, Injectable } from '@nestjs/common';
import { TagPattern } from '../../providers/tag-pattern';

@Injectable()
export class TagToVersionService {
  constructor(@Inject(TagPattern) protected pattern: string) {}
  convert(tag: string): string {
    const match = tag.match(this.pattern);
    return `${match[1]}.${match[2]}.${match[3]}`;
  }
}
