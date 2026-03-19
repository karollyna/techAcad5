import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const password = await bcrypt.hash('Senha123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'aluno@techforge.com' },
    update: {},
    create: { name: 'Aluno Tech Forge', email: 'aluno@techforge.com', password, cpf: '52998224725' }
  });

  const category = await prisma.category.create({ data: { name: 'Eletrônicos' } });
  const product = await prisma.product.create({
    data: { name: 'Notebook', price: 3500, categoryId: category.id, ownerId: user.id }
  });

  await prisma.order.create({ data: { quantity: 2, userId: user.id, productId: product.id } });
}

main().finally(() => prisma.$disconnect());
