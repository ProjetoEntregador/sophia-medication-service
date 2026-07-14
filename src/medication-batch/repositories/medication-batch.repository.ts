import { Inject, Injectable } from '@nestjs/common';
import { count, eq, inArray } from 'drizzle-orm';
import { DB } from '../../database/database.module';
import { medicationBatches } from '../../database/schema';
import { CreateMedicationBatchDto } from '../dto/create-medication-batch.dto';
import { UpdateMedicationBatchDto } from '../dto/update-medication-batch.dto';
import { MedicationBatchRepositoryInterface } from './medication-batch.repository.interface';

@Injectable()
export class MedicationBatchRepository implements MedicationBatchRepositoryInterface {
  constructor(
    @Inject(DB)
    private readonly db: any,
  ) {}

  async create(data: CreateMedicationBatchDto) {
    const [batch] = await this.db
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

  async findAll(offset: number, size: number) {
    const data = await this.db
      .select()
      .from(medicationBatches)
      .limit(size)
      .offset(offset);

    const [{ total }] = await this.db
      .select({ total: count() })
      .from(medicationBatches);

    return {
      data,
      total,
      offset,
      size,
    };
  }

  async findOne(id: string) {
    const [batch] = await this.db
      .select()
      .from(medicationBatches)
      .where(eq(medicationBatches.id, id));

    return batch;
  }

  async findByMedicationId(medicationId: string, offset: number, size: number) {
    const data = await this.db
      .select()
      .from(medicationBatches)
      .where(eq(medicationBatches.medicationId, medicationId))
      .limit(size)
      .offset(offset);

    const [{ total }] = await this.db
      .select({ total: count() })
      .from(medicationBatches)
      .where(eq(medicationBatches.medicationId, medicationId));

    return {
      data,
      total,
      offset,
      size,
    };
  }

  async findAllByMedicationId(medicationId: string) {
    const data = await this.db
      .select()
      .from(medicationBatches)
      .where(eq(medicationBatches.medicationId, medicationId));

    return data;
  }

  async update(id: string, data: UpdateMedicationBatchDto) {
    const updateData = {
      ...data,
      expirationDate: data.expirationDate
        ? new Date(data.expirationDate)
        : undefined,
    };

    const [batch] = await this.db
      .update(medicationBatches)
      .set(updateData)
      .where(eq(medicationBatches.id, id))
      .returning();

    return batch;
  }

  async delete(id: string): Promise<void> {
    await this.db.delete(medicationBatches).where(eq(medicationBatches.id, id));
  }

  async deleteMany(ids: string[]): Promise<void> {
    await this.db
      .delete(medicationBatches)
      .where(inArray(medicationBatches.id, ids));
  }

  async deleteByMedicationId(medicationId: string): Promise<void> {
    await this.db
      .delete(medicationBatches)
      .where(eq(medicationBatches.medicationId, medicationId));
  }
}
