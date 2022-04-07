import { Test, TestingModule } from '@nestjs/testing';
import { GitInstanceService } from './git-instance.service';
import { SimpleGitOptionsProvider } from '../../providers/simple-git-options';
import { GitConfigProvider } from '../../providers/git-config';

describe('GitInstanceService', () => {
  let service: GitInstanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GitInstanceService,
        SimpleGitOptionsProvider,
        GitConfigProvider,
      ],
    }).compile();

    service = module.get<GitInstanceService>(GitInstanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
