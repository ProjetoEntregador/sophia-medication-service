import { Injectable } from '@nestjs/common';
import { CreateMedicationBatchDto } from '../dto/create-medication-batch.dto';
import { UpdateMedicationBatchDto } from '../dto/update-medication-batch.dto';
import { CreateMedicationBatchUseCase } from '../use-cases/create-medication-batch.use-case';
import { FindAllMedicationBatchUseCase } from '../use-cases/find-all-medication-batch.use-case';
import { FindOneMedicationBatchUseCase } from '../use-cases/find-one-medication-batch.use-case';
import { FindBatchesByMedicationIdUseCase } from '../use-cases/find-batches-by-medication-id.use-case';
import { UpdateMedicationBatchUseCase } from '../use-cases/update-medication-batch.use-case';
import { DeleteMedicationBatchUseCase } from '../use-cases/delete-medication-batch.use-case';

@Injectable()
export class MedicationBatchService {
  constructor(
    private readonly createMedicationBatchUseCase: CreateMedicationBatchUseCase,
    private readonly findAllMedicationBatchUseCase: FindAllMedicationBatchUseCase,
    private readonly findOneMedicationBatchUseCase: FindOneMedicationBatchUseCase,
    private readonly findBatchesByMedicationIdUseCase: FindBatchesByMedicationIdUseCase,
    private readonly updateMedicationBatchUseCase: UpdateMedicationBatchUseCase,
    private readonly deleteMedicationBatchUseCase: DeleteMedicationBatchUseCase,
  ) { }

  async create(data: CreateMedicationBatchDto) {
    return this.createMedicationBatchUseCase.execute(data);
  }

  async findAll() {
    return this.findAllMedicationBatchUseCase.execute();
  }

  async findOne(id: string) {
    return this.findOneMedicationBatchUseCase.execute(id);
  }

  async findByMedicationId(medicationId: string) {
    return this.findBatchesByMedicationIdUseCase.execute(
      medicationId,
    );
  }

  async update(id: string, data: UpdateMedicationBatchDto) {
    return await this.updateMedicationBatchUseCase.execute(id, data);
  }

  async delete(id: string) {
  return this.deleteMedicationBatchUseCase.execute(id);
}

}