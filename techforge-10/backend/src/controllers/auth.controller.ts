import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { signInSchema, signUpSchema, updateUserSchema } from '../schemas/auth.schema.js';
import { ok } from '../utils/http.js';

export class AuthController {
  constructor(private service = new AuthService()) {}
  signUp = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.signUp(signUpSchema.parse(req.body)), 201);
  signIn = async (req: Request, res: Response): Promise<Response> => ok(res, await this.service.signIn(...Object.values(signInSchema.parse(req.body)) as [string, string]));
  updateUser = async (req: Request, res: Response): Promise<Response> => { const { name, password, cpf } = updateUserSchema.parse(req.body); return ok(res, await this.service.updateUser(req.user!.id, { name, password, cpf })); };
}
