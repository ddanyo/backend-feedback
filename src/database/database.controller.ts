import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Query,
} from '@nestjs/common';
import { DatabaseService } from './database.service';
import { CreateDatabaseDto } from '../dto/feedbacks.dto';
import { feedbacks_table } from '../../generated/prisma';
import { FeedbacksResponse } from '../dto/feedbacks.dto';
import { GetFeedbacksDto } from '../dto/feedbacks.dto';

@Controller('api')
export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Get()
    async getFeedbacks(
        @Query() dto: GetFeedbacksDto,
    ): Promise<FeedbacksResponse> {
        return this.databaseService.readFeedbacks(dto);
    }

    @Post()
    async postFeedback(
        @Body() postData: CreateDatabaseDto,
    ): Promise<feedbacks_table> {
        return this.databaseService.createFeedback(postData);
    }

    @Put('/:id')
    async putFeedback(
        @Param('id') id: number,
        @Body() postData: CreateDatabaseDto,
    ): Promise<feedbacks_table> {
        return this.databaseService.updateFeedback({
            data: postData,
            where: { id: Number(id) },
        });
    }

    @Delete('/:id')
    async delFeedback(@Param('id') id: number): Promise<feedbacks_table> {
        return this.databaseService.deleteFeedback({ id: Number(id) });
    }
}
