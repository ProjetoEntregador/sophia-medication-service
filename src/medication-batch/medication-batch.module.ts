import { Module } from '@nestjs/common';
import { MedicationBatchService } from './medication-batch.service';
import { MedicationBatchController } from './medication-batch.controller';

@Module({
  controllers: [MedicationBatchController],
  providers: [MedicationBatchService],
})
export class MedicationBatchModule {}