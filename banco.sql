import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const password = await bcrypt.hash('Admin123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@techforge.com' },
    update: { name: 'Administrador Tech Forge', cpf: '52998224725', role: 'ADMIN', password },
    create: {
      name: 'Administrador Tech Forge',
      email: 'admin@techforge.com',
      password,
      cpf: '52998224725',
      role: 'ADMIN'
    }
  });

  const category = await prisma.category.upsert({
    where: { id: 'categoria-eletronicos-techforge' },
    update: { name: 'Eletrônicos' },
    create: { id: 'categoria-eletronicos-techforge', name: 'Eletrônicos' }
  });

  const product = await prisma.product.upsert({
    where: { id: 'produto-notebook-techforge' },
    update: { name: 'Notebook', price: 3500, categoryId: category.id, ownerId: user.id },
    create: {
      id: 'produto-notebook-techforge',
      name: 'Notebook',
      price: 3500,
      categoryId: category.id,
      ownerId: user.id
    }
  });

  await prisma.order.upsert({
    where: { id: 'pedido-demo-techforge' },
    update: { quantity: 2, userId: user.id, productId: product.id },
    create: { id: 'pedido-demo-techforge', quantity: 2, userId: user.id, productId: product.id }
  });
}

main().finally(() => prisma.$disconnect());
