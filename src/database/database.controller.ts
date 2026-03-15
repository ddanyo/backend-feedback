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
import { 
    ApiTags, 
    ApiOperation, 
    ApiResponse, 
    ApiExcludeEndpoint,
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse
} from '@nestjs/swagger';

@ApiTags('feedbacks')
@Controller('api')
export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Get()
    @ApiOperation({ summary: 'Получить список отзывов', description: 'Возвращает список отзывов с фильтрацией, поиском и пагинацией' })
    @ApiResponse({ status: 200, description: 'Успешный ответ', type: FeedbacksResponse })
    @ApiBadRequestResponse({ description: 'Некорректные параметры запроса (ошибка валидации)' })
    @ApiInternalServerErrorResponse({ description: 'Внутренняя ошибка сервера' })
    async getFeedbacks(
        @Query() dto: GetFeedbacksDto,
    ): Promise<FeedbacksResponse> {
        return this.databaseService.readFeedbacks(dto);
    }

    @Post()
    @ApiOperation({ summary: 'Создать новый отзыв', description: 'Добавляет новый отзыв в базу данных' })
    @ApiResponse({ status: 201, description: 'Отзыв успешно создан' })
    @ApiBadRequestResponse({ description: 'Ошибка валидации тела запроса' })
    @ApiInternalServerErrorResponse({ description: 'Ошибка при сохранении в базу данных' })
    async postFeedback(
        @Body() postData: CreateDatabaseDto,
    ): Promise<feedbacks_table> {
        return this.databaseService.createFeedback(postData);
    }

    @ApiExcludeEndpoint()
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

    @ApiExcludeEndpoint()
    @Delete('/:id')
    async delFeedback(@Param('id') id: number): Promise<feedbacks_table> {
        return this.databaseService.deleteFeedback({ id: Number(id) });
    }
}
