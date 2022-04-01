import { Inject, Injectable } from '@nestjs/common';
import { TagPatternToken } from '../../config/tag-pattern';

@Injectable()
export class TagToVersionService {
  constructor(@Inject(TagPatternToken) protected pattern: string) {}
  convert(tag: string): string {
    const match = tag.match(this.pattern);
    return `${match[1]}.${match[2]}.${match[3]}`;
  }
}
