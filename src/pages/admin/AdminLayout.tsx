import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  PlusCircle,
  Users,
  Settings,
  LogOut,
  ArrowLeft,
  Boxes,
  Bell,
  CheckCheck,
  ChevronRight,
} from 'lucide-react';

interface OrderNotification {
  id: string;
  orderNumber: string;
  customerName: string;
  total: number;
  createdAt: string;
  read: boolean;
}

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<OrderNotification[]>([]);
  const [isBellOpen, setIsBellOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Realtime Postgres Changes Subscription for Admin
  useEffect(() => {
    if (!isAdmin) return;

    const channel = supabase
      .channel('admin-realtime-orders-feed')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          const newOrder = payload.new as Record<string, unknown>;
          if (!newOrder || !newOrder.id) return;

          const orderId = String(newOrder.id);
          const orderNum = String(newOrder.order_number || `AP-${orderId.slice(0, 6)}`);

          setNotifications((prev) => {
            if (prev.some((n) => n.id === orderId || n.orderNumber === orderNum)) {
              return prev;
            }

            const newNotif: OrderNotification = {
              id: orderId,
              orderNumber: orderNum,
              customerName: String(newOrder.customer_name || 'Guest Customer'),
              total: Number(newOrder.total || 0),
              createdAt: String(newOrder.created_at || new Date().toISOString()),
              read: false,
            };

            return [newNotif, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin]);

  // Click outside bell popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setIsBellOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notif: OrderNotification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    setIsBellOpen(false);
    navigate('/admin/orders');
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Add Product', href: '/admin/products/new', icon: PlusCircle },
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
              {/* Admin Realtime Order Notification Bell */}
              <div className="relative" ref={bellRef}>
                <button
                  onClick={() => setIsBellOpen(!isBellOpen)}
                  className="relative p-2 text-white hover:text-[#F3E5AB] transition-colors focus:outline-none flex items-center"
                  aria-label="Order Notifications"
                  aria-expanded={isBellOpen}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-sm animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Card */}
                {isBellOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-[#FCFBF8] border border-[#EBE7DF] rounded-2xl shadow-xl z-50 overflow-hidden text-[#171717]">
                    <div className="p-3 bg-[#F7F4ED] border-b border-[#EBE7DF] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-[#6A1423]" />
                        <span className="font-serif font-bold text-xs">New Order Alerts</span>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-[10px] font-bold text-[#6A1423] hover:underline flex items-center gap-1"
                        >
                          <CheckCheck size={12} /> Mark Read
                        </button>
                      )}
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-[#EBE7DF]">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-500">
                          No new order notifications yet. Live realtime updates will stream automatically.
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <button
                            key={n.id}
                            onClick={() => handleNotificationClick(n)}
                            className={`w-full p-3 text-left hover:bg-[#F7F4ED] transition-colors flex items-start justify-between gap-3 ${
                              !n.read ? 'bg-amber-50/70 font-semibold' : ''
                            }`}
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-[#6A1423]">
                                  #{n.orderNumber}
                                </span>
                                {!n.read && (
                                  <span className="bg-red-500 w-2 h-2 rounded-full inline-block" />
                                )}
                              </div>
                              <p className="text-xs text-slate-700">{n.customerName}</p>
                              <p className="text-[11px] text-slate-500">
                                {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-xs text-emerald-800">
                                ₹{n.total.toLocaleString('en-IN')}
                              </span>
                              <ChevronRight size={14} className="text-slate-400 ml-auto mt-1" />
                            </div>
                          </button>
                        ))
                      )}
                    </div>

                    <div className="p-2.5 bg-[#F7F4ED] border-t border-[#EBE7DF] text-center">
                      <Link
                        to="/admin/orders"
                        onClick={() => setIsBellOpen(false)}
                        className="text-xs font-bold text-[#6A1423] hover:underline"
                      >
                        View All Orders in Admin Panel →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <span>{user?.email || ''}</span>
              <button onClick={logout} className="p-1.5 hover:text-white text-slate-300 flex items-center gap-1" title="Sign Out">
                <LogOut size={16} />
                <span className="hidden sm:inline">Sign Out</span>
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
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 px-3 block mb-1">
                Admin Navigation
              </span>
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
              <div className="pt-2 border-t border-[#EBE7DF]">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-red-700 hover:bg-red-50 transition-all text-left"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
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
