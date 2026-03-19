import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';

const controller = new OrderController();
export const orderRoutes = Router();

orderRoutes.post('/', controller.create);
orderRoutes.get('/', controller.list);
orderRoutes.get('/:id', controller.getById);
orderRoutes.put('/:id', controller.update);
orderRoutes.delete('/:id', controller.remove);
