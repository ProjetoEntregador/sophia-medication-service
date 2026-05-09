import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { MedicationBatchRepositoryInterface } from '../repositories/medication-batch.repository.interface';
import { UpdateMedicationBatchDto } from '../dto/update-medication-batch.dto';

@Injectable()
export class UpdateMedicationBatchUseCase {
  constructor(
    @Inject(MedicationBatchRepositoryInterface)
    private readonly medicationBatchRepository: MedicationBatchRepositoryInterface,
  ) {}

  async execute(id: string, data: UpdateMedicationBatchDto) {
    const medicationBatch =
      await this.medicationBatchRepository.findOne(id);

    if (!medicationBatch) {
      throw new NotFoundException('Lote não encontrado');
    }

    return this.medicationBatchRepository.update(id, data);
  }
}