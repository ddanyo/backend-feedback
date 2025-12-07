import { IsInt, IsString } from 'class-validator';

export class CreateDatabaseDto {
    @IsInt()
    rating: number;
    @IsString()
    feedback_text?: string;
}
