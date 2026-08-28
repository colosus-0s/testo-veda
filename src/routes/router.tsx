import { createBrowserRouter } from 'react-router-dom';
import { StoreLayout } from '@/layouts/StoreLayout';
import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CollectionPage } from '@/pages/CollectionPage';
import { CartPage, CheckoutPage } from '@/pages/CartPage';
import { SearchPage, NotFoundPage } from '@/pages/SearchPage';
import { FormulaIngredientsPage } from '@/pages/FormulaIngredientsPage';
import { QualityTrustPage } from '@/pages/QualityTrustPage';
import { OurStoryPage } from '@/pages/OurStoryPage';
import { FAQPage } from '@/pages/FAQPage';

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
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
