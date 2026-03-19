import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/auth.routes.js';
import { categoryRoutes } from './routes/category.routes.js';
import { productRoutes } from './routes/product.routes.js';
import { orderRoutes } from './routes/order.routes.js';
import { authMiddleware } from './middlewares/auth.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

export const app = express();

app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => res.json({ message: 'API online' }));
app.use('/auth', authRoutes);
app.use('/categories', authMiddleware, categoryRoutes);
app.use('/products', authMiddleware, productRoutes);
app.use('/orders', authMiddleware, orderRoutes);
app.use(errorMiddleware);
