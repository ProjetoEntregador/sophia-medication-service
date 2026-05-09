import { Injectable } from '@nestjs/common';

import { MedicationBatchRepositoryInterface } from '../repositories/medication-batch.repository.interface';

@Injectable()
export class FindAllMedicationBatchUseCase {
  constructor(
    private readonly medicationBatchRepository: MedicationBatchRepositoryInterface,
  ) {}

  async execute() {
    return this.medicationBatchRepository.findAll();
  }
}