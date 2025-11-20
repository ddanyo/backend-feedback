import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { DatabaseService } from './database.service';
import { feedbacks_table } from '../../generated/prisma';
import { CreateDatabaseDto } from '../dto/database.dto';

@Controller('api')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async getFeedbacks(): Promise<feedbacks_table[]> {
    return this.databaseService.readFeedbacks({});
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
