import { Injectable } from '@nestjs/common';
import { AuthUserService } from '../../common/auth-user.service';
import { AuditService } from '../../messaging/audit.service';
import { CreateMedicationBatchDto } from '../dto/create-medication-batch.dto';
import { MedicationBatchRepositoryInterface } from '../repositories/medication-batch.repository.interface';

@Injectable()
export class CreateMedicationBatchUseCase {
  constructor(
    private readonly medicationBatchRepository: MedicationBatchRepositoryInterface,
    private readonly auditService: AuditService,
    private readonly authUserService: AuthUserService,
  ) {}

  async execute(data: CreateMedicationBatchDto, authorization?: string) {
    const batch = await this.medicationBatchRepository.create(data);

    await this.auditService.publish({
      entity: 'medication_batch',
      oldData: null,
      newData: batch,
      operation: 'INSERT',
      changedBy: this.authUserService.getChangedBy(authorization),
    });

    return batch;
  }
}
