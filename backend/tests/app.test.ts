import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app.js';
import { prisma } from '../src/config/prisma.js';

const userData = { name: 'Maria', email: 'maria@email.com', password: 'Senha123', cpf: '52998224725' };

const createUserAndToken = async (): Promise<string> => {
  await request(app).post('/auth/signup').send(userData);
  const login = await request(app).post('/auth/signin').send({ email: userData.email, password: userData.password });
  return login.body.token as string;
};

describe('API Tech Forge', () => {
  it('deve cadastrar usuário e criptografar senha', async () => {
    const response = await request(app).post('/auth/signup').send(userData);
    const dbUser = await prisma.user.findUnique({ where: { email: userData.email } });
    expect(response.status).toBe(201);
    expect(dbUser?.password).not.toBe(userData.password);
  });

  it('deve fazer login com usuário existente e retornar JWT', async () => {
    await request(app).post('/auth/signup').send(userData);
    const response = await request(app).post('/auth/signin').send({ email: userData.email, password: userData.password });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  it('deve impedir edição de email e atualizar apenas o próprio usuário', async () => {
    const token = await createUserAndToken();
    const response = await request(app)
      .put('/auth/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Maria Silva', password: 'NovaSenha123', confirmPassword: 'NovaSenha123', cpf: '52998224725', email: 'x@y.com' });
    expect(response.status).toBe(200);
    expect(response.body.email).toBe(userData.email);
  });

  it('deve executar os 3 CRUDs autenticados com paginação e relacionamento', async () => {
    const token = await createUserAndToken();
    const category = await request(app).post('/categories').set('Authorization', `Bearer ${token}`).send({ name: 'Informática' });
    const product = await request(app).post('/products').set('Authorization', `Bearer ${token}`).send({ name: 'Mouse', price: 99.9, categoryId: category.body.id });
    const order = await request(app).post('/orders').set('Authorization', `Bearer ${token}`).send({ quantity: 3, productId: product.body.id });
    const list = await request(app).get('/products?page=1&limit=10').set('Authorization', `Bearer ${token}`);
    const update = await request(app).put(`/orders/${order.body.id}`).set('Authorization', `Bearer ${token}`).send({ quantity: 5, productId: product.body.id });
    const remove = await request(app).delete(`/categories/${category.body.id}`).set('Authorization', `Bearer ${token}`);
    expect(category.status).toBe(201);
    expect(product.body.category.id).toBe(category.body.id);
    expect(order.body.product.id).toBe(product.body.id);
    expect(list.body.page).toBe(1);
    expect(update.body.quantity).toBe(5);
    expect(remove.status).toBe(200);
  });

  it('deve retornar 404 ao editar ou deletar recurso inexistente', async () => {
    const token = await createUserAndToken();
    const response = await request(app).delete('/products/id-inexistente').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
});
