import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicationBatchRepositoryInterface } from '../repositories/medication-batch.repository.interface';

@Injectable()
export class DeleteMedicationBatchUseCase {
  constructor(
    private readonly medicationBatchRepository: MedicationBatchRepositoryInterface,
  ) {}

  async execute(id: string): Promise<void> {
    const batch = await this.medicationBatchRepository.findOne(id);

    if (!batch) {
      throw new NotFoundException('Lote não encontrado');
    }

    await this.medicationBatchRepository.delete(id);
  }
}