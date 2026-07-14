import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyPermissionService } from '../pharmacy/pharmacy-permission.service';
import { MedicationController } from './controllers/medication.controller';
import { MedicationService } from './services/medication.service';
import { FindMedicationsByPharmacyIdUseCase } from './use-cases/find-medications-by-pharmacy-id.use-case';
import { UpdateMedicationUseCase } from './use-cases/update-medication.use-case';

describe('MedicationController', () => {
  let controller: MedicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicationController],
      providers: [
        {
          provide: PharmacyPermissionService,
          useValue: {},
        },
        {
          provide: MedicationService,
          useValue: {},
        },
        {
          provide: FindMedicationsByPharmacyIdUseCase,
          useValue: {},
        },
        {
          provide: UpdateMedicationUseCase,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<MedicationController>(MedicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
