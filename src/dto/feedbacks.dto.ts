import { IsOptional, IsInt, Min, Max, IsString, IsIn } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { FeedbackSort } from '../constans/FeedbackSort';
import { feedbacks_table } from '../../generated/prisma';

export type FeedbackSort = (typeof FeedbackSort)[keyof typeof FeedbackSort];

export class CreateDatabaseDto {
    @IsInt()
    rating: number;
    @IsString()
    feedback_text?: string;
}

export class GetFeedbacksDto {
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    skip?: number;

    @IsOptional()
    @IsInt()
    @Min(5)
    @Max(100)
    @Type(() => Number)
    take?: number;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    @IsIn(['newest', 'oldest', 'rating_high', 'rating_low'])
    sortBy?: FeedbackSort;

    @IsOptional()
    @Transform(({ value }) => value === 'true')
    caseSensitive?: boolean;

    @IsOptional()
    @Transform(({ value }) => value === 'true')
    wholeWord?: boolean;
}

export class FeedbacksResponse {
    items: feedbacks_table[];
    total: number;
    totalPages: number;
}
