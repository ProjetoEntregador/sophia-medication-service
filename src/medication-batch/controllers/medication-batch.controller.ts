import { Body, Controller, Post } from '@nestjs/common';
import { MedicationBatchService } from '../services/medication-batch.service';
import { CreateMedicationBatchDto } from '../dto/create-medication-batch.dto';

@Controller('medication-batches')
export class MedicationBatchController {
  constructor(
    private readonly medicationBatchService: MedicationBatchService,
  ) {}

  @Post()
  create(@Body() data: CreateMedicationBatchDto) {
    return this.medicationBatchService.create(data);
  }
}