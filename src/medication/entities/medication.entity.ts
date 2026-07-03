export class MedicationEntity {
  id!: string;
  pharmacyId!: number;
  name!: string;
  dosage!: string;
  pharmaceuticalForm!: string;
  manufacturer!: string;
  description?: string;
  stripe?: string;
  prescriptionRequired!: boolean;
  unitPrice!: string;
}