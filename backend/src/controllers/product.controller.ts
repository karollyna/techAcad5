import { Request, Response } from 'express';
import { ProductService } from '../services/product.service.js';
import { productSchema } from '../schemas/product.schema.js';
import { ok } from '../utils/http.js';

export class ProductController {
  constructor(private service = new ProductService()) {}
  create = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.create({ ...productSchema.parse(req.body), ownerId: req.user!.id }), 201);
  list = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.list(Number(req.query.page ?? 1), Number(req.query.limit ?? 10)));
  getById = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.getById(req.params.id));
  update = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.update(req.params.id, productSchema.parse(req.body)));
  remove = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.remove(req.params.id));
}
