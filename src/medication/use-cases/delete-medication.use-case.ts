import { Injectable, NotFoundException } from '@nestjs/common';
import { MedicationRepositoryInterface } from '../repositories/medication.repository.interface';
import { MedicationBatchRepositoryInterface } from '../../medication-batch/repositories/medication-batch.repository.interface';

@Injectable()
export class DeleteMedicationUseCase {
  constructor(
    private readonly medicationRepository: MedicationRepositoryInterface,
    private readonly medicationBatchRepository: MedicationBatchRepositoryInterface,
  ) {}

  async execute(id: string): Promise<void> {
    const medication = await this.medicationRepository.findOne(id);

    if (!medication) {
      throw new NotFoundException('Medicamento não encontrado');
    }

    await this.medicationBatchRepository.deleteByMedicationId(id);

    await this.medicationRepository.delete(id);
  }
}