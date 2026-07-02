import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { DB } from '../../database/database.module';
import { medications } from '../../database/schema';
import { CreateMedicationDto } from '../dto/create-medication.dto';
import { UpdateMedicationDto } from '../dto/update-medication.dto';
import { MedicationEntity } from '../entities/medication.entity';
import { MedicationRepositoryInterface } from './medication.repository.interface';

@Injectable()
export class MedicationRepository implements MedicationRepositoryInterface {
  constructor(
    @Inject(DB)
    private readonly db: any,
  ) { }
  async create(data: CreateMedicationDto): Promise<MedicationEntity> {
    const [medication] = await this.db
      .insert(medications)
      .values({
        pharmacyId: data.pharmacyId,
        name: data.name,
        dosage: data.dosage,
        pharmaceuticalForm: data.pharmaceuticalForm,
        manufacturer: data.manufacturer,
        description: data.description,
        stripe: data.stripe,
        prescriptionRequired: data.prescriptionRequired,
        unitPrice: data.unitPrice.toString(),
      })
      .returning();

    return medication as MedicationEntity;
  }

  async update(id: string, data: UpdateMedicationDto) {
    const [medication] = await this.db
      .update(medications)
      .set(data)
      .where(eq(medications.id, id))
      .returning();

    return medication;
  }
  async findAll(offset: number, size: number): Promise<any> {
    const items = await this.db
      .select()
      .from(medications)
      .limit(size)
      .offset(offset);

    const totalResult = await this.db
      .select({
        total: sql<number>`count(*)`,
      })
      .from(medications);

    return {
      items: items as MedicationEntity[],
      total: Number(totalResult[0].total),
    };
  }

  async findOne(id: string): Promise<MedicationEntity | undefined> {
    const [medication] = await this.db
      .select()
      .from(medications)
      .where(eq(medications.id, id));

    return medication as MedicationEntity | undefined;
  }

  async findByPharmacyId(pharmacyId: number) {
    return await this.db
      .select()
      .from(medications)
      .where(eq(medications.pharmacyId, pharmacyId));
  }

  async delete(id: string): Promise<void> {
    await this.db
      .delete(medications)
      .where(eq(medications.id, id));
  }
}