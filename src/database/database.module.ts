import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export const DB = 'DB';

@Global()
@Module({
  providers: [
    {
      provide: DB,
      useFactory: () => {
        const pool = new Pool({
          connectionString: process.env.MEDICATION_DATABASE_URL,
        });

        return drizzle(pool);
      },
    },
  ],
  exports: [DB],
})
export class DatabaseModule {}
