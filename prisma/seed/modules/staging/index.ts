import { PrismaClient } from '@prisma/client';

export async function stagingSeed(prisma: PrismaClient) {
  console.log('🚧 Staging seed initialized');
}
