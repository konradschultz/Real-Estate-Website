import React, { useState } from 'react';
import { Phone, Mail, Award, Heart, Search, Home, BarChart2, ShieldCheck, Calendar, Menu, X, Compass, MapPin } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'listings' | 'valuation' | 'communities' | 'market' | 'about' | 'favorites';
  setActiveTab: (tab: 'home' | 'listings' | 'valuation' | 'communities' | 'market' | 'about' | 'favorites') => void;
  savedCount: number;
  onOpenScheduleModal?: () => void;
  onOpenAIChat?: () => void;
  onOpenAIConcierge?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenScheduleModal,
  onOpenAIChat,
  onOpenAIConcierge
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenAI = onOpenAIConcierge || onOpenAIChat || (() => {});

  const handleNavClick = (tab: 'home' | 'listings' | 'valuation' | 'communities' | 'market' | 'about' | 'favorites') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/75 backdrop-blur-xl border-b border-white/10 text-white shadow-2xl">
      {/* Top Banner with License & Contact Details */}
      <div className="bg-slate-900/60 backdrop-blur-md border-b border-white/10 text-xs py-2 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className="inline-flex items-center gap-1.5 text-cyan-300 font-medium glass-badge px-2.5 py-0.5 rounded-full">
              <Award className="w-3.5 h-3.5" />
              Board of Realtors Miami | Lic # 3188541
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="text-slate-200 font-semibold tracking-wide">
              Beachfront Realty
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="text-slate-400 inline-flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" />
              20803 Biscayne Blvd, Suite 102, Aventura, FL 33180
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:9542975559"
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-cyan-300 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>954-297-5559</span>
            </a>
            <a
              href="mailto:KonradSchultz001@mymdc.net"
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-cyan-300 transition-colors hidden sm:inline-flex"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>KonradSchultz001@mymdc.net</span>
            </a>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-blue-600/40 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-all">
              <Compass className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-serif">
                KONRAD SCHULTZ
              </div>
              <div className="text-[10px] tracking-widest text-cyan-400 uppercase font-semibold">
                South Florida Real Estate Advisor
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-400/30 shadow-sm backdrop-blur-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('listings')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'listings'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-400/30 shadow-sm backdrop-blur-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Search className="w-4 h-4 text-cyan-400" />
              Active Listings
            </button>
            <button
              onClick={() => handleNavClick('valuation')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'valuation'
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-400/30 shadow-sm backdrop-blur-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-4 h-4 text-emerald-400" />
              Sell / Valuation
            </button>
            <button
              onClick={() => handleNavClick('communities')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'communities'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-400/30 shadow-sm backdrop-blur-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Communities
            </button>
            <button
              onClick={() => handleNavClick('market')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'market'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-400/30 shadow-sm backdrop-blur-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              Market Trends
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-400/30 shadow-sm backdrop-blur-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              About Konrad
            </button>
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Saved Favorites Button */}
            <button
              onClick={() => handleNavClick('favorites')}
              className="relative p-2.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400/40 transition-all cursor-pointer shadow-md"
              title="Saved Properties"
            >
              <Heart className={`w-5 h-5 ${savedCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
              {savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md">
                  {savedCount}
                </span>
              )}
            </button>

            {/* AI Concierge Quick Trigger */}
            <button
              onClick={handleOpenAI}
              className="px-3.5 py-2.5 rounded-xl bg-cyan-950/40 backdrop-blur-md border border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/50 hover:border-cyan-400 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              AI Concierge
            </button>

            {/* Schedule Consultation CTA */}
            {onOpenScheduleModal && (
              <button
                onClick={onOpenScheduleModal}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/90 to-blue-600/90 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-cyan-500/20 border border-cyan-300/30 flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                Schedule Showing
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('favorites')}
              className="p-2 text-slate-300 relative"
            >
              <Heart className={`w-6 h-6 ${savedCount > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'}`} />
              {savedCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/90 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-4 py-3 rounded-xl text-left font-medium ${
                activeTab === 'home' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30' : 'text-slate-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('listings')}
              className={`px-4 py-3 rounded-xl text-left font-medium flex items-center gap-2 ${
                activeTab === 'listings' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30' : 'text-slate-300'
              }`}
            >
              <Search className="w-4 h-4 text-cyan-400" />
              Active Listings & Interactive Map
            </button>
            <button
              onClick={() => handleNavClick('valuation')}
              className={`px-4 py-3 rounded-xl text-left font-medium flex items-center gap-2 ${
                activeTab === 'valuation' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30' : 'text-slate-300'
              }`}
            >
              <Home className="w-4 h-4 text-emerald-400" />
              Sell / Instant Home Valuation
            </button>
            <button
              onClick={() => handleNavClick('communities')}
              className={`px-4 py-3 rounded-xl text-left font-medium ${
                activeTab === 'communities' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30' : 'text-slate-300'
              }`}
            >
              South Florida Communities
            </button>
            <button
              onClick={() => handleNavClick('market')}
              className={`px-4 py-3 rounded-xl text-left font-medium flex items-center gap-2 ${
                activeTab === 'market' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30' : 'text-slate-300'
              }`}
            >
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              Market Trends & Analytics
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-4 py-3 rounded-xl text-left font-medium ${
                activeTab === 'about' ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30' : 'text-slate-300'
              }`}
            >
              About Konrad Schultz
            </button>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                handleOpenAI();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-cyan-950/40 backdrop-blur-md border border-cyan-500/30 text-cyan-300 font-semibold text-sm flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Open AI Real Estate Assistant
            </button>
            {onOpenScheduleModal && (
              <button
                onClick={() => {
                  onOpenScheduleModal();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm shadow-lg"
              >
                Schedule Consultation / Tour
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
