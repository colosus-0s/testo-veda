import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { isDevPreviewActive } from '@/config/devPreview';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Button } from '@/components/ui/Button';
import {
  User,
  Package,
  MapPin,
  Heart,
  ShoppingBag,
  Lock,
  HelpCircle,
  MessageSquare,
  LogOut,
  ChevronRight,
  ShieldCheck,
  LayoutDashboard,
  ShieldAlert,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  exact?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const AccountLayout: React.FC = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const devPreview = isDevPreviewActive();

  const handleSignOut = async () => {
    await logout();
    navigate('/');
  };

  const navSections: NavSection[] = [
    {
      title: 'ACCOUNT',
      items: [
        { label: 'Overview', href: '/account', icon: User, exact: true },
        { label: 'Orders', href: '/account/orders', icon: Package },
        { label: 'Addresses', href: '/account/addresses', icon: MapPin },
        { label: 'Wishlist', href: '/account/wishlist', icon: Heart },
        { label: 'Cart', href: '/cart', icon: ShoppingBag },
        { label: 'Profile Details', href: '/account/profile', icon: User },
      ],
    },
    {
      title: 'SUPPORT',
      items: [
        { label: 'Help & FAQ', href: '/faq', icon: HelpCircle },
        { label: 'Contact Support', href: '/our-story', icon: MessageSquare },
      ],
    },
    {
      title: 'ACCOUNT SETTINGS',
      items: [
        { label: 'Login & Security', href: '/account/security', icon: Lock },
      ],
    },
  ];

  if (isAdmin || devPreview) {
    navSections.push({
      title: 'ADMINISTRATION',
      items: [
        {
          label: devPreview && !isAdmin ? 'Admin Panel (Dev Preview)' : 'Admin Panel',
          href: '/admin',
          icon: LayoutDashboard,
        },
      ],
    });
  }

  const isItemActive = (href: string, exact?: boolean) => {
    if (exact) return location.pathname === href;
    return location.pathname.startsWith(href);
  };

  return (
    <div className="w-full bg-[#F7F4ED] text-[#171717] min-h-screen">
      {/* Header Banner */}
      <Section padding="md" background="deep-green" className="border-b border-[#2E6B4A]/50">
        <Container>
          <Breadcrumb items={[{ label: 'My Account' }]} className="mb-6 text-[#E2E8F0]" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-serif text-2xl font-bold text-[#F3E5AB]">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#F3E5AB] font-bold block mb-1">
                  Arogya Path Member
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Welcome back, {user?.fullName || 'Valued Customer'}
                </h1>
                <p className="text-xs text-[#E2E8F0] mt-1">{user?.email}</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="border-white/30 text-white hover:bg-white/10 w-fit"
              leftIcon={<LogOut size={16} />}
            >
              Sign Out
            </Button>
          </div>
        </Container>
      </Section>

      {/* Main Account Shell */}
      <Section padding="lg" background="white" className="border-b border-[#EBE7DF]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            {/* Desktop Left Sidebar / Mobile Stacked Nav */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-[#F7F4ED] p-4 sm:p-5 rounded-2xl border border-[#EBE7DF] space-y-6">
                {navSections.map((section) => (
                  <div key={section.title} className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block px-3">
                      {section.title}
                    </span>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const active = isItemActive(item.href, item.exact);
                        const isAdminItem = item.href.startsWith('/admin');
                        return (
                          <Link
                            key={item.href}
                            to={item.href}
                            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                              active
                                ? 'bg-[#6A1423] text-white shadow-sm'
                                : isAdminItem
                                ? 'bg-amber-500/10 text-amber-900 border border-amber-300 hover:bg-amber-500 hover:text-white'
                                : 'text-[#171717] hover:bg-[#FCFBF8] hover:text-[#6A1423]'
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <Icon size={16} className={active ? 'text-white' : isAdminItem ? 'text-amber-800' : 'text-slate-500'} />
                              {item.label}
                            </span>
                            <ChevronRight size={14} className={active ? 'text-white' : 'text-slate-400'} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-[#EBE7DF]">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
                  >
                    <LogOut size={16} /> Sign Out Account
                  </button>
                </div>
              </div>

              {devPreview && (
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 text-xs text-amber-900 space-y-1.5">
                  <span className="flex items-center gap-1.5 font-bold text-amber-950">
                    <ShieldAlert size={16} className="text-amber-700 shrink-0" /> Dev Admin Access Active
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    Development preview mode allows inspecting store management UI prior to Supabase RLS integration.
                  </p>
                </div>
              )}

              <div className="bg-[#FCFBF8] p-4 rounded-2xl border border-[#EBE7DF] text-xs text-slate-600 space-y-1">
                <span className="flex items-center gap-1.5 font-bold text-[#173C2B]">
                  <ShieldCheck size={16} className="text-emerald-600" /> Account Protected
                </span>
                <p className="text-[11px] leading-relaxed">
                  256-bit encrypted authentication & compliant address data protection.
                </p>
              </div>
            </div>

            {/* Right Main Content Outlet */}
            <div className="lg:col-span-9 bg-[#FCFBF8] p-6 sm:p-10 rounded-3xl border border-[#EBE7DF] shadow-subtle-card min-h-[550px]">
              <Outlet />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};
