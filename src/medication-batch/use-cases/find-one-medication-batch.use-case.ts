import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicationBatchEntity } from '../entities/medication-batch.entity';
import { MedicationBatchRepositoryInterface } from '../repositories/medication-batch.repository.interface';

@Injectable()
export class FindOneMedicationBatchUseCase {
  constructor(
    private readonly medicationBatchRepository: MedicationBatchRepositoryInterface,
  ) {}

  async execute(id: string): Promise<MedicationBatchEntity> {
    const batch = await this.medicationBatchRepository.findOne(id);

    if (!batch) {
      throw new NotFoundException('Medication batch not found');
    }

    return batch;
  }
}