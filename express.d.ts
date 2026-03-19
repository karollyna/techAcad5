import { z } from 'zod';
import { isValidCpf } from '../utils/cpf.js';
import { emailRegex, passwordRegex } from '../utils/regex.js';

const cpfField = z.string().refine(isValidCpf, 'CPF inválido.');
const emailField = z.string().regex(emailRegex, 'E-mail inválido.');
const passwordField = z.string().regex(passwordRegex, 'A senha deve ter 8 caracteres, letras e números.');

export const signInSchema = z.object({ email: emailField, password: z.string().min(1, 'Senha obrigatória.') });
export const signUpSchema = z.object({ name: z.string().min(1, 'Nome obrigatório.'), email: emailField, password: passwordField, cpf: cpfField });
export const updateUserSchema = z.object({ name: z.string().min(1), password: passwordField, confirmPassword: z.string().min(1), cpf: cpfField }).refine((data) => data.password === data.confirmPassword, { message: 'As senhas não conferem.', path: ['confirmPassword'] });
