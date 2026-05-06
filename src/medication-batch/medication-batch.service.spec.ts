import { Test, TestingModule } from '@nestjs/testing';
import { MedicationBatchService } from './medication-batch.service';

describe('MedicationBatchService', () => {
  let service: MedicationBatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicationBatchService],
    }).compile();

    service = module.get<MedicationBatchService>(MedicationBatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
