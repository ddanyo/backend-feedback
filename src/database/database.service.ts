import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, feedbacks_table } from '../../generated/prisma';
import { FeedbacksResponse } from '../dto/feedbacks.dto';

function prepareSearchString(input: string): string {
    return input.trim().split(/\s+/).join(' & ');
}

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
        caseSensitive?: boolean;
        wholeWord?: boolean;
    }): Promise<FeedbacksResponse> {
        const { skip, take, search, sortBy, caseSensitive, wholeWord } = params;
        const where: Prisma.feedbacks_tableWhereInput = {};
        if (search) {
            if (wholeWord) {
                const searchVector = prepareSearchString(search);
                const matchingRecords = await this.prisma.$queryRaw<
                    { id: number }[]
                >`
                    SELECT id FROM "feedbacks_table" 
                    WHERE to_tsvector('simple', coalesce(feedback_text, '')) @@ to_tsquery('simple', ${searchVector})
                `;

                const ids = matchingRecords.map((r) => r.id);

                where.AND = [
                    { id: { in: ids } },
                    {
                        feedback_text: {
                            contains: search,
                            mode: caseSensitive ? undefined : 'insensitive',
                        },
                    },
                ];
            } else {
                where.feedback_text = {
                    contains: search,
                    mode: caseSensitive ? undefined : 'insensitive',
                };
            }
        }

        let orderBy: Prisma.feedbacks_tableOrderByWithRelationInput[] = [
            { date_time: 'desc' },
            { id: 'desc' },
        ];

        switch (sortBy) {
            case 'oldest':
                orderBy = [{ date_time: 'asc' }, { id: 'asc' }];
                break;
            case 'rating_high':
                orderBy = [{ rating: 'desc' }, { id: 'asc' }];
                break;
            case 'rating_low':
                orderBy = [{ rating: 'asc' }, { id: 'asc' }];
                break;
            case 'newest':
            default:
                orderBy = [{ date_time: 'desc' }, { id: 'desc' }];
                break;
        }

        const [items, total] = await this.prisma.$transaction([
            this.prisma.feedbacks_table.findMany({
                skip,
                take,
                where,
                orderBy,
            }),
            this.prisma.feedbacks_table.count({ where }),
        ]);

        const limit = take || total || 1;
        const totalPages = Math.ceil(total / limit);

        return {
            items,
            total,
            totalPages,
        };
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
