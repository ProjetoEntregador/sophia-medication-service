import { CreateMedicationDto } from '../dto/create-medication.dto';
import { MedicationEntity } from '../entities/medication.entity';

export abstract class MedicationRepositoryInterface {
  abstract create(
    data: CreateMedicationDto,
  ): Promise<MedicationEntity>;
}