import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from '../components/Pagination';
import { Table } from '../components/Table';
import { api } from '../services/api';
import { ApiList, Order } from '../types/global';

export const OrdersPage = () => {
  const [items, setItems] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const load = async (nextPage = page): Promise<void> => { const { data } = await api.get<ApiList<Order>>(`/orders?page=${nextPage}&limit=10`); setItems(data.data); setTotal(data.total); setPage(nextPage); };
  useEffect(() => { void load(1); }, []);
  const remove = async (id: string): Promise<void> => { await api.delete(`/orders/${id}`); await load(page); };
  return <section><div className="page-title"><h2>Pedidos</h2><Link to="/orders/new">Novo pedido</Link></div><Table headers={['Produto', 'Quantidade', 'Ações']} rows={items.map((item) => <tr key={item.id}><td>{item.product?.name}</td><td>{item.quantity}</td><td className="actions"><Link to={`/orders/${item.id}`}>Editar</Link><button onClick={() => void remove(item.id)}>Excluir</button></td></tr>)} /><Pagination page={page} total={total} onChange={(next) => void load(next)} /></section>;
};
