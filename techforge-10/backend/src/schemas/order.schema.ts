import { z } from 'zod';

export const orderSchema = z.object({
  quantity: z.number().int().positive('Quantidade obrigatória.'),
  productId: z.string().min(1, 'Produto obrigatório.')
});
