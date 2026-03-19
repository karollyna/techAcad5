import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório.'),
  price: z.number().positive('Preço deve ser maior que zero.'),
  categoryId: z.string().min(1, 'Categoria obrigatória.')
});
