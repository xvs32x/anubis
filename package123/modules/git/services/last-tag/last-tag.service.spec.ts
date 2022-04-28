import { Test, TestingModule } from '@nestjs/testing';
import { LastTagService } from './last-tag.service';
import { GitInstanceService } from '../git-instance/git-instance.service';

describe('LastTagService', () => {
  let service: LastTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LastTagService,
        {
          provide: GitInstanceService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LastTagService>(LastTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
