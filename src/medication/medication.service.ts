import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';

@Injectable()
export class MedicationService {
  private medications: CreateMedicationDto[] = [];

  create(data: CreateMedicationDto) {
    const medication = {
      id: Date.now().toString(),
      ...data,
    };

    this.medications.push(medication);

    return medication;
  }

  findAll() {
    return this.medications;
  }
}