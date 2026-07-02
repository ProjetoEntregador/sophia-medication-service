import { Injectable } from '@nestjs/common';
import { MedicationRepositoryInterface } from '../repositories/medication.repository.interface';

@Injectable()
export class FindAllMedicationsUseCase {
  constructor(
    private readonly medicationRepository: MedicationRepositoryInterface,
  ) {}

  async execute(offset: number, size: number) {
    return this.medicationRepository.findAll(
      offset,
      size
    );
  }
}