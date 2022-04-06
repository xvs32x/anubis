import { Test, TestingModule } from '@nestjs/testing';
import { TableOfChangesService } from './table-of-changes.service';

describe('TableOfChangesService', () => {
  let service: TableOfChangesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableOfChangesService],
    }).compile();

    service = module.get<TableOfChangesService>(TableOfChangesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
