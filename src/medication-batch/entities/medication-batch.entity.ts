export class MedicationBatchEntity {
  id!: string;

  medicationId!: string;

  batchCode!: string;

  quantity!: number;

  expirationDate!: Date;

  createdAt!: Date;
}