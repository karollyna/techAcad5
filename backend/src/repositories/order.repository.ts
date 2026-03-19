import { prisma } from '../config/prisma.js';

export class OrderRepository {
  create(data: { quantity: number; productId: string; userId: string }) { return prisma.order.create({ data, include: { product: true, user: true } }); }
  findAll(skip: number, take: number) { return prisma.order.findMany({ skip, take, include: { product: true, user: true }, orderBy: { createdAt: 'desc' } }); }
  count() { return prisma.order.count(); }
  findById(id: string) { return prisma.order.findUnique({ where: { id }, include: { product: true, user: true } }); }
  update(id: string, data: { quantity: number; productId: string }) { return prisma.order.update({ where: { id }, data, include: { product: true, user: true } }); }
  delete(id: string) { return prisma.order.delete({ where: { id } }); }
}
