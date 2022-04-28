import { Test, TestingModule } from '@nestjs/testing';
import { GitService } from './git.service';
import { ChangeDetectionService } from '../../services/change-detection/change-detection.service';
import { LastTagService } from '../../services/last-tag/last-tag.service';
import { NewTagService } from '../../services/new-tag/new-tag.service';
import { NextVersionService } from '../../services/next-version/next-version.service';
import { TagToVersionService } from '../../services/tag-to-version/tag-to-version.service';
import { VersionToTagService } from '../../services/version-to-tag/version-to-tag.service';

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
