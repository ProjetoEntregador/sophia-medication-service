import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicationRepositoryInterface } from '../repositories/medication.repository.interface';

@Injectable()
export class FindOneMedicationUseCase {
  constructor(
    private readonly medicationRepository: MedicationRepositoryInterface,
  ) {}

  async execute(id: string) {
    const medication = await this.medicationRepository.findOne(id);

    if (!medication) {
      throw new NotFoundException('Medication not found');
    }

    return medication;
  }
}