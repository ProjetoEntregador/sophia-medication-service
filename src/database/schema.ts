import {
  boolean,
  integer,
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const medications = pgTable('medications', {
  id: uuid('id').defaultRandom().primaryKey(),

  pharmacyId: integer('pharmacy_id').notNull(),

  name: varchar('name', { length: 255 }).notNull(),

  dosage: varchar('dosage', { length: 100 }).notNull(),

  pharmaceuticalForm: varchar('pharmaceutical_form', {
    length: 100,
  }).notNull(),

  manufacturer: varchar('manufacturer', {
    length: 255,
  }).notNull(),

  description: varchar('description', {
    length: 500,
  }),

  stripe: varchar('stripe', {
    length: 100,
  }),

  prescriptionRequired: boolean('prescription_required').notNull(),

  unitPrice: numeric('unit_price', {
    precision: 10,
    scale: 2,
  }).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const medicationBatches = pgTable('medication_batches', {
  id: uuid('id').defaultRandom().primaryKey(),

  medicationId: uuid('medication_id')
    .references(() => medications.id, { onDelete: 'cascade' })
    .notNull(),

  batchCode: varchar('batch_code', {
    length: 100,
  }).notNull(),

  quantity: integer('quantity').notNull(),

  expirationDate: timestamp('expiration_date').notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});
