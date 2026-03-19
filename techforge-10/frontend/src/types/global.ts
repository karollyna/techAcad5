export type User = { id: string; name: string; email: string; cpf: string };
export type Category = { id: string; name: string };
export type Product = { id: string; name: string; price: number; categoryId: string; category: Category };
export type Order = { id: string; quantity: number; productId: string; product: Product };
export type ApiList<T> = { page: number; total: number; data: T[] };
export type AuthResponse = { token: string; user: User };
