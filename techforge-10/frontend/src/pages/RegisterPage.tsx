import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../services/api';
import { emailRegex, isValidCpf, passwordRegex } from '../utils/validators';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', cpf: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const change = (key: string, value: string): void => setForm((old) => ({ ...old, [key]: value }));

  const validate = (): string => {
    if (!form.name || !form.email || !form.cpf || !form.password || !form.confirmPassword) return 'Preencha todos os campos.';
    if (!emailRegex.test(form.email)) return 'Digite um e-mail válido.';
    if (!isValidCpf(form.cpf)) return 'Digite um CPF válido.';
    if (!passwordRegex.test(form.password)) return 'A senha precisa ter 8 caracteres, letras e números.';
    if (form.password !== form.confirmPassword) return 'As senhas não conferem.';
    return '';
  };

  const submit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const message = validate();
    if (message) return setError(message);
    try { await api.post('/auth/signup', { name: form.name, email: form.email, cpf: form.cpf, password: form.password }); navigate('/'); } catch { setError('Não foi possível cadastrar.'); }
  };

  return <section className="auth-card"><h2>Criar conta</h2><form onSubmit={submit}><Input label="Nome" value={form.name} onChange={(e) => change('name', e.target.value)} /><Input label="E-mail" value={form.email} onChange={(e) => change('email', e.target.value)} /><Input label="CPF" value={form.cpf} onChange={(e) => change('cpf', e.target.value)} /><Input label="Senha" type="password" value={form.password} onChange={(e) => change('password', e.target.value)} /><Input label="Confirmar senha" type="password" value={form.confirmPassword} onChange={(e) => change('confirmPassword', e.target.value)} error={error} /><Button type="submit">Cadastrar</Button></form><Link to="/">Voltar</Link></section>;
};
