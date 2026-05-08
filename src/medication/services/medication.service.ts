import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from '../dto/create-medication.dto';
import { MedicationEntity } from '../entities/medication.entity';
import { CreateMedicationUseCase } from '../use-cases/create-medication.use-case';

@Injectable()
export class MedicationService {
  constructor(
    private readonly createMedicationUseCase: CreateMedicationUseCase,
  ) {}

  async create(
    data: CreateMedicationDto,
  ): Promise<MedicationEntity> {
    return this.createMedicationUseCase.execute(data);
  }
}