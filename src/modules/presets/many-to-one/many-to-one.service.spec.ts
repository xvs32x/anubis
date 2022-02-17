import { Test, TestingModule } from '@nestjs/testing';
import { ManyToOneService } from './many-to-one.service';

describe('ManyToOneService', () => {
  let service: ManyToOneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManyToOneService],
    }).compile();

    service = module.get<ManyToOneService>(ManyToOneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
