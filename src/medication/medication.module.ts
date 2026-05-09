import { Module } from '@nestjs/common';

import { MedicationController } from './controllers/medication.controller';
import { MedicationService } from './services/medication.service';
import { CreateMedicationUseCase } from './use-cases/create-medication.use-case';
import { FindAllMedicationsUseCase } from './use-cases/find-all-medications.use-case';
import { FindOneMedicationUseCase } from './use-cases/find-one-medication.use-case';
import { MedicationRepository } from './repositories/medication.repository';
import { MedicationRepositoryInterface } from './repositories/medication.repository.interface';

@Module({
  controllers: [MedicationController],
  providers: [
    MedicationService,
    CreateMedicationUseCase,
    FindAllMedicationsUseCase,
    FindOneMedicationUseCase,
    {
      provide: MedicationRepositoryInterface,
      useClass: MedicationRepository,
    },
  ],
})
export class MedicationModule {}