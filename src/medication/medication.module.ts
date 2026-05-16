import { Module } from '@nestjs/common';

import { MedicationController } from './controllers/medication.controller';
import { MedicationService } from './services/medication.service';
import { CreateMedicationUseCase } from './use-cases/create-medication.use-case';
import { FindAllMedicationsUseCase } from './use-cases/find-all-medications.use-case';
import { FindOneMedicationUseCase } from './use-cases/find-one-medication.use-case';
import { UpdateMedicationUseCase } from './use-cases/update-medication.use-case';
import { DeleteMedicationUseCase } from './use-cases/delete-medication.use-case';
import { MedicationRepository } from './repositories/medication.repository';
import { MedicationRepositoryInterface } from './repositories/medication.repository.interface';
import { MedicationBatchRepositoryInterface } from '../medication-batch/repositories/medication-batch.repository.interface';
import { MedicationBatchRepository } from '../medication-batch/repositories/medication-batch.repository';
import { FindMedicationsByPharmacyIdUseCase } from './use-cases/find-medications-by-pharmacy-id.use-case';

@Module({
  controllers: [MedicationController],
  providers: [
    MedicationService,
    CreateMedicationUseCase,
    UpdateMedicationUseCase,
    FindAllMedicationsUseCase,
    FindOneMedicationUseCase,
    DeleteMedicationUseCase,
    FindMedicationsByPharmacyIdUseCase,
    {
      provide: MedicationRepositoryInterface,
      useClass: MedicationRepository,
    },

    {
      provide: MedicationBatchRepositoryInterface,
      useClass: MedicationBatchRepository,
    },
  ],
})
export class MedicationModule {}