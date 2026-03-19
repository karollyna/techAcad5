import { prisma } from '../config/prisma.js';

export class ProductRepository {
  create(data: { name: string; price: number; categoryId: string; ownerId: string }) { return prisma.product.create({ data, include: { category: true } }); }
  findAll(skip: number, take: number) { return prisma.product.findMany({ skip, take, include: { category: true }, orderBy: { createdAt: 'desc' } }); }
  count() { return prisma.product.count(); }
  findById(id: string) { return prisma.product.findUnique({ where: { id }, include: { category: true } }); }
  update(id: string, data: { name: string; price: number; categoryId: string }) { return prisma.product.update({ where: { id }, data, include: { category: true } }); }
  delete(id: string) { return prisma.product.delete({ where: { id } }); }
}
