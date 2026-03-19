import { beforeEach } from 'vitest';
import { prisma } from '../src/config/prisma.js';

beforeEach(async () => {
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
});
