import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service.js';
import { categorySchema } from '../schemas/category.schema.js';
import { ok } from '../utils/http.js';

export class CategoryController {
  constructor(private service = new CategoryService()) {}
  create = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.create(categorySchema.parse(req.body).name), 201);
  list = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.list(Number(req.query.page ?? 1), Number(req.query.limit ?? 10)));
  getById = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.getById(req.params.id));
  update = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.update(req.params.id, categorySchema.parse(req.body).name));
  remove = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.remove(req.params.id));
}
