import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from '../components/Pagination';
import { Table } from '../components/Table';
import { api } from '../services/api';
import { ApiList, Category } from '../types/global';

export const CategoriesPage = () => {
  const [items, setItems] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const load = async (nextPage = page): Promise<void> => { const { data } = await api.get<ApiList<Category>>(`/categories?page=${nextPage}&limit=10`); setItems(data.data); setTotal(data.total); setPage(nextPage); };
  useEffect(() => { void load(1); }, []);
  const remove = async (id: string): Promise<void> => { await api.delete(`/categories/${id}`); await load(page); };
  return <section><div className="page-title"><h2>Categorias</h2><Link to="/categories/new">Nova categoria</Link></div><Table headers={['Nome', 'Ações']} rows={items.map((item) => <tr key={item.id}><td>{item.name}</td><td className="actions"><Link to={`/categories/${item.id}`}>Editar</Link><button onClick={() => void remove(item.id)}>Excluir</button></td></tr>)} /><Pagination page={page} total={total} onChange={(next) => void load(next)} /></section>;
};
