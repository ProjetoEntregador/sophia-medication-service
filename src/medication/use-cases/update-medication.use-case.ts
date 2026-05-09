import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMedicationDto } from '../dto/update-medication.dto';
import { MedicationRepositoryInterface } from '../repositories/medication.repository.interface';

@Injectable()
export class UpdateMedicationUseCase {
  constructor(
    private readonly medicationRepository: MedicationRepositoryInterface,
  ) {}

  async execute(id: string, data: UpdateMedicationDto) {
    const medication = await this.medicationRepository.update(id, data);

    if (!medication) {
      throw new NotFoundException('Medication not found');
    }

    return medication;
  }
}