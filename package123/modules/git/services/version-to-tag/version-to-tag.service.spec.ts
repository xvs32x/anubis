import { Test, TestingModule } from '@nestjs/testing';
import { VersionToTagService } from './version-to-tag.service';

describe('VersionToTagService', () => {
  let service: VersionToTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VersionToTagService],
    }).compile();

    service = module.get<VersionToTagService>(VersionToTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
