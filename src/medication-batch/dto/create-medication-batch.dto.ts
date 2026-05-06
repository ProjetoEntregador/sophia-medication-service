import {
  IsDateString,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateMedicationBatchDto {
  @IsString()
  medicationId!: string;

  @IsString()
  batchNumber!: string;

  @IsNumber()
  quantity!: number;

  @IsDateString()
  expirationDate!: string;

  @IsNumber()
  unitPrice!: number;
}