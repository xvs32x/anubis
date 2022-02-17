import { Test, TestingModule } from '@nestjs/testing';
import { NextVersionService } from './next-version.service';

describe('NextVersionService', () => {
  let service: NextVersionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NextVersionService],
    }).compile();

    service = module.get<NextVersionService>(NextVersionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getNextVersion', () => {
    it('should up the version from 1.0.0 to 2.0.0', () => {
      expect(service.getNextVersion('1.0.0', 'major')).toBe('2.0.0');
    });
    it('should up the version from 0.1.0 to 0.2.0', () => {
      expect(service.getNextVersion('0.1.0', 'minor')).toBe('0.2.0');
    });
    it('should up the version from 0.0.0 to 0.0.1', () => {
      expect(service.getNextVersion('0.0.0', 'patch')).toBe('0.0.1');
    });
  });
});
