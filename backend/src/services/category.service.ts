import { CategoryRepository } from '../repositories/category.repository.js';
import { AppError } from '../middlewares/error.middleware.js';
import { getPagination } from '../utils/pagination.js';

export class CategoryService {
  constructor(private categories = new CategoryRepository()) {}
  create(name: string) { return this.categories.create(name); }
  async list(page: number, limit: number) { const { skip, take } = getPagination(page, limit); return { page, total: await this.categories.count(), data: await this.categories.findAll(skip, take) }; }
  async getById(id: string) { const item = await this.categories.findById(id); if (!item) throw new AppError(404, 'Categoria não encontrada.'); return item; }
  async update(id: string, name: string) { await this.getById(id); return this.categories.update(id, name); }
  async remove(id: string) { await this.getById(id); await this.categories.delete(id); return { message: 'Categoria removida com sucesso.' }; }
}
