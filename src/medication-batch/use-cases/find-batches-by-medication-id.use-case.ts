import { Injectable } from '@nestjs/common';

import { MedicationBatchRepositoryInterface } from '../repositories/medication-batch.repository.interface';

@Injectable()
export class FindBatchesByMedicationIdUseCase {
  constructor(
    private readonly medicationBatchRepository: MedicationBatchRepositoryInterface,
  ) {}

  async execute(medicationId: string) {
    return this.medicationBatchRepository.findByMedicationId(
      medicationId,
    );
  }
}