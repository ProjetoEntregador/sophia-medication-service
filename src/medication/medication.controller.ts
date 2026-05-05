import { Body, Controller, Get, Post } from '@nestjs/common';
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './dto/create-medication.dto';

@Controller('medications')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  create(@Body() data: CreateMedicationDto) {
    return this.medicationService.create(data);
  }

  @Get()
  findAll() {
    return this.medicationService.findAll();
  }
}