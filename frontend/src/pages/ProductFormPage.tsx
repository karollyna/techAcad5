import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { api } from '../services/api';
import { ApiList, Category } from '../types/global';

export const ProductFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ name: '', price: '', categoryId: '' });
  const [error, setError] = useState('');
  const change = (key: string, value: string): void => setForm((old) => ({ ...old, [key]: value }));
  useEffect(() => {
    void api.get<ApiList<Category>>('/categories?page=1&limit=50').then(({ data }) => setCategories(data.data));
    if (id) void api.get(`/products/${id}`).then(({ data }) => setForm({ name: data.name, price: String(data.price), categoryId: data.categoryId }));
  }, [id]);
  const submit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try { const payload = { name: form.name, price: Number(form.price), categoryId: form.categoryId }; id ? await api.put(`/products/${id}`, payload) : await api.post('/products', payload); navigate('/products'); } catch { setError('Não foi possível salvar o produto.'); }
  };
  return <section><h2>{id ? 'Editar produto' : 'Novo produto'}</h2><form onSubmit={submit} className="grid-form"><Input label="Nome" value={form.name} onChange={(e) => change('name', e.target.value)} /><Input label="Preço" type="number" value={form.price} onChange={(e) => change('price', e.target.value)} error={error} /><label className="field"><span>Categoria</span><select value={form.categoryId} onChange={(e) => change('categoryId', e.target.value)}><option value="">Selecione</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><Button type="submit">Salvar</Button></form></section>;
};
