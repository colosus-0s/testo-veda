import { createBrowserRouter } from 'react-router-dom';
import { StoreLayout } from '@/layouts/StoreLayout';
import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CollectionPage } from '@/pages/CollectionPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { SearchPage, NotFoundPage } from '@/pages/SearchPage';
import { FormulaIngredientsPage } from '@/pages/FormulaIngredientsPage';
import { QualityTrustPage } from '@/pages/QualityTrustPage';
import { OurStoryPage } from '@/pages/OurStoryPage';
import { FAQPage } from '@/pages/FAQPage';

// Auth Pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/auth/ResetPasswordPage';

// Account & Protected Routes
import { AccountPage } from '@/pages/AccountPage';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminRoute } from '@/components/auth/AdminRoute';

// Admin Pages
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminOrdersPage } from '@/pages/admin/AdminOrdersPage';
import { AdminProductsPage } from '@/pages/admin/AdminProductsPage';
import { AdminCustomersPage } from '@/pages/admin/AdminCustomersPage';
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StoreLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'testo', element: <ProductDetailPage /> },
      { path: 'products/:slug', element: <ProductDetailPage /> },
      { path: 'collections/:slug', element: <CollectionPage /> },
      { path: 'formula-ingredients', element: <FormulaIngredientsPage /> },
      { path: 'ingredients', element: <FormulaIngredientsPage /> },
      { path: 'quality-trust', element: <QualityTrustPage /> },
      { path: 'our-story', element: <OurStoryPage /> },
      { path: 'faq', element: <FAQPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      {
        path: 'account',
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'orders', element: <AdminOrdersPage /> },
      { path: 'products', element: <AdminProductsPage /> },
      { path: 'customers', element: <AdminCustomersPage /> },
      { path: 'settings', element: <AdminSettingsPage /> },
    ],
  },
]);
