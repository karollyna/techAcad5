import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller.js';

const controller = new CategoryController();
export const categoryRoutes = Router();

categoryRoutes.post('/', controller.create);
categoryRoutes.get('/', controller.list);
categoryRoutes.get('/:id', controller.getById);
categoryRoutes.put('/:id', controller.update);
categoryRoutes.delete('/:id', controller.remove);
