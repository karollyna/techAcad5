import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { UserRepository } from '../repositories/user.repository.js';
import { AppError } from '../middlewares/error.middleware.js';

export class AuthService {
  constructor(private users = new UserRepository()) {}
  async signUp(data: { name: string; email: string; password: string; cpf: string }) {
    if (await this.users.findByEmail(data.email)) throw new AppError(409, 'E-mail já cadastrado.');
    const password = await bcrypt.hash(data.password, 10);
    const user = await this.users.create({ ...data, password });
    return { id: user.id, name: user.name, email: user.email, cpf: user.cpf, role: user.role };
  }
  async signIn(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) throw new AppError(401, 'E-mail ou senha inválidos.');
    const token = jwt.sign({ email: user.email }, env.jwtSecret, { subject: user.id, expiresIn: '1d' });
    return { token, user: { id: user.id, name: user.name, email: user.email, cpf: user.cpf, role: user.role } };
  }
  async updateUser(userId: string, data: { name: string; password: string; cpf: string }) {
    if (!(await this.users.findById(userId))) throw new AppError(404, 'Usuário não encontrado.');
    const password = await bcrypt.hash(data.password, 10);
    const user = await this.users.update(userId, { ...data, password });
    return { id: user.id, name: user.name, email: user.email, cpf: user.cpf, role: user.role };
  }
}
