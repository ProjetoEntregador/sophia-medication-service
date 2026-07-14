import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyPermissionService } from '../pharmacy/pharmacy-permission.service';
import { MedicationService } from '../medication/services/medication.service';
import { MedicationBatchController } from './controllers/medication-batch.controller';
import { MedicationBatchService } from './services/medication-batch.service';

describe('MedicationBatchController', () => {
  let controller: MedicationBatchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicationBatchController],
      providers: [
        {
          provide: MedicationService,
          useValue: {},
        },
        {
          provide: PharmacyPermissionService,
          useValue: {},
        },
        {
          provide: MedicationBatchService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<MedicationBatchController>(
      MedicationBatchController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
