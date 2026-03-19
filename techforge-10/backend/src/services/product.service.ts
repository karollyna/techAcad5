import { CategoryRepository } from '../repositories/category.repository.js';
import { ProductRepository } from '../repositories/product.repository.js';
import { AppError } from '../middlewares/error.middleware.js';
import { getPagination } from '../utils/pagination.js';

export class ProductService {
  constructor(private products = new ProductRepository(), private categories = new CategoryRepository()) {}
  async create(data: { name: string; price: number; categoryId: string; ownerId: string }) { if (!(await this.categories.findById(data.categoryId))) throw new AppError(404, 'Categoria não encontrada.'); return this.products.create(data); }
  async list(page: number, limit: number) { const { skip, take } = getPagination(page, limit); return { page, total: await this.products.count(), data: await this.products.findAll(skip, take) }; }
  async getById(id: string) { const item = await this.products.findById(id); if (!item) throw new AppError(404, 'Produto não encontrado.'); return item; }
  async update(id: string, data: { name: string; price: number; categoryId: string }) { await this.getById(id); if (!(await this.categories.findById(data.categoryId))) throw new AppError(404, 'Categoria não encontrada.'); return this.products.update(id, data); }
  async remove(id: string) { await this.getById(id); await this.products.delete(id); return { message: 'Produto removido com sucesso.' }; }
}
