ALTER TABLE "medication_batches" DROP CONSTRAINT "medication_batches_medication_id_medications_id_fk";
--> statement-breakpoint
ALTER TABLE "medication_batches" ADD CONSTRAINT "medication_batches_medication_id_medications_id_fk" FOREIGN KEY ("medication_id") REFERENCES "public"."medications"("id") ON DELETE cascade ON UPDATE no action;