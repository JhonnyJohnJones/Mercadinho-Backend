import { PrismaClient } from '@prisma/client';

export async function runInTransaction(
  prisma: PrismaClient,
  callback: () => Promise<void>,
) {
  await prisma.$transaction(async () => {
    await callback();
  });
}
