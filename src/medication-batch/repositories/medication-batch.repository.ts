import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/database/db';
import { medicationBatches } from 'src/database/schema';
import { CreateMedicationBatchDto } from '../dto/create-medication-batch.dto';
import { MedicationBatchRepositoryInterface } from './medication-batch.repository.interface';

@Injectable()
export class MedicationBatchRepository
  implements MedicationBatchRepositoryInterface {
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

  async findAll() {
    return db.select().from(medicationBatches);
  }

  async findOne(id: string) {
    const [batch] = await db
      .select()
      .from(medicationBatches)
      .where(eq(medicationBatches.id, id));

    return batch;
  }

  async findByMedicationId(medicationId: string) {
    return db
      .select()
      .from(medicationBatches)
      .where(eq(medicationBatches.medicationId, medicationId));
  }

}