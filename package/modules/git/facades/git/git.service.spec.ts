import { Test, TestingModule } from '@nestjs/testing';
import { GitService } from './git.service';
import { ChangeDetectionService } from '../../adapters/change-detection/change-detection.service';
import { LastTagService } from '../../adapters/last-tag/last-tag.service';
import { NewTagService } from '../../adapters/new-tag/new-tag.service';
import { NextVersionService } from '../../adapters/next-version/next-version.service';
import { TagToVersionService } from '../../adapters/tag-to-version/tag-to-version.service';
import { VersionToTagService } from '../../adapters/version-to-tag/version-to-tag.service';

describe('GitService', () => {
  let service: GitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GitService,
        {
          provide: ChangeDetectionService,
          useValue: {},
        },
        {
          provide: LastTagService,
          useValue: {},
        },
        {
          provide: NewTagService,
          useValue: {},
        },
        {
          provide: NextVersionService,
          useValue: {},
        },
        {
          provide: TagToVersionService,
          useValue: {},
        },
        {
          provide: VersionToTagService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<GitService>(GitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
