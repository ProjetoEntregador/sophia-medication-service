import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from '../dto/create-medication.dto';
import { MedicationEntity } from '../entities/medication.entity';
import { MedicationRepositoryInterface } from '../repositories/medication.repository.interface';

@Injectable()
export class CreateMedicationUseCase {
  constructor(
    private readonly medicationRepository: MedicationRepositoryInterface,
  ) {}

  async execute(data: CreateMedicationDto): Promise<MedicationEntity> {
    return this.medicationRepository.create(data);
  }
}
