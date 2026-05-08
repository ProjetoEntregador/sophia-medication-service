import { Module } from '@nestjs/common';
import { MedicationBatchController } from './controllers/medication-batch.controller';
import { MedicationBatchService } from './services/medication-batch.service';
import { MedicationBatchRepository } from './repositories/medication-batch.repository';
import { CreateMedicationBatchUseCase } from './use-cases/create-medication-batch.use-case';

@Module({
  controllers: [MedicationBatchController],
  providers: [
    MedicationBatchService,
    MedicationBatchRepository,
    CreateMedicationBatchUseCase,
  ],
})
export class MedicationBatchModule {}