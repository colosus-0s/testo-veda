import React, { useState } from 'react';
import { useAuth } from '@/context/useAuth';
import { getStoredOrders } from '@/services/orderService';
import type { Order } from '@/types/order';
import type { UserAddress } from '@/types/auth';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { User, Package, MapPin, LogOut, ChevronDown, ChevronUp, ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { user, addresses, logout, addAddress } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses'>('overview');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Address Form State
  const [newFullName, setNewFullName] = useState(user?.fullName || '');
  const [newPhone, setNewPhone] = useState(user?.phone || '');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newPincode, setNewPincode] = useState('');

  const orders: Order[] = getStoredOrders();

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStreet || !newCity || !newState || !newPincode) return;

    addAddress({
      fullName: newFullName || user?.fullName || 'Customer',
      phone: newPhone || '+91 9876543210',
      street: newStreet,
      city: newCity,
      state: newState,
      pincode: newPincode,
      country: 'India',
      isDefault: addresses.length === 0,
    });

    setShowAddressForm(false);
    setNewStreet('');
    setNewCity('');
    setNewState('');
    setNewPincode('');
  };

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen">
      {/* Header Stage */}
      <Section padding="md" background="deep-green" className="border-b border-[#2E6B4A]/50">
        <Container>
          <Breadcrumb items={[{ label: 'My Account' }]} className="mb-6 text-[#E2E8F0]" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-serif text-2xl font-bold text-[#F3E5AB]">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Welcome, {user?.fullName || 'Valued Customer'}
                  </h1>
                  <Badge variant="gold">{user?.role === 'admin' ? 'Admin' : 'Customer'}</Badge>
                </div>
                <p className="text-xs text-[#E2E8F0] mt-1">{user?.email}</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="border-white/30 text-white hover:bg-white/10 w-fit"
              leftIcon={<LogOut size={16} />}
            >
              Sign Out
            </Button>
          </div>
        </Container>
      </Section>

      {/* Main Account Portal */}
      <Section padding="lg" background="white" className="border-b border-[#EBE7DF]">
        <Container>
          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-3 border-b border-[#EBE7DF] pb-4 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-[#6A1423] text-white shadow-sm'
                  : 'bg-[#F7F4ED] text-[#171717] hover:border-[#6A1423]'
              }`}
            >
              <User size={16} /> Account Overview
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-[#6A1423] text-white shadow-sm'
                  : 'bg-[#F7F4ED] text-[#171717] hover:border-[#6A1423]'
              }`}
            >
              <Package size={16} /> Order History ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'addresses'
                  ? 'bg-[#6A1423] text-white shadow-sm'
                  : 'bg-[#F7F4ED] text-[#171717] hover:border-[#6A1423]'
              }`}
            >
              <MapPin size={16} /> Saved Addresses ({addresses.length})
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-[#F7F4ED] p-8 rounded-2xl border border-[#EBE7DF] space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#171717] border-b border-[#EBE7DF] pb-3">
                  Profile Details
                </h3>
                <div className="space-y-3 text-xs text-slate-800">
                  <div>
                    <span className="text-slate-500 font-bold block uppercase tracking-wider">Full Name</span>
                    <p className="font-bold text-sm text-[#171717]">{user?.fullName}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase tracking-wider">Email Address</span>
                    <p className="font-bold text-sm text-[#171717]">{user?.email}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase tracking-wider">Registered Since</span>
                    <p className="font-semibold text-slate-700">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : 'Recently'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F7F4ED] p-8 rounded-2xl border border-[#EBE7DF] space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#171717] border-b border-[#EBE7DF] pb-3">
                  Storefront Status
                </h3>
                <div className="space-y-3 text-xs text-slate-800">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <ShieldCheck size={18} />
                    <span>Verified Customer Account</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Your account is configured for express checkout, automated order confirmations, and compliant address storage.
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-bold text-[#6A1423]">Active Orders: {orders.length}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6 text-left">
              {orders.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF]">
                  <Package className="w-12 h-12 text-slate-400 mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-[#171717]">No Orders Placed Yet</h3>
                  <p className="text-xs text-slate-600">Your completed orders will appear here with full invoice snapshots.</p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.id} className="bg-[#F7F4ED] rounded-2xl border border-[#EBE7DF] overflow-hidden shadow-subtle-card">
                    {/* Order Header Bar */}
                    <div
                      onClick={() => setExpandedOrderId(expandedOrderId === ord.id ? null : ord.id)}
                      className="p-6 bg-[#FCFBF8] border-b border-[#EBE7DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-serif font-black text-lg text-[#171717]">
                            Order #{ord.orderNumber}
                          </span>
                          <Badge variant="maroon">{ord.orderStatus.toUpperCase()}</Badge>
                          <Badge variant="green">{ord.paymentStatus.toUpperCase()}</Badge>
                        </div>
                        <span className="text-xs text-slate-500 block">
                          Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-serif font-extrabold text-xl text-[#6A1423]">
                          ₹{ord.total.toLocaleString('en-IN')}
                        </span>
                        {expandedOrderId === ord.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>

                    {/* Order Item Details (Expandable) */}
                    {expandedOrderId === ord.id && (
                      <div className="p-6 space-y-6 bg-[#F7F4ED]">
                        <div className="space-y-3 divide-y divide-[#EBE7DF]">
                          {ord.items.map((item) => (
                            <div key={item.id} className="pt-3 flex items-center justify-between gap-4 text-xs">
                              <div className="flex items-center gap-3">
                                <img src={item.productImage} alt={item.productName} className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-[#EBE7DF]" />
                                <div>
                                  <span className="font-bold text-[#171717] block">{item.productName}</span>
                                  <span className="text-slate-500 font-semibold">{item.packSize} • Qty: {item.quantity}</span>
                                </div>
                              </div>
                              <span className="font-bold text-[#171717]">₹{item.subtotal.toLocaleString('en-IN')}</span>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#EBE7DF] text-xs text-slate-700">
                          <div className="bg-[#FCFBF8] p-4 rounded-xl border border-[#EBE7DF] space-y-1">
                            <span className="font-bold text-[#171717] block mb-1">Shipping Address Snapshot</span>
                            <p className="font-semibold text-slate-900">{ord.shippingAddress.fullName}</p>
                            <p>{ord.shippingAddress.street}, {ord.shippingAddress.city}</p>
                            <p>{ord.shippingAddress.state} - {ord.shippingAddress.pincode}</p>
                            <p>Phone: {ord.shippingAddress.phone}</p>
                          </div>

                          <div className="bg-[#FCFBF8] p-4 rounded-xl border border-[#EBE7DF] space-y-1.5 font-semibold">
                            <span className="font-bold text-[#171717] block mb-1">Payment Breakdown</span>
                            <div className="flex justify-between"><span>Subtotal:</span><span>₹{ord.subtotal.toLocaleString('en-IN')}</span></div>
                            <div className="flex justify-between"><span>Express Shipping:</span><span>{ord.shippingFee === 0 ? 'FREE' : `₹${ord.shippingFee}`}</span></div>
                            <div className="flex justify-between font-bold text-[#6A1423] pt-1 border-t border-[#EBE7DF]"><span>Total Paid:</span><span>₹{ord.total.toLocaleString('en-IN')}</span></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6 text-left">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-xl font-bold text-[#171717]">Saved Shipping Locations</h3>
                <Button variant="primary" size="sm" onClick={() => setShowAddressForm(!showAddressForm)} leftIcon={<Plus size={16} />}>
                  {showAddressForm ? 'Cancel' : 'Add New Address'}
                </Button>
              </div>

              {showAddressForm && (
                <form onSubmit={handleAddAddress} className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] space-y-4 max-w-lg">
                  <h4 className="font-serif font-bold text-base text-[#171717]">Enter Address Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <input type="text" placeholder="Full Name" value={newFullName} onChange={(e) => setNewFullName(e.target.value)} required className="p-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717]" />
                    <input type="tel" placeholder="Phone Number" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} required className="p-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717]" />
                  </div>
                  <input type="text" placeholder="Street Address / House No." value={newStreet} onChange={(e) => setNewStreet(e.target.value)} required className="w-full p-3 text-xs bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717]" />
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <input type="text" placeholder="City" value={newCity} onChange={(e) => setNewCity(e.target.value)} required className="p-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717]" />
                    <input type="text" placeholder="State" value={newState} onChange={(e) => setNewState(e.target.value)} required className="p-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717]" />
                    <input type="text" placeholder="Pincode" value={newPincode} onChange={(e) => setNewPincode(e.target.value)} required className="p-3 bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl text-[#171717]" />
                  </div>
                  <Button type="submit" variant="primary" size="sm" className="w-full">Save Address</Button>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {addresses.map((addr: UserAddress) => (
                  <div key={addr.id} className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] shadow-subtle-card space-y-2 text-xs text-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-[#171717]">{addr.fullName}</span>
                      {addr.isDefault && <span className="text-[10px] font-bold bg-emerald-50 text-[#173C2B] px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1"><CheckCircle2 size={12} /> Default</span>}
                    </div>
                    <p>{addr.street}</p>
                    {addr.landmark && <p>Landmark: {addr.landmark}</p>}
                    <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="font-semibold text-slate-900 pt-1">Phone: {addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
};
