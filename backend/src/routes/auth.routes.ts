import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const controller = new AuthController();
export const authRoutes = Router();

authRoutes.post('/signup', controller.signUp);
authRoutes.post('/signin', controller.signIn);
authRoutes.put('/users/me', authMiddleware, controller.updateUser);
