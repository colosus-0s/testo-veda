import { createBrowserRouter } from 'react-router-dom';
import { StoreLayout } from '@/layouts/StoreLayout';
import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CollectionPage } from '@/pages/CollectionPage';
import { CartPage, CheckoutPage } from '@/pages/CartPage';
import { SearchPage, NotFoundPage } from '@/pages/SearchPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <StoreLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'products/:slug', element: <ProductDetailPage /> },
      { path: 'collections/:slug', element: <CollectionPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
