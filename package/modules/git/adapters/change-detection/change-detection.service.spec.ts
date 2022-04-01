import { Test, TestingModule } from '@nestjs/testing';
import { ChangeDetectionService } from './change-detection.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { LastTagService } from '../last-tag/last-tag.service';
import { GitInstanceService } from '../git-instance/git-instance.service';
import { CommitBranchToken } from '../../config/commit-branch';

describe('ChangeDetectionService', () => {
  let service: ChangeDetectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChangeDetectionService,
        {
          provide: LoggerService,
          useValue: {},
        },
        {
          provide: LastTagService,
          useValue: {},
        },
        {
          provide: GitInstanceService,
          useValue: {},
        },
        {
          provide: CommitBranchToken,
          useValue: '',
        },
      ],
    }).compile();

    service = module.get<ChangeDetectionService>(ChangeDetectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
