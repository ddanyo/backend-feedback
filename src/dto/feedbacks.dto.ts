import { IsOptional, IsInt, Min, Max, IsString, IsIn, IsBoolean } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { FeedbackSort } from '../constans/FeedbackSort';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

type ValueOf<T> = T[keyof T];

export class FeedbackItemDto {
    @ApiProperty({ example: 1 })
    id!: number;

    @ApiProperty({ example: 5 })
    rating!: number;

    @ApiProperty({ example: '2024-03-15T12:00:00Z' })
    date_time!: Date;

    @ApiPropertyOptional({ example: 'Отличный сервис!', nullable: true })
    feedback_text!: string | null;
}

export class CreateDatabaseDto {
    @ApiProperty({ example: 5, description: 'Рейтинг отзыва (1-5)' })
    @IsInt()
    rating!: number;

    @ApiPropertyOptional({
        example: 'Хороший отзыв',
        description: 'Текст отзыва',
    })
    @IsString()
    @IsOptional()
    feedback_text?: string;
}

export class GetFeedbacksDto {
    @ApiPropertyOptional({ example: 0, description: 'Количество пропускаемых записей', type: Number })
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    skip?: number;

    @ApiPropertyOptional({ example: 10, description: 'Количество записей для выборки', type: Number })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(500)
    @Type(() => Number)
    take?: number;

    @ApiPropertyOptional({ example: 'поиск', description: 'Строка поиска по тексту отзыва' })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        enum: ['newest', 'oldest', 'rating_high', 'rating_low'],
        description: 'Сортировка',
    })
    @IsOptional()
    @IsString()
    @IsIn(['newest', 'oldest', 'rating_high', 'rating_low'])
    sortBy?: ValueOf<typeof FeedbackSort>;

    @ApiPropertyOptional({ example: false, description: 'Учитывать регистр при поиске', type: Boolean })
    @IsOptional()
    @Transform(({ value }) => value === 'true' || value === true)
    @IsBoolean()
    caseSensitive?: boolean;

    @ApiPropertyOptional({ example: false, description: 'Поиск только по целым словам', type: Boolean })
    @IsOptional()
    @Transform(({ value }) => value === 'true' || value === true)
    @IsBoolean()
    wholeWord?: boolean;
}

export class FeedbacksResponse {
    @ApiProperty({ type: [FeedbackItemDto], description: 'Список отзывов' })
    items!: FeedbackItemDto[];

    @ApiProperty({ example: 100, description: 'Общее количество записей' })
    total!: number;

    @ApiProperty({ example: 10, description: 'Общее количество страниц' })
    totalPages!: number;
}
