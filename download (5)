import { FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { emailRegex } from '../utils/validators';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!emailRegex.test(email)) return setError('Digite um e-mail válido.');
    try { await signIn(email, password); navigate('/dashboard'); } catch (err) { setError('Não foi possível entrar. Confira seus dados.'); }
  };

  return <section className="auth-card"><h2>Entrar</h2><form onSubmit={handleSubmit}><Input label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} /><Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={error} /><Button type="submit">Entrar</Button></form><Link to="/register">Criar conta</Link></section>;
};
