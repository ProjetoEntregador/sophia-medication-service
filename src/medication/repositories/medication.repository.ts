import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from '../../database/db';
import { medications } from '../../database/schema';
import { CreateMedicationDto } from '../dto/create-medication.dto';
import { MedicationEntity } from '../entities/medication.entity';
import { MedicationRepositoryInterface } from './medication.repository.interface';

@Injectable()
export class MedicationRepository implements MedicationRepositoryInterface {
  async create(data: CreateMedicationDto): Promise<MedicationEntity> {
    const [medication] = await db
      .insert(medications)
      .values({
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

  async findAll(): Promise<MedicationEntity[]> {
    const result = await db.select().from(medications);

    return result as MedicationEntity[];
  }

  async findOne(id: string): Promise<MedicationEntity | undefined> {
    const [medication] = await db
      .select()
      .from(medications)
      .where(eq(medications.id, id));

    return medication as MedicationEntity | undefined;
  }
}