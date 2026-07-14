import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthUserService } from '../../common/auth-user.service';
import { AuditService } from '../../messaging/audit.service';
import { MedicationBatchRepositoryInterface } from '../repositories/medication-batch.repository.interface';

@Injectable()
export class DeleteMedicationBatchUseCase {
  constructor(
    private readonly medicationBatchRepository: MedicationBatchRepositoryInterface,
    private readonly auditService: AuditService,
    private readonly authUserService: AuthUserService,
  ) {}

  async execute(id: string, authorization?: string): Promise<void> {
    const batch = await this.medicationBatchRepository.findOne(id);

    if (!batch) {
      throw new NotFoundException('Lote não encontrado');
    }

    await this.medicationBatchRepository.delete(id);

    void this.auditService.publish({
      entity: 'medication_batch',
      oldData: batch,
      newData: null,
      operation: 'DELETE',
      changedBy: this.authUserService.getChangedBy(authorization),
    });
  }
}
