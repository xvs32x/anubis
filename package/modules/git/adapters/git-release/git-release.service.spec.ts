import { Test, TestingModule } from '@nestjs/testing';
import { GitReleaseService } from './git-release.service';
import { GitService } from '../../facades/git/git.service';
import { TableOfChangesService } from '../../../reporter/adapters/table-of-changes/table-of-changes.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { SafeModeProvider } from '../../../config/providers/safe-mode';
import { DefaultVersionProvider } from '../../providers/default-version';

describe('GitReleaseService', () => {
  let service: GitReleaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GitReleaseService,
        {
          provide: GitService,
          useValue: {},
        },
        {
          provide: TableOfChangesService,
          useValue: {},
        },
        {
          provide: LoggerService,
          useValue: {},
        },
        SafeModeProvider,
        DefaultVersionProvider,
      ],
    }).compile();

    service = module.get<GitReleaseService>(GitReleaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
