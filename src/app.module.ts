import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicationModule } from './medication/medication.module';
import { MedicationBatchModule } from './medication-batch/medication-batch.module';
import { DatabaseModule } from './database/database.module';
import { RabbitMQModule } from './messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    RabbitMQModule,
    MedicationModule,
    MedicationBatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
