import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateMedicationDto {
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
}