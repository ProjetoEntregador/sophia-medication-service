import { Injectable } from '@nestjs/common';
import { MedicationRepositoryInterface } from '../repositories/medication.repository.interface';

@Injectable()
export class FindMedicationsByPharmacyIdUseCase {
  constructor(
    private readonly medicationRepository: MedicationRepositoryInterface,
  ) {}

  async execute(pharmacyId: number, offset: number, size: number) {
    return this.medicationRepository.findByPharmacyId(pharmacyId, offset, size);
  }
}
