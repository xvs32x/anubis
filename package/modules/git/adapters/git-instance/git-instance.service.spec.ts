import { Test, TestingModule } from '@nestjs/testing';
import { GitInstanceService } from './git-instance.service';
import { SimpleGitOptionsFactory } from '../../config/simple-git-options';
import { GitConfigFactory } from '../../config/git-config';

describe('GitInstanceService', () => {
  let service: GitInstanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GitInstanceService,
        SimpleGitOptionsFactory,
        GitConfigFactory,
      ],
    }).compile();

    service = module.get<GitInstanceService>(GitInstanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
