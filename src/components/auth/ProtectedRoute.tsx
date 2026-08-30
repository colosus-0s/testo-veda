import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading, authReady } = useAuth();
  const location = useLocation();

  if (isLoading || !authReady) {
    return (
      <div className="min-h-screen bg-[#F7F4ED] flex items-center justify-center text-[#171717]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-[#6A1423] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-700">Verifying Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
