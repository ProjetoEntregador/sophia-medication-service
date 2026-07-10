import { Global, Module } from '@nestjs/common';
import { AuthUserService } from '../common/auth-user.service';
import { AuditService } from './audit.service';
import { RabbitMQService } from './rabbitmq.service';

@Global()
@Module({
  providers: [RabbitMQService, AuditService, AuthUserService],
  exports: [RabbitMQService, AuditService, AuthUserService],
})
export class RabbitMQModule {}
