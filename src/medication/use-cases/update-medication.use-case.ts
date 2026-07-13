import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthUserService } from '../../common/auth-user.service';
import { AuditService } from '../../messaging/audit.service';
import { UpdateMedicationDto } from '../dto/update-medication.dto';
import { MedicationRepositoryInterface } from '../repositories/medication.repository.interface';

@Injectable()
export class UpdateMedicationUseCase {
  constructor(
    private readonly medicationRepository: MedicationRepositoryInterface,
    private readonly auditService: AuditService,
    private readonly authUserService: AuthUserService,
  ) {}

  async execute(id: string, data: UpdateMedicationDto, authorization?: string) {
    const previousMedication = await this.medicationRepository.findOne(id);

    if (!previousMedication) {
      throw new NotFoundException('Medication not found');
    }

    const medication = await this.medicationRepository.update(id, data);

    if (!medication) {
      throw new NotFoundException('Medication not found');
    }

    void this.auditService.publish({
      entity: 'medication',
      oldData: previousMedication,
      newData: medication,
      operation: 'UPDATE',
      changedBy: this.authUserService.getChangedBy(authorization),
    });

    return medication;
  }
}
