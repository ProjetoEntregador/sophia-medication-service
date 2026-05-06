import { Injectable } from '@nestjs/common';
import { CreateMedicationBatchDto } from './dto/create-medication-batch.dto';

type MedicationBatch = CreateMedicationBatchDto & {
  id: string;
};

@Injectable()
export class MedicationBatchService {
  private medicationBatches: MedicationBatch[] = [];

  create(data: CreateMedicationBatchDto): MedicationBatch {
    const batch: MedicationBatch = {
      id: Date.now().toString(),
      ...data,
    };

    this.medicationBatches.push(batch);

    return batch;
  }

  findAll(): MedicationBatch[] {
    return this.medicationBatches;
  }

  findByMedicationId(
    medicationId: string,
  ): MedicationBatch[] {
    return this.medicationBatches.filter(
      (batch) => batch.medicationId === medicationId,
    );
  }
}