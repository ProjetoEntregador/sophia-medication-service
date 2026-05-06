import { Injectable } from '@nestjs/common';
import { CreateMedicationDto } from './dto/create-medication.dto';

type Medication = CreateMedicationDto & {
  id: string;
};

@Injectable()
export class MedicationService {
  private medications: Medication[] = [];

  create(data: CreateMedicationDto): Medication {
    const medication: Medication = {
      id: Date.now().toString(),
      ...data,
    };

    this.medications.push(medication);

    return medication;
  }

  findAll(): Medication[] {
    return this.medications;
  }
}