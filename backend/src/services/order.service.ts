import { OrderRepository } from '../repositories/order.repository.js';
import { ProductRepository } from '../repositories/product.repository.js';
import { UserRepository } from '../repositories/user.repository.js';
import { AppError } from '../middlewares/error.middleware.js';
import { getPagination } from '../utils/pagination.js';

export class OrderService {
  constructor(private orders = new OrderRepository(), private products = new ProductRepository(), private users = new UserRepository()) {}
  async create(data: { quantity: number; productId: string; userId: string }) { if (!(await this.users.findById(data.userId))) throw new AppError(404, 'Usuário não encontrado.'); if (!(await this.products.findById(data.productId))) throw new AppError(404, 'Produto não encontrado.'); return this.orders.create(data); }
  async list(page: number, limit: number) { const { skip, take } = getPagination(page, limit); return { page, total: await this.orders.count(), data: await this.orders.findAll(skip, take) }; }
  async getById(id: string) { const item = await this.orders.findById(id); if (!item) throw new AppError(404, 'Pedido não encontrado.'); return item; }
  async update(id: string, data: { quantity: number; productId: string }) { await this.getById(id); if (!(await this.products.findById(data.productId))) throw new AppError(404, 'Produto não encontrado.'); return this.orders.update(id, data); }
  async remove(id: string) { await this.getById(id); await this.orders.delete(id); return { message: 'Pedido removido com sucesso.' }; }
}
