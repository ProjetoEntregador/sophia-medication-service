import { Test, TestingModule } from '@nestjs/testing';
import { MedicationBatchController } from './medication-batch.controller';

describe('MedicationBatchController', () => {
  let controller: MedicationBatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicationBatchController],
    }).compile();

    controller = module.get<MedicationBatchController>(MedicationBatchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
