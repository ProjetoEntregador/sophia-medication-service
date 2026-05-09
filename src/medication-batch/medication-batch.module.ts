import { Module } from '@nestjs/common';

import { MedicationBatchController } from './controllers/medication-batch.controller';
import { MedicationBatchService } from './services/medication-batch.service';

import { MedicationBatchRepository } from './repositories/medication-batch.repository';
import { MedicationBatchRepositoryInterface } from './repositories/medication-batch.repository.interface';

import { CreateMedicationBatchUseCase } from './use-cases/create-medication-batch.use-case';
import { FindAllMedicationBatchUseCase } from './use-cases/find-all-medication-batch.use-case';
import { FindOneMedicationBatchUseCase } from './use-cases/find-one-medication-batch.use-case';
import { FindBatchesByMedicationIdUseCase } from './use-cases/find-batches-by-medication-id.use-case';
import { UpdateMedicationBatchUseCase } from './use-cases/update-medication-batch.use-case';

@Module({
  controllers: [MedicationBatchController],
  providers: [
    MedicationBatchService,
    CreateMedicationBatchUseCase,
    FindAllMedicationBatchUseCase,
    FindOneMedicationBatchUseCase,
    FindBatchesByMedicationIdUseCase,
    UpdateMedicationBatchUseCase,
    {
      provide: MedicationBatchRepositoryInterface,
      useClass: MedicationBatchRepository,
    },
  ],
})
export class MedicationBatchModule {}