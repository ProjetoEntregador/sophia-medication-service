import { Injectable } from '@nestjs/common';
import { db } from 'src/database/db';
import { medicationBatches } from 'src/database/schema';
import { CreateMedicationBatchDto } from '../dto/create-medication-batch.dto';

@Injectable()
export class MedicationBatchRepository {
  async create(data: CreateMedicationBatchDto) {
    const [batch] = await db
      .insert(medicationBatches)
      .values({
        medicationId: data.medicationId,
        batchCode: data.batchNumber,
        quantity: data.quantity,
        expirationDate: new Date(data.expirationDate),
      })
      .returning();

    return batch;
  }
}