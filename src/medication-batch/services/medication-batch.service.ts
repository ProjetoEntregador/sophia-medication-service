import { Injectable } from '@nestjs/common';
import { CreateMedicationBatchDto } from '../dto/create-medication-batch.dto';
import { CreateMedicationBatchUseCase } from '../use-cases/create-medication-batch.use-case';

@Injectable()
export class MedicationBatchService {
  constructor(
    private readonly createMedicationBatchUseCase: CreateMedicationBatchUseCase,
  ) {}

  async create(data: CreateMedicationBatchDto) {
    return this.createMedicationBatchUseCase.execute(data);
  }
}