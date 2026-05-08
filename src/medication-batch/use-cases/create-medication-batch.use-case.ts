import { Injectable } from '@nestjs/common';
import { CreateMedicationBatchDto } from '../dto/create-medication-batch.dto';
import { MedicationBatchRepository } from '../repositories/medication-batch.repository';

@Injectable()
export class CreateMedicationBatchUseCase {
  constructor(
    private readonly medicationBatchRepository: MedicationBatchRepository,
  ) {}

  async execute(data: CreateMedicationBatchDto) {
    return this.medicationBatchRepository.create(data);
  }
}