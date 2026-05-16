import { IsBoolean, IsOptional, IsString, IsNumber, Min, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMedicationDto {

  @IsInt()
  pharmacyId!: number;
  
  @IsString()
  name!: string;

  @IsString()
  dosage!: string;

  @IsString()
  pharmaceuticalForm!: string;

  @IsString()
  manufacturer!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  stripe?: string;

  @IsBoolean()
  prescriptionRequired!: boolean;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  unitPrice!: number;
}