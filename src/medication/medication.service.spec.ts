import { Test, TestingModule } from '@nestjs/testing';
import { MedicationService } from './services/medication.service';
import { CreateMedicationUseCase } from './use-cases/create-medication.use-case';
import { DeleteMedicationUseCase } from './use-cases/delete-medication.use-case';
import { FindAllMedicationsUseCase } from './use-cases/find-all-medications.use-case';
import { FindOneMedicationUseCase } from './use-cases/find-one-medication.use-case';
import { UpdateMedicationUseCase } from './use-cases/update-medication.use-case';

describe('MedicationService', () => {
  let service: MedicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicationService,
        {
          provide: CreateMedicationUseCase,
          useValue: {},
        },
        {
          provide: FindAllMedicationsUseCase,
          useValue: {},
        },
        {
          provide: FindOneMedicationUseCase,
          useValue: {},
        },
        {
          provide: UpdateMedicationUseCase,
          useValue: {},
        },
        {
          provide: DeleteMedicationUseCase,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MedicationService>(MedicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
