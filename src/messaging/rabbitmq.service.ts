import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import * as amqp from 'amqp-connection-manager';

import { ChannelWrapper } from 'amqp-connection-manager';

import { ConfirmChannel } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection = amqp.connect([process.env.MESSAGE_SERVICE_URL]);
  public auditChannel: ChannelWrapper;

  onModuleInit() {
    this.setupAuditChannel();
  }

  private setupAuditChannel() {
    this.auditChannel = this.connection.createChannel({
      setup: async (channel: ConfirmChannel) => {
        await channel.assertExchange(process.env.MESSAGE_EXCHANGES, 'topic', {
          durable: true,
        });

        await channel.assertQueue(process.env.MESSAGE_AUDIT_QUEUE, {
          durable: true,
        });

        await channel.bindQueue(
          process.env.MESSAGE_AUDIT_QUEUE,
          process.env.MESSAGE_EXCHANGES,
          process.env.MESSAGE_AUDIT_ROUTING_KEY,
        );

        channel.prefetch(20);
      },
    });
  }

  async publishToAudit(payload: any) {
    await this.auditChannel.publish(
      process.env.MESSAGE_EXCHANGES!,
      process.env.MESSAGE_AUDIT_ROUTING_KEY!,
      JSON.stringify(payload),
    );
  }

  async onModuleDestroy() {
    await this.connection.close();
  }
}
