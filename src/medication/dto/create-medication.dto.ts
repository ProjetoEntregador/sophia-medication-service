import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateMedicationDto {
  @IsString()
  name!: string;

  @IsString()
  dosage!: string;

  @IsString()
  pharmaceuticalForm!: string;

  @IsString()
  manufacturer!: string;

  @IsNumber()
  stockQuantity!: number;

  @IsDateString()
  expirationDate!: string;
}