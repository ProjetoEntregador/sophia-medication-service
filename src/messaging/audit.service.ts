import { Injectable, Logger } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';

type AuditOperation = 'INSERT' | 'UPDATE' | 'DELETE';

interface AuditEventPayload {
  entity: string;
  oldData: unknown;
  newData: unknown;
  operation: AuditOperation;
  changedBy: string;
}

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);
  private readonly serviceName = 'medication';

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async publish(payload: AuditEventPayload): Promise<void> {
    try {
      await this.rabbitMQService.publishToAudit({
        service: this.serviceName,
        entity: payload.entity,
        oldData: payload.oldData,
        newData: payload.newData,
        operation: payload.operation,
        changedBy: payload.changedBy,
        occurredAt: new Date().toISOString(),
      });
    } catch (error) {
      this.logger.error(
        `Failed to publish audit event for ${payload.entity} ${payload.operation}`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }
}
