import { Test, TestingModule } from '@nestjs/testing';
import { NewTagService } from './new-tag.service';

describe('NewTagService', () => {
  let service: NewTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewTagService],
    }).compile();

    service = module.get<NewTagService>(NewTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
