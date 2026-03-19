import { FormEvent, useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { isValidCpf, passwordRegex } from '../utils/validators';

export const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name ?? '', cpf: user?.cpf ?? '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const change = (key: string, value: string): void => setForm((old) => ({ ...old, [key]: value }));

  const submit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!isValidCpf(form.cpf)) return setMessage('CPF inválido.');
    if (!passwordRegex.test(form.password)) return setMessage('Senha fora do padrão.');
    if (form.password !== form.confirmPassword) return setMessage('As senhas não conferem.');
    try { await updateUser(form); setMessage('Perfil atualizado com sucesso.'); } catch { setMessage('Não foi possível atualizar o perfil.'); }
  };

  return <section><h2>Meu perfil</h2><p>E-mail fixo: {user?.email}</p><form onSubmit={submit} className="grid-form"><Input label="Nome" value={form.name} onChange={(e) => change('name', e.target.value)} /><Input label="CPF" value={form.cpf} onChange={(e) => change('cpf', e.target.value)} /><Input label="Nova senha" type="password" value={form.password} onChange={(e) => change('password', e.target.value)} /><Input label="Confirmar senha" type="password" value={form.confirmPassword} onChange={(e) => change('confirmPassword', e.target.value)} error={message} /><Button type="submit">Salvar</Button></form></section>;
};
