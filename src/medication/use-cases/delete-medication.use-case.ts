import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthUserService } from '../../common/auth-user.service';
import { AuditService } from '../../messaging/audit.service';
import { MedicationRepositoryInterface } from '../repositories/medication.repository.interface';
import { MedicationBatchRepositoryInterface } from '../../medication-batch/repositories/medication-batch.repository.interface';

@Injectable()
export class DeleteMedicationUseCase {
  constructor(
    private readonly medicationRepository: MedicationRepositoryInterface,
    private readonly medicationBatchRepository: MedicationBatchRepositoryInterface,
    private readonly auditService: AuditService,
    private readonly authUserService: AuthUserService,
  ) {}

  async execute(id: string, authorization?: string): Promise<void> {
    const medication = await this.medicationRepository.findOne(id);

    if (!medication) {
      throw new NotFoundException('Medicamento não encontrado');
    }

    await this.medicationBatchRepository.deleteByMedicationId(id);

    await this.medicationRepository.delete(id);

    await this.auditService.publish({
      entity: 'medication',
      oldData: medication,
      newData: null,
      operation: 'DELETE',
      changedBy: this.authUserService.getChangedBy(authorization),
    });
  }
}
