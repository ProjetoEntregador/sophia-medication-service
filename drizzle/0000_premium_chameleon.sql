CREATE TABLE "medication_batches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"medication_id" uuid NOT NULL,
	"batch_code" varchar(100) NOT NULL,
	"quantity" integer NOT NULL,
	"expiration_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"dosage" varchar(100) NOT NULL,
	"pharmaceutical_form" varchar(100) NOT NULL,
	"manufacturer" varchar(255) NOT NULL,
	"description" varchar(500),
	"stripe" varchar(100),
	"prescription_required" boolean NOT NULL,
	"unit_price" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "medication_batches" ADD CONSTRAINT "medication_batches_medication_id_medications_id_fk" FOREIGN KEY ("medication_id") REFERENCES "public"."medications"("id") ON DELETE no action ON UPDATE no action;