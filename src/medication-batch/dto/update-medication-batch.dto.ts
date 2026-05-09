import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicationBatchDto } from './create-medication-batch.dto';

export class UpdateMedicationBatchDto extends PartialType(
  CreateMedicationBatchDto,
) {}