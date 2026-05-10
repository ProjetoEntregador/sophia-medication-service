import { CreateMedicationBatchDto } from '../dto/create-medication-batch.dto';
import { UpdateMedicationBatchDto } from '../dto/update-medication-batch.dto';

export abstract class MedicationBatchRepositoryInterface {
  abstract create(data: CreateMedicationBatchDto);

  abstract findAll();

  abstract findOne(id: string);

  abstract findByMedicationId(
    medicationId: string,
  );

  abstract update(id: string, data: UpdateMedicationBatchDto);

  abstract delete(id: string): Promise<void>;
}