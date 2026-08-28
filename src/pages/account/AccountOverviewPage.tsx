import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { getStoredOrders } from '@/services/orderService';
import type { Order } from '@/types/order';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Package, MapPin, Heart, ShoppingBag, ArrowRight, ChevronRight, ShieldCheck } from 'lucide-react';

export const AccountOverviewPage: React.FC = () => {
  const { user, addresses, wishlistProductIds } = useAuth();
  const { cartSummary } = useCart();
  const orders: Order[] = getStoredOrders();

  const summaryTiles = [
    {
      title: 'Orders',
      count: orders.length,
      label: `${orders.length} Order${orders.length === 1 ? '' : 's'} Placed`,
      icon: Package,
      href: '/account/orders',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      title: 'Saved Addresses',
      count: addresses.length,
      label: `${addresses.length} Saved Location${addresses.length === 1 ? '' : 's'}`,
      icon: MapPin,
      href: '/account/addresses',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      title: 'Wishlist',
      count: wishlistProductIds.length,
      label: `${wishlistProductIds.length} Saved Formulation${wishlistProductIds.length === 1 ? '' : 's'}`,
      icon: Heart,
      href: '/account/wishlist',
      color: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      title: 'Cart',
      count: cartSummary.itemCount,
      label: `₹${cartSummary.total.toLocaleString('en-IN')} Total`,
      icon: ShoppingBag,
      href: '/cart',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  const recentOrder = orders[0];

  return (
    <div className="space-y-8 text-left">
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#6A1423] block mb-1">
          Account Overview
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717]">
          Hello, {user?.fullName || 'Customer'}
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Manage your dietary formulation orders, saved delivery addresses, and account security.
        </p>
      </div>

      {/* Visual Summary Cards/Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryTiles.map((tile) => {
          const Icon = tile.icon;
          return (
            <Link
              key={tile.title}
              to={tile.href}
              className="bg-[#F7F4ED] p-5 rounded-2xl border border-[#EBE7DF] hover:border-[#6A1423]/40 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#171717] font-serif">{tile.title}</span>
                <div className={`p-2 rounded-xl border ${tile.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <p className="font-serif font-extrabold text-2xl text-[#171717] mb-1">{tile.count}</p>
              <span className="text-[11px] text-slate-500 font-semibold flex items-center justify-between group-hover:text-[#6A1423]">
                {tile.label} <ChevronRight size={12} />
              </span>
            </Link>
          );
        })}
      </div>

      {/* Recent Orders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#EBE7DF] pb-3">
          <h3 className="font-serif text-xl font-bold text-[#171717]">Recent Order</h3>
          {orders.length > 0 && (
            <Link to="/account/orders" className="text-xs font-bold text-[#6A1423] hover:underline flex items-center gap-1">
              View All Orders ({orders.length}) <ChevronRight size={14} />
            </Link>
          )}
        </div>

        {recentOrder ? (
          <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EBE7DF] pb-3">
              <div>
                <span className="font-serif font-black text-base text-[#6A1423]">
                  Order #{recentOrder.orderNumber}
                </span>
                <span className="text-xs text-slate-500 block">
                  Placed on {new Date(recentOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="maroon">{recentOrder.orderStatus.toUpperCase()}</Badge>
                <Badge variant="green">{recentOrder.paymentStatus.toUpperCase()}</Badge>
              </div>
            </div>

            <div className="space-y-3">
              {recentOrder.items.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-12 h-12 object-contain bg-white rounded-xl p-1 border border-[#EBE7DF]"
                    />
                    <div>
                      <span className="font-bold text-[#171717] block">{item.productName}</span>
                      <span className="text-slate-500 font-semibold">{item.packSize} • Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#171717]">₹{item.subtotal.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[#EBE7DF]">
              <span className="font-serif font-extrabold text-lg text-[#171717]">
                Total: <span className="text-[#6A1423]">₹{recentOrder.total.toLocaleString('en-IN')}</span>
              </span>
              <Link to={`/account/orders/${recentOrder.id}`}>
                <Button variant="primary" size="sm" rightIcon={<ArrowRight size={14} />}>
                  View Order Details
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="py-14 bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF] text-center space-y-4">
            <Package className="w-12 h-12 text-slate-400 mx-auto" />
            <h4 className="font-serif text-xl font-bold text-[#171717]">No Orders Yet</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              You haven't placed any botanical orders yet. Explore our core formulation and begin your wellness journey.
            </p>
            <Link to="/testo" className="inline-block pt-2">
              <Button variant="primary" size="md" rightIcon={<ArrowRight size={16} />}>
                Explore TESTO Power+
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Account Info Box */}
      <div className="bg-[#F7F4ED] p-6 rounded-2xl border border-[#EBE7DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-bold text-[#171717] block mb-1">Registered Account Email</span>
          <p className="text-slate-700">{user?.email}</p>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
          <ShieldCheck size={18} /> Verified Account Profile
        </div>
      </div>
    </div>
  );
};
