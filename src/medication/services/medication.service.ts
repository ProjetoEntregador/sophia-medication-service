import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from '../dto/create-medication.dto';
import { CreateMedicationUseCase } from '../use-cases/create-medication.use-case';
import { FindAllMedicationsUseCase } from '../use-cases/find-all-medications.use-case';
import { FindOneMedicationUseCase } from '../use-cases/find-one-medication.use-case';

@Injectable()
export class MedicationService {
  constructor(
    private readonly createMedicationUseCase: CreateMedicationUseCase,
    private readonly findAllMedicationsUseCase: FindAllMedicationsUseCase,
    private readonly findOneMedicationUseCase: FindOneMedicationUseCase,
  ) {}

  create(data: CreateMedicationDto) {
    return this.createMedicationUseCase.execute(data);
  }

  findAll() {
    return this.findAllMedicationsUseCase.execute();
  }

  findOne(id: string) {
    return this.findOneMedicationUseCase.execute(id);
  }
}