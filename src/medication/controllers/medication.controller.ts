import { Body, Controller, Get, Param, Post, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { MedicationService } from '../services/medication.service';
import { CreateMedicationDto } from '../dto/create-medication.dto';
import { UpdateMedicationDto } from '../dto/update-medication.dto';
import { UpdateMedicationUseCase } from '../use-cases/update-medication.use-case';
import { FindMedicationsByPharmacyIdUseCase } from '../use-cases/find-medications-by-pharmacy-id.use-case';
@Controller('medications')
export class MedicationController {
  constructor(
    private readonly medicationService: MedicationService,
    private readonly findMedicationsByPharmacyIdUseCase: FindMedicationsByPharmacyIdUseCase,
    private readonly updateMedicationUseCase: UpdateMedicationUseCase,
  ) { }

  @Post()
  create(@Body() data: CreateMedicationDto) {
    return this.medicationService.create(data);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateMedicationDto,
  ) {
    return this.medicationService.update(id, data);
  }

  @Get()
  findAll() {
    return this.medicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationService.findOne(id);
  }

  @Get('pharmacy/:pharmacyId')
  async findByPharmacyId(
    @Param('pharmacyId', ParseIntPipe) pharmacyId: number,
  ) {
    return this.findMedicationsByPharmacyIdUseCase.execute(pharmacyId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.medicationService.delete(id);
  }
}