import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { api } from '../services/api';

export const CategoryFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  useEffect(() => { if (id) void api.get(`/categories/${id}`).then(({ data }) => setName(data.name)); }, [id]);
  const submit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try { id ? await api.put(`/categories/${id}`, { name }) : await api.post('/categories', { name }); navigate('/categories'); } catch { setError('Não foi possível salvar a categoria.'); }
  };
  return <section><h2>{id ? 'Editar categoria' : 'Nova categoria'}</h2><form onSubmit={submit} className="grid-form"><Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} error={error} /><Button type="submit">Salvar</Button></form></section>;
};
