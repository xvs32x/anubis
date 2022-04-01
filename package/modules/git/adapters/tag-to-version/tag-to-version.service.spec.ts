import { Test, TestingModule } from '@nestjs/testing';
import { TagToVersionService } from './tag-to-version.service';
import { TagPatternFactory } from '../../config/tag-pattern';

describe('TagToVersionService', () => {
  let service: TagToVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagToVersionService, TagPatternFactory],
    }).compile();

    service = module.get<TagToVersionService>(TagToVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('parse', () => {
    it('should return correct version by tag', () => {
      expect(service.convert('11.22.33')).toBe('11.22.33');
    });
  });
});
