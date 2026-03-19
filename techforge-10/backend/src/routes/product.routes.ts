import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';

const controller = new ProductController();
export const productRoutes = Router();

productRoutes.post('/', controller.create);
productRoutes.get('/', controller.list);
productRoutes.get('/:id', controller.getById);
productRoutes.put('/:id', controller.update);
productRoutes.delete('/:id', controller.remove);
