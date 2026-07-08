import { Injectable } from '@nestjs/common';
import { MedicationRepositoryInterface } from '../repositories/medication.repository.interface';
import { PharmacyPermissionService } from '../../pharmacy/pharmacy-permission.service';

@Injectable()
export class FindMedicationsByPharmacyIdUseCase {
  constructor(
    private readonly medicationRepository: MedicationRepositoryInterface,
    private readonly pharmacyPermissionService: PharmacyPermissionService,
  ) {}

  async execute(
    pharmacyId: number,
    offset: number,
    size: number,
    authorization: string,
  ) {
    const medicines = await this.medicationRepository.findByPharmacyId(
      pharmacyId,
      offset,
      size,
    );

    await this.pharmacyPermissionService.validatePermission(
      pharmacyId,
      authorization,
    );

    return medicines;
  }
}
