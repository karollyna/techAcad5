import { Request, Response } from 'express';
import { OrderService } from '../services/order.service.js';
import { orderSchema } from '../schemas/order.schema.js';
import { ok } from '../utils/http.js';

export class OrderController {
  constructor(private service = new OrderService()) {}
  create = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.create({ ...orderSchema.parse(req.body), userId: req.user!.id }), 201);
  list = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.list(Number(req.query.page ?? 1), Number(req.query.limit ?? 10)));
  getById = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.getById(req.params.id));
  update = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.update(req.params.id, orderSchema.parse(req.body)));
  remove = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.remove(req.params.id));
}
