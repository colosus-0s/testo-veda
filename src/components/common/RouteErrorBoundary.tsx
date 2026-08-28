import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export const RouteErrorBoundary: React.FC = () => {
  const error = useRouteError() as { statusText?: string; message?: string; stack?: string };
  console.error('Route Render Error caught by RouteErrorBoundary:', error);

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen flex items-center justify-center py-20 px-4">
      <div className="bg-[#FCFBF8] border border-[#EBE7DF] rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
          <AlertTriangle size={24} />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#171717]">Page Encountered an Error</h2>
        <p className="text-xs text-slate-600 bg-red-50 p-3 rounded-xl border border-red-200 text-left font-mono break-all">
          {error?.message || error?.statusText || 'An unexpected rendering error occurred.'}
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="md" leftIcon={<ArrowLeft size={16} />}>
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
