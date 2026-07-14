import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  Headers,
} from '@nestjs/common';
import { MedicationBatchService } from '../services/medication-batch.service';
import { CreateMedicationBatchDto } from '../dto/create-medication-batch.dto';
import { UpdateMedicationBatchDto } from '../dto/update-medication-batch.dto';
import { MedicationService } from '../../medication/services/medication.service';
import { PharmacyPermissionService } from '../../pharmacy/pharmacy-permission.service';

@Controller('medication-batches')
export class MedicationBatchController {
  constructor(
    private readonly medicationService: MedicationService,
    private readonly pharmacyPermissionService: PharmacyPermissionService,
    private readonly medicationBatchService: MedicationBatchService,
  ) {}

  @Post()
  async create(
    @Body() data: CreateMedicationBatchDto,
    @Headers('authorization') authorization: string,
  ) {
    const medication = await this.medicationService.findOne(data.medicationId);

    await this.pharmacyPermissionService.validatePermission(
      medication.pharmacyId,
      authorization,
    );

    return this.medicationBatchService.create(data, authorization);
  }

  @Get()
  async findAll(
    @Query('offset') offset = '0',
    @Query('size') size = '10',
    @Headers('authorization') authorization: string,
  ) {
    const result = await this.medicationBatchService.findAll(
      Number(offset),
      Number(size),
    );
    const medicationIds: string[] = [
      ...new Set<string>(result.data.map((batch) => batch.medicationId)),
    ];

    await Promise.all(
      medicationIds.map((medicationId) =>
        this.validatePermissionByMedicationId(medicationId, authorization),
      ),
    );

    return result;
  }

  @Get('medication/:medicationId')
  async findByMedicationId(
    @Param('medicationId') medicationId: string,
    @Headers('authorization') authorization: string,
    @Query('offset') offset = '0',
    @Query('size') size = '10',
  ) {
    const medication = await this.medicationService.findOne(medicationId);

    await this.pharmacyPermissionService.validatePermission(
      medication.pharmacyId,
      authorization,
    );

    return this.medicationBatchService.findByMedicationId(
      medicationId,
      Number(offset),
      Number(size),
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    const batch = await this.medicationBatchService.findOne(id);
    await this.validatePermissionByMedicationId(
      batch.medicationId,
      authorization,
    );

    return batch;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateMedicationBatchDto,
    @Headers('authorization') authorization: string,
  ) {
    const batch = await this.medicationBatchService.findOne(id);
    await this.validatePermissionByMedicationId(
      batch.medicationId,
      authorization,
    );

    return this.medicationBatchService.update(id, data, authorization);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Headers('authorization') authorization: string,
  ) {
    const batch = await this.medicationBatchService.findOne(id);
    await this.validatePermissionByMedicationId(
      batch.medicationId,
      authorization,
    );

    return this.medicationBatchService.delete(id, authorization);
  }

  private async validatePermissionByMedicationId(
    medicationId: string,
    authorization: string,
  ) {
    const medication = await this.medicationService.findOne(medicationId);

    await this.pharmacyPermissionService.validatePermission(
      medication.pharmacyId,
      authorization,
    );
  }
}
