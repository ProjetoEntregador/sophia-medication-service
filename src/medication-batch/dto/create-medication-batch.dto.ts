import { IsDateString, IsInt, IsPositive, IsString } from 'class-validator';

export class CreateMedicationBatchDto {
  @IsString()
  medicationId!: string;

  @IsString()
  batchNumber!: string;

  @IsInt()
  @IsPositive()
  quantity!: number;

  @IsDateString()
  expirationDate!: string;
}