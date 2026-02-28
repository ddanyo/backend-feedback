import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        const connectionString = process.env.DATABASE_URL;
        const pool = new Pool({ connectionString });
        const adapter = new PrismaPg(pool);
        super({ adapter });
    }
    async onModuleInit() {
        await this.$connect();
        console.log('Prisma connected to DB');
    }

    async onModuleDestroy() {
        await this.$disconnect();
        console.log('Prisma disconnected from DB');
    }
}
