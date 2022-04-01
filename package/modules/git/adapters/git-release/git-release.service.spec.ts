import { Test, TestingModule } from '@nestjs/testing';
import { GitReleaseService } from './git-release.service';
import { GitFacadeService } from '../../services/git-facade/git-facade.service';
import { TableOfChangesService } from '../table-of-changes/table-of-changes.service';
import { LoggerService } from '../../../logger/services/logger.service';
import { SafeModeFactory } from '../../../config/safe-mode';
import { DefaultVersionFactory } from '../../config/default-version';

describe('GitReleaseService', () => {
  let service: GitReleaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GitReleaseService,
        {
          provide: GitFacadeService,
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
        SafeModeFactory,
        DefaultVersionFactory,
      ],
    }).compile();

    service = module.get<GitReleaseService>(GitReleaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
