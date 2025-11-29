import { PrismaClient } from '../generated/prisma';
import { fakerRU } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
    const recordsToCreate = [];

    for (let i = 0; i < 1000; i++) {
        recordsToCreate.push({
            rating: fakerRU.number.int({ min: 1, max: 5 }),
            feedback_text: fakerRU.lorem.sentence(),
        });
    }

    await prisma.feedbacks_table.createMany({
        data: recordsToCreate,
        skipDuplicates: true,
    });
}

main()
    .catch((e: Error) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

// npx prisma db seed
