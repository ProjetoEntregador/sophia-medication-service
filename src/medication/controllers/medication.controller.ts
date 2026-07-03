import { Body, Controller, Get, Param, Post, Patch, Delete, ParseIntPipe, Query, Headers, } from '@nestjs/common';
import { MedicationService } from '../services/medication.service';
import { CreateMedicationDto } from '../dto/create-medication.dto';
import { UpdateMedicationDto } from '../dto/update-medication.dto';
import { UpdateMedicationUseCase } from '../use-cases/update-medication.use-case';
import { FindMedicationsByPharmacyIdUseCase } from '../use-cases/find-medications-by-pharmacy-id.use-case';
import { PharmacyPermissionService } from '../../pharmacy/pharmacy-permission.service';

@Controller('medications')
export class MedicationController {
  constructor(
    private readonly pharmacyPermissionService: PharmacyPermissionService,
    private readonly medicationService: MedicationService,
    private readonly findMedicationsByPharmacyIdUseCase: FindMedicationsByPharmacyIdUseCase,
    private readonly updateMedicationUseCase: UpdateMedicationUseCase,
  ) {}

  @Post()
  async create(
    @Body() data: CreateMedicationDto,
    @Headers('authorization') authorization: string,
  ) {
    await this.pharmacyPermissionService.validatePermission(
      data.pharmacyId,
      authorization,
    );

    return this.medicationService.create(data);
  }

  @Get()
  findAll(
    @Query('offset') offset = '0',
    @Query('size') size = '10',
  ) {
    return this.medicationService.findAll(Number(offset), Number(size));
  }

  @Get('pharmacy/:pharmacyId')
  async findByPharmacyId(
    @Param('pharmacyId', ParseIntPipe) pharmacyId: number,
    @Headers('authorization') authorization: string,
  ) {
    await this.pharmacyPermissionService.validatePermission(
      pharmacyId,
      authorization,
    );

    return this.findMedicationsByPharmacyIdUseCase.execute(pharmacyId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    const medication = await this.medicationService.findOne(id);

    await this.pharmacyPermissionService.validatePermission(
      medication.pharmacyId,
      authorization,
    );

    return medication;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateMedicationDto,
    @Headers('authorization') authorization: string,
  ) {
    const medication = await this.medicationService.findOne(id);

    await this.pharmacyPermissionService.validatePermission(
      medication.pharmacyId,
      authorization,
    );

    return this.updateMedicationUseCase.execute(id, data);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    const medication = await this.medicationService.findOne(id);

    await this.pharmacyPermissionService.validatePermission(
      medication.pharmacyId,
      authorization,
    );

    return this.medicationService.delete(id);
  }
}