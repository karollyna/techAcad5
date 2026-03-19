import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

export const errorMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction): Response => {
  if (error instanceof ZodError) return res.status(400).json({ message: error.issues[0]?.message ?? 'Dados inválidos.' });
  if (error instanceof AppError) return res.status(error.statusCode).json({ message: error.message });
  return res.status(500).json({ message: 'Erro interno do servidor.' });
};
