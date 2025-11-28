import { IsOptional, IsInt, Min, Max, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { FeedbackSort } from '../constans/FeedbackSort';

export type FeedbackSort = (typeof FeedbackSort)[keyof typeof FeedbackSort];

export class GetFeedbacksDto {
    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number)
    skip?: number;

    @IsOptional()
    @IsInt()
    @Min(2)
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
}
