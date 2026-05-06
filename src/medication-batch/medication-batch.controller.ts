import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MedicationBatchService } from './medication-batch.service';
import { CreateMedicationBatchDto } from './dto/create-medication-batch.dto';

@Controller('medication-batches')
export class MedicationBatchController {
  constructor(
    private readonly medicationBatchService: MedicationBatchService,
  ) {}

  @Post()
  create(@Body() data: CreateMedicationBatchDto) {
    return this.medicationBatchService.create(data);
  }

  @Get()
  findAll() {
    return this.medicationBatchService.findAll();
  }

  @Get('medication/:medicationId')
  findByMedicationId(@Param('medicationId') medicationId: string) {
    return this.medicationBatchService.findByMedicationId(medicationId);
  }
}