import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from './error.middleware.js';
import { JwtPayload } from '../types/global.js';

export const authMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new AppError(401, 'Token não informado.');
  const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
  req.user = { id: payload.sub, email: payload.email };
  next();
};
