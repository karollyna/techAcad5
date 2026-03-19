import { prisma } from '../config/prisma.js';

export class UserRepository {
  findByEmail(email: string) { return prisma.user.findUnique({ where: { email } }); }
  findById(id: string) { return prisma.user.findUnique({ where: { id } }); }
  create(data: { name: string; email: string; password: string; cpf: string }) { return prisma.user.create({ data }); }
  update(id: string, data: { name: string; password: string; cpf: string }) { return prisma.user.update({ where: { id }, data }); }
}
