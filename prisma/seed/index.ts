import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const environment = process.env.NODE_ENV ?? 'development';

  console.log(`🌱 Running seeds for: ${environment}`);

  switch (environment) {
    case 'development':
      await import('./modules/development').then((module) =>
        module.developmentSeed(prisma),
      );
      break;

    case 'staging':
      await import('./modules/staging').then((module) =>
        module.stagingSeed(prisma),
      );
      break;

    case 'production':
      await import('./modules/production').then((module) =>
        module.productionSeed(prisma),
      );
      break;

    default:
      throw new Error(`Unknown environment: ${environment}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();

    console.log('✅ Seed completed');
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });
