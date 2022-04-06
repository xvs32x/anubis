import { Test, TestingModule } from '@nestjs/testing';
import { NewTagService } from './new-tag.service';
import { GitInstanceService } from '../git-instance/git-instance.service';
import { RepoUrl } from '../../providers/repo-url';

describe('NewTagService', () => {
  let service: NewTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewTagService,
        {
          provide: GitInstanceService,
          useValue: {},
        },
        {
          provide: RepoUrl,
          useValue: '',
        },
      ],
    }).compile();

    service = module.get<NewTagService>(NewTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
