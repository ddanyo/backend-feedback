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
    cursor?: Prisma.feedbacks_tableWhereUniqueInput;
    where?: Prisma.feedbacks_tableWhereInput;
    orderBy?: Prisma.feedbacks_tableOrderByWithRelationInput;
  }): Promise<feedbacks_table[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.feedbacks_table.findMany({
      skip,
      take,
      cursor,
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
