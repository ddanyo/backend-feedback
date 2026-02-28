import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}
