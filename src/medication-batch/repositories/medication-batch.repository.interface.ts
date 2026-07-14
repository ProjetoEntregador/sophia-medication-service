import { CreateMedicationBatchDto } from '../dto/create-medication-batch.dto';
import { UpdateMedicationBatchDto } from '../dto/update-medication-batch.dto';
import { MedicationBatchEntity } from '../entities/medication-batch.entity';

export abstract class MedicationBatchRepositoryInterface {
  abstract create(data: CreateMedicationBatchDto);

  abstract findAll(offset: number, size: number): Promise<any>;

  abstract findOne(id: string);

  abstract findByMedicationId(
    medicationId: string,
    offset: number,
    size: number,
  ): Promise<any>;

  abstract findAllByMedicationId(
    medicationId: string,
  ): Promise<MedicationBatchEntity[]>;

  abstract update(id: string, data: UpdateMedicationBatchDto);

  abstract delete(id: string): Promise<void>;

  abstract deleteMany(ids: string[]): Promise<void>;

  abstract deleteByMedicationId(medicationId: string): Promise<void>;
}
