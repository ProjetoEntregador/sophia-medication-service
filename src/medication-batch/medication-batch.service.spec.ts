import { Test, TestingModule } from '@nestjs/testing';
import { MedicationBatchService } from './services/medication-batch.service';
import { CreateMedicationBatchUseCase } from './use-cases/create-medication-batch.use-case';
import { DeleteMedicationBatchUseCase } from './use-cases/delete-medication-batch.use-case';
import { FindAllMedicationBatchUseCase } from './use-cases/find-all-medication-batch.use-case';
import { FindBatchesByMedicationIdUseCase } from './use-cases/find-batches-by-medication-id.use-case';
import { FindOneMedicationBatchUseCase } from './use-cases/find-one-medication-batch.use-case';
import { UpdateMedicationBatchUseCase } from './use-cases/update-medication-batch.use-case';

describe('MedicationBatchService', () => {
  let service: MedicationBatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicationBatchService,
        {
          provide: CreateMedicationBatchUseCase,
          useValue: {},
        },
        {
          provide: FindAllMedicationBatchUseCase,
          useValue: {},
        },
        {
          provide: FindOneMedicationBatchUseCase,
          useValue: {},
        },
        {
          provide: FindBatchesByMedicationIdUseCase,
          useValue: {},
        },
        {
          provide: UpdateMedicationBatchUseCase,
          useValue: {},
        },
        {
          provide: DeleteMedicationBatchUseCase,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MedicationBatchService>(MedicationBatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
