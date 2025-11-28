import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, feedbacks_table } from '../../generated/prisma';

@Injectable()
export class DatabaseService {
    constructor(private prisma: PrismaService) {}

    async createFeedback(
        data: Prisma.feedbacks_tableCreateInput,
    ): Promise<feedbacks_table> {
        return this.prisma.feedbacks_table.create({
            data,
        });
    }

    async readFeedbacks(params: {
        skip?: number;
        take?: number;
        search?: string;
        sortBy?: string;
    }): Promise<feedbacks_table[]> {
        const { skip, take, search, sortBy } = params;
        const where: Prisma.feedbacks_tableWhereInput = {};
        if (search) {
            where.feedback_text = { contains: search, mode: 'insensitive' };
        }

        let orderBy: Prisma.feedbacks_tableOrderByWithRelationInput = {
            date_time: 'desc',
        };

        switch (sortBy) {
            case 'oldest':
                orderBy = { date_time: 'asc' };
                break;
            case 'rating_high':
                orderBy = { rating: 'desc' };
                break;
            case 'rating_low':
                orderBy = { rating: 'asc' };
                break;
            case 'newest':
            default:
                orderBy = { date_time: 'desc' };
                break;
        }

        return this.prisma.feedbacks_table.findMany({
            skip,
            take,
            where,
            orderBy,
        });
    }

    async updateFeedback(params: {
        where: Prisma.feedbacks_tableWhereUniqueInput;
        data: Prisma.feedbacks_tableUpdateInput;
    }): Promise<feedbacks_table> {
        const { where, data } = params;
        return this.prisma.feedbacks_table.update({
            data,
            where,
        });
    }

    async deleteFeedback(
        where: Prisma.feedbacks_tableWhereUniqueInput,
    ): Promise<feedbacks_table> {
        return this.prisma.feedbacks_table.delete({
            where,
        });
    }
}
