import { CreateMedicationDto } from '../dto/create-medication.dto';
import { UpdateMedicationDto } from '../dto/update-medication.dto';
import { MedicationEntity } from '../entities/medication.entity';

export abstract class MedicationRepositoryInterface {
  abstract create(
    data: CreateMedicationDto,
  ): Promise<MedicationEntity>;

  abstract update(id: string, data: UpdateMedicationDto): Promise<any> | undefined;

  abstract findAll(): Promise<MedicationEntity[]>;

  abstract findOne(
    id: string,
  ): Promise<MedicationEntity | undefined>;

  abstract findByPharmacyId(pharmacyId: number): Promise<MedicationEntity[]>;

  abstract delete(id: string): Promise<void>;
}