import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Layout = () => {
  const { user, signOut } = useAuth();
  return (
    <div className="shell">
      <aside>
        <h1>Tech Forge</h1>
        <p>{user?.name}</p>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/categories">Categorias</Link>
          <Link to="/products">Produtos</Link>
          <Link to="/orders">Pedidos</Link>
          <Link to="/profile">Meu perfil</Link>
        </nav>
        <button onClick={signOut}>Sair</button>
      </aside>
      <main><Outlet /></main>
    </div>
  );
};
