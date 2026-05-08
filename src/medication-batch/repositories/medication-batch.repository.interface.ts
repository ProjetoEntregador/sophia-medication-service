import { CreateMedicationBatchDto } from '../dto/create-medication-batch.dto';

export abstract class MedicationBatchRepositoryInterface {
  abstract create(data: CreateMedicationBatchDto);

  abstract findAll();

  abstract findOne(id: string);

  abstract findByMedicationId(
    medicationId: string,
  );
}