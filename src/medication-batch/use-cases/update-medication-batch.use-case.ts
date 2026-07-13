import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AuthUserService } from '../../common/auth-user.service';
import { AuditService } from '../../messaging/audit.service';
import { MedicationBatchRepositoryInterface } from '../repositories/medication-batch.repository.interface';
import { UpdateMedicationBatchDto } from '../dto/update-medication-batch.dto';

@Injectable()
export class UpdateMedicationBatchUseCase {
  constructor(
    @Inject(MedicationBatchRepositoryInterface)
    private readonly medicationBatchRepository: MedicationBatchRepositoryInterface,
    private readonly auditService: AuditService,
    private readonly authUserService: AuthUserService,
  ) {}

  async execute(
    id: string,
    data: UpdateMedicationBatchDto,
    authorization?: string,
  ) {
    const medicationBatch = await this.medicationBatchRepository.findOne(id);

    if (!medicationBatch) {
      throw new NotFoundException('Lote não encontrado');
    }

    const updatedBatch = await this.medicationBatchRepository.update(id, data);

    void this.auditService.publish({
      entity: 'medication_batch',
      oldData: medicationBatch,
      newData: updatedBatch,
      operation: 'UPDATE',
      changedBy: this.authUserService.getChangedBy(authorization),
    });

    return updatedBatch;
  }
}
