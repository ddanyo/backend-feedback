import { PrismaClient } from './generated/prisma/';

const prisma = new PrismaClient();

async function main() {
  const allFeedbacks = await prisma.feedbacks_table.findMany();
  console.log(allFeedbacks);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
