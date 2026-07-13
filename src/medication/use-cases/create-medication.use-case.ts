import { Injectable } from '@nestjs/common';
import { AuthUserService } from '../../common/auth-user.service';
import { AuditService } from '../../messaging/audit.service';
import { CreateMedicationDto } from '../dto/create-medication.dto';
import { MedicationEntity } from '../entities/medication.entity';
import { MedicationRepositoryInterface } from '../repositories/medication.repository.interface';

@Injectable()
export class CreateMedicationUseCase {
  constructor(
    private readonly medicationRepository: MedicationRepositoryInterface,
    private readonly auditService: AuditService,
    private readonly authUserService: AuthUserService,
  ) {}

  async execute(
    data: CreateMedicationDto,
    authorization?: string,
  ): Promise<MedicationEntity> {
    const medication = await this.medicationRepository.create(data);

    void this.auditService.publish({
      entity: 'medication',
      oldData: null,
      newData: medication,
      operation: 'INSERT',
      changedBy: this.authUserService.getChangedBy(authorization),
    });

    return medication;
  }
}
