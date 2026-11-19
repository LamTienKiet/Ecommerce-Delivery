import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';
import 'dotenv/config';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not defined');
    }
    const adapter = new PrismaMssql(connectionString);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  // not onModuleDestroy: Nest runs that before closing the HTTP server, so in-flight requests would lose the DB
  async onApplicationShutdown() {
    await this.$disconnect();
  }
}
