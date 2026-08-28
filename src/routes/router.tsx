import { createBrowserRouter } from 'react-router-dom';
import { StoreLayout } from '@/layouts/StoreLayout';
import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CollectionPage } from '@/pages/CollectionPage';
import { CartPage } from '@/pages/CartPage';
import { SearchPage, NotFoundPage } from '@/pages/SearchPage';
import { FormulaIngredientsPage } from '@/pages/FormulaIngredientsPage';
import { QualityTrustPage } from '@/pages/QualityTrustPage';
import { OurStoryPage } from '@/pages/OurStoryPage';
import { FAQPage } from '@/pages/FAQPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { AccountPage } from '@/pages/AccountPage';
import { CheckoutPage as CustomCheckoutPage } from '@/pages/CheckoutPage';
import { OrderConfirmationPage } from '@/pages/OrderConfirmationPage';
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { ProtectedRoute, AdminRoute } from '@/components/auth/ProtectedRoute';

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
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'checkout', element: <CustomCheckoutPage /> },
      { path: 'order-confirmation/:orderId', element: <OrderConfirmationPage /> },
      {
        path: 'account',
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <AdminDashboardPage />
          </AdminRoute>
        ),
      },
      { path: 'search', element: <SearchPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
