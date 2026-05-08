import { Injectable } from '@nestjs/common';
import { MedicationRepositoryInterface } from '../repositories/medication.repository.interface';

@Injectable()
export class FindAllMedicationsUseCase {
  constructor(
    private readonly medicationRepository: MedicationRepositoryInterface,
  ) {}

  async execute() {
    return this.medicationRepository.findAll();
  }
}