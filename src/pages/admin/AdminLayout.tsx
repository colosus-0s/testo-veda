import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { LayoutDashboard, ShoppingBag, Package, Users, Settings, LogOut, ArrowLeft, Boxes } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Inventory', href: '/admin/inventory', icon: Boxes },
    { label: 'Customers', href: '/admin/customers', icon: Users },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen">
      <Section padding="sm" background="deep-green" className="border-b border-[#2E6B4A]/50">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="text-white hover:text-[#F3E5AB] flex items-center gap-1.5 text-xs font-bold mr-4 border-r border-white/20 pr-4">
                <ArrowLeft size={16} /> Exit To Storefront
              </Link>
              <span className="font-serif font-black text-xl text-white">Arogya Path Admin Portal</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#E2E8F0] font-semibold">
              <span>{user?.email}</span>
              <button onClick={logout} className="p-1.5 hover:text-white text-slate-300" title="Sign Out">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </Container>
      </Section>

      <Section padding="lg" background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 bg-[#F7F4ED] p-4 rounded-2xl border border-[#EBE7DF] space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                      active ? 'bg-[#6A1423] text-white shadow-sm' : 'text-[#171717] hover:bg-[#FCFBF8]'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Main Admin Content Stage */}
            <div className="lg:col-span-9 bg-[#FCFBF8] p-8 rounded-3xl border border-[#EBE7DF] shadow-subtle-card min-h-[500px]">
              <Outlet />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
