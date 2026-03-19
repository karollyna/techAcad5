import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProtectedRoute } from './pages/ProtectedRoute';
import { ProfilePage } from './pages/ProfilePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductsPage } from './pages/ProductsPage';
import { OrdersPage } from './pages/OrdersPage';
import { CategoryFormPage } from './pages/CategoryFormPage';
import { ProductFormPage } from './pages/ProductFormPage';
import { OrderFormPage } from './pages/OrderFormPage';

export const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/new" element={<CategoryFormPage />} />
          <Route path="categories/:id" element={<CategoryFormPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/new" element={<ProductFormPage />} />
          <Route path="products/:id" element={<ProductFormPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/new" element={<OrderFormPage />} />
          <Route path="orders/:id" element={<OrderFormPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
