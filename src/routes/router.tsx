import { createBrowserRouter, Navigate } from 'react-router-dom';
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

// Customer Account Shell & Sub-Pages
import { AccountLayout } from '@/pages/account/AccountLayout';
import { AccountOverviewPage } from '@/pages/account/AccountOverviewPage';
import { AccountOrdersPage } from '@/pages/account/AccountOrdersPage';
import { AccountOrderDetailPage } from '@/pages/account/AccountOrderDetailPage';
import { AccountAddressesPage } from '@/pages/account/AccountAddressesPage';
import { AccountProfilePage } from '@/pages/account/AccountProfilePage';
import { AccountSecurityPage } from '@/pages/account/AccountSecurityPage';
import { AccountWishlistPage } from '@/pages/account/AccountWishlistPage';

// Protection Guards
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminRoute } from '@/components/auth/AdminRoute';

// Admin Pages
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminLayout } from '@/pages/admin/AdminLayout';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminOrdersPage } from '@/pages/admin/AdminOrdersPage';
import { AdminOrderDetailPage } from '@/pages/admin/AdminOrderDetailPage';
import { AdminProductsPage } from '@/pages/admin/AdminProductsPage';
import { AdminInventoryPage } from '@/pages/admin/AdminInventoryPage';
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
      { path: 'order-confirmation/:orderId', element: <CheckoutPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      {
        path: 'account',
        element: (
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AccountOverviewPage /> },
          { path: 'orders', element: <AccountOrdersPage /> },
          { path: 'orders/:orderId', element: <AccountOrderDetailPage /> },
          { path: 'addresses', element: <AccountAddressesPage /> },
          { path: 'profile', element: <AccountProfilePage /> },
          { path: 'security', element: <AccountSecurityPage /> },
          { path: 'wishlist', element: <AccountWishlistPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
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
      { path: 'orders/:orderId', element: <AdminOrderDetailPage /> },
      { path: 'products', element: <AdminProductsPage /> },
      { path: 'inventory', element: <AdminInventoryPage /> },
      { path: 'customers', element: <AdminCustomersPage /> },
      { path: 'settings', element: <AdminSettingsPage /> },
      { path: '*', element: <Navigate to="/admin" replace /> },
    ],
  },
]);
