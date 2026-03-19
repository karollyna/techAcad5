import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { api } from '../services/api';
import { ApiList, Product } from '../types/global';

export const OrderFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ quantity: '1', productId: '' });
  const [error, setError] = useState('');
  const change = (key: string, value: string): void => setForm((old) => ({ ...old, [key]: value }));
  useEffect(() => {
    void api.get<ApiList<Product>>('/products?page=1&limit=50').then(({ data }) => setProducts(data.data));
    if (id) void api.get(`/orders/${id}`).then(({ data }) => setForm({ quantity: String(data.quantity), productId: data.productId }));
  }, [id]);
  const submit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    try { const payload = { quantity: Number(form.quantity), productId: form.productId }; id ? await api.put(`/orders/${id}`, payload) : await api.post('/orders', payload); navigate('/orders'); } catch { setError('Não foi possível salvar o pedido.'); }
  };
  return <section><h2>{id ? 'Editar pedido' : 'Novo pedido'}</h2><form onSubmit={submit} className="grid-form"><label className="field"><span>Produto</span><select value={form.productId} onChange={(e) => change('productId', e.target.value)}><option value="">Selecione</option>{products.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label className="field"><span>Quantidade</span><input type="number" value={form.quantity} onChange={(e) => change('quantity', e.target.value)} /></label><p>{error}</p><Button type="submit">Salvar</Button></form></section>;
};
