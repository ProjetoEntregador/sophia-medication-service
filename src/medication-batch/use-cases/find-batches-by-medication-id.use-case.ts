import { Injectable } from '@nestjs/common';

import { MedicationBatchRepositoryInterface } from '../repositories/medication-batch.repository.interface';

@Injectable()
export class FindBatchesByMedicationIdUseCase {
  constructor(
    private readonly medicationBatchRepository: MedicationBatchRepositoryInterface,
  ) {}

  async execute(medicationId: string, offset: number, size: number) {
    return this.medicationBatchRepository.findByMedicationId(
      medicationId,
      offset,
      size,
    );
  }
}
