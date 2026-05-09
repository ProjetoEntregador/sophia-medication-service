import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicationModule } from './medication/medication.module';
import { MedicationBatchModule } from './medication-batch/medication-batch.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, MedicationModule, MedicationBatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
