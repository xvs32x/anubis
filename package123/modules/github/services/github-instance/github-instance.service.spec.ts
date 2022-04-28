import { Test, TestingModule } from '@nestjs/testing';
import { GithubInstanceService } from './github-instance.service';

describe('GithubInstanceService', () => {
  let service: GithubInstanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GithubInstanceService],
    }).compile();

    service = module.get<GithubInstanceService>(GithubInstanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
