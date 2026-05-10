import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { MedicationBatchService } from '../services/medication-batch.service';
import { CreateMedicationBatchDto } from '../dto/create-medication-batch.dto';
import { UpdateMedicationBatchDto } from '../dto/update-medication-batch.dto';

@Controller('medication-batches')
export class MedicationBatchController {
  constructor(
    private readonly medicationBatchService: MedicationBatchService,
  ) { }

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationBatchService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateMedicationBatchDto,
  ) {
    return this.medicationBatchService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationBatchService.delete(id);
  }
}