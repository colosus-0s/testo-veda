import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOrders, type OrderRecord } from '@/context/OrderContext';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { User, Package, MapPin, LogOut, CheckCircle2, Clock, ShieldCheck, Eye, X } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'profile'>('overview');
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  const userOrders = orders.filter((o) => !o.userId || o.userId === user?.id || o.customerEmail === user?.email);

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] opacity-100 min-h-screen">
      {/* Account Hero Stage */}
      <Section padding="md" background="deep-green" className="border-b border-[#2E6B4A]/50">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#F3E5AB] bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-white/20">
                Customer Account Dashboard
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Welcome Back, {user?.fullName || 'Valued Customer'}
              </h1>
              <p className="text-slate-200 text-xs sm:text-sm mt-1">
                Email: {user?.email} • Role: {user?.role === 'admin' ? 'Administrator' : 'Customer'}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="border-white/30 text-white hover:border-white/60 w-fit"
              leftIcon={<LogOut className="w-4 h-4" />}
            >
              Sign Out
            </Button>
          </div>
        </Container>
      </Section>

      {/* Account Dashboard Tabs & Body */}
      <Section padding="lg" background="white" className="border-b border-[#EBE7DF]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 space-y-2 bg-[#F7F4ED] p-4 rounded-2xl border border-[#EBE7DF]">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'overview' ? 'bg-[#6A1423] text-white shadow-sm' : 'text-[#171717] hover:bg-[#FCFBF8]'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Account Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'orders' ? 'bg-[#6A1423] text-white shadow-sm' : 'text-[#171717] hover:bg-[#FCFBF8]'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Order History ({userOrders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'addresses' ? 'bg-[#6A1423] text-white shadow-sm' : 'text-[#171717] hover:bg-[#FCFBF8]'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Saved Addresses</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === 'profile' ? 'bg-[#6A1423] text-white shadow-sm' : 'text-[#171717] hover:bg-[#FCFBF8]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Profile Settings</span>
              </button>
            </div>

            {/* Tab Content Stage */}
            <div className="lg:col-span-9 space-y-6">
              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#F7F4ED] p-5 rounded-2xl border border-[#EBE7DF] space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Total Orders</span>
                      <p className="font-serif text-2xl font-bold text-[#6A1423]">{userOrders.length}</p>
                    </div>
                    <div className="bg-[#F7F4ED] p-5 rounded-2xl border border-[#EBE7DF] space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Account Status</span>
                      <p className="font-serif text-base font-bold text-[#173C2B] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Active Member
                      </p>
                    </div>
                    <div className="bg-[#F7F4ED] p-5 rounded-2xl border border-[#EBE7DF] space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Default Currency</span>
                      <p className="font-serif text-2xl font-bold text-[#171717]">INR (₹)</p>
                    </div>
                  </div>

                  {/* Recent Order Preview */}
                  <div className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] space-y-4">
                    <h3 className="font-serif text-xl font-bold text-[#171717]">Most Recent Order</h3>
                    {userOrders.length > 0 ? (
                      <div className="bg-[#F7F4ED] p-4 rounded-xl border border-[#EBE7DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                        <div>
                          <span className="font-bold text-[#6A1423] block">{userOrders[0].orderNumber}</span>
                          <span className="text-slate-500 block">{new Date(userOrders[0].createdAt).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-bold text-[#171717] block">₹{userOrders[0].totalAmount.toLocaleString('en-IN')}</span>
                          <span className="text-emerald-700 font-semibold block capitalize">{userOrders[0].status}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(userOrders[0])}
                          leftIcon={<Eye className="w-3.5 h-3.5" />}
                        >
                          View Details
                        </Button>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">No orders placed yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2: Order History */}
              {activeTab === 'orders' && (
                <div className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] space-y-6">
                  <h3 className="font-serif text-2xl font-bold text-[#171717]">Order History</h3>

                  {userOrders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-[#EBE7DF] text-slate-500 uppercase text-[10px] font-bold">
                            <th className="py-3 px-2">Order #</th>
                            <th className="py-3 px-2">Date</th>
                            <th className="py-3 px-2">Items</th>
                            <th className="py-3 px-2">Total</th>
                            <th className="py-3 px-2">Payment</th>
                            <th className="py-3 px-2">Status</th>
                            <th className="py-3 px-2 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EBE7DF]">
                          {userOrders.map((ord) => (
                            <tr key={ord.id} className="hover:bg-[#F7F4ED]">
                              <td className="py-3.5 px-2 font-bold text-[#6A1423]">{ord.orderNumber}</td>
                              <td className="py-3.5 px-2 text-slate-600">{new Date(ord.createdAt).toLocaleDateString()}</td>
                              <td className="py-3.5 px-2 font-medium">{ord.items.length} Item(s)</td>
                              <td className="py-3.5 px-2 font-bold text-[#171717]">₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                              <td className="py-3.5 px-2">
                                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                                  {ord.paymentStatus}
                                </span>
                              </td>
                              <td className="py-3.5 px-2">
                                <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                                  {ord.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-2 text-right">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedOrder(ord)}
                                  leftIcon={<Eye className="w-3.5 h-3.5" />}
                                >
                                  View
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="py-12 text-center text-slate-500 space-y-2">
                      <Clock className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-xs font-semibold">No order history found.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Saved Addresses */}
              {activeTab === 'addresses' && (
                <div className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif text-2xl font-bold text-[#171717]">Saved Addresses</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#F7F4ED] p-5 rounded-xl border border-[#EBE7DF] space-y-2 text-xs">
                      <span className="text-[10px] font-bold uppercase text-[#6A1423] bg-red-50 px-2 py-0.5 rounded border border-red-100 inline-block mb-1">
                        Default Address
                      </span>
                      <p className="font-bold text-[#171717]">{user?.fullName || 'Arogya Customer'}</p>
                      <p className="text-slate-700">Ashok Nagar, Logardaga</p>
                      <p className="text-slate-700">Jharkhand - 835302, India</p>
                      <p className="text-slate-600 font-semibold pt-1">Phone: +91 9288515228</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Profile Settings */}
              {activeTab === 'profile' && (
                <div className="bg-[#FCFBF8] p-6 rounded-2xl border border-[#EBE7DF] space-y-6">
                  <h3 className="font-serif text-2xl font-bold text-[#171717]">Profile Information</h3>
                  <div className="space-y-4 text-xs max-w-md">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                      <input
                        type="text"
                        disabled
                        value={user?.fullName || ''}
                        className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl px-3.5 py-2 text-[#171717] font-semibold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                      <input
                        type="email"
                        disabled
                        value={user?.email || ''}
                        className="w-full bg-[#F7F4ED] border border-[#EBE7DF] rounded-xl px-3.5 py-2 text-[#171717] font-semibold"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FCFBF8] rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#EBE7DF] shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-left text-xs">
            <div className="flex justify-between items-center border-b border-[#EBE7DF] pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#6A1423]">Order Details</span>
                <h3 className="font-serif text-2xl font-bold text-[#171717]">{selectedOrder.orderNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-slate-500 hover:text-[#171717] rounded-full bg-[#F7F4ED]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-[#F7F4ED] p-4 rounded-xl border border-[#EBE7DF]">
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Date Placed</span>
                <span className="font-bold text-[#171717]">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Payment Provider</span>
                <span className="font-bold text-[#173C2B]">{selectedOrder.paymentProvider}</span>
              </div>
            </div>

            <div>
              <h4 className="font-serif text-base font-bold text-[#171717] mb-3">Item Snapshots</h4>
              <div className="divide-y divide-[#EBE7DF] border-y border-[#EBE7DF]">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-[#171717]">{item.productName}</p>
                      <p className="text-[11px] text-slate-500">{item.variantName} × {item.quantity}</p>
                    </div>
                    <span className="font-bold text-[#171717]">₹{item.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 font-bold text-sm text-[#171717]">
              <span>Total Paid Amount:</span>
              <span className="font-serif text-lg text-[#6A1423]">₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</span>
            </div>

            <Button variant="primary" size="md" className="w-full font-bold" onClick={() => setSelectedOrder(null)}>
              Close Order Receipt
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
