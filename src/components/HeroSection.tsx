import React, { useState } from 'react';
import { Search, MapPin, Building, DollarSign, Waves, ArrowRight, ShieldCheck, Sparkles, Phone, Compass } from 'lucide-react';
import { SearchFilters } from '../types';

interface HeroSectionProps {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  onSearchClick?: () => void;
  onSearchSubmit?: () => void;
  onValuationClick?: () => void;
  onOpenValuation?: () => void;
  onScheduleClick?: () => void;
  onOpenSchedule?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  filters,
  setFilters,
  onSearchClick,
  onSearchSubmit,
  onValuationClick,
  onOpenValuation,
  onScheduleClick,
  onOpenSchedule
}) => {
  const handleSearch = onSearchSubmit || onSearchClick || (() => {});
  const handleValuation = onOpenValuation || onValuationClick || (() => {});
  const handleSchedule = onOpenSchedule || onScheduleClick || (() => {});

  const [localCity, setLocalCity] = useState(filters.city || 'All');
  const [localType, setLocalType] = useState(filters.propertyType || 'All');
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice || 10000000);
  const [localWaterfront, setLocalWaterfront] = useState(filters.isWaterfrontOnly || false);

  const handleApplySearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      city: localCity,
      propertyType: localType,
      maxPrice: localMaxPrice,
      isWaterfrontOnly: localWaterfront
    }));
    handleSearch();
  };

  const handleQuickPill = (city: string, type: string, waterfront: boolean) => {
    setLocalCity(city);
    setLocalType(type);
    setLocalWaterfront(waterfront);
    setFilters(prev => ({
      ...prev,
      city,
      propertyType: type,
      isWaterfrontOnly: waterfront
    }));
    handleSearch();
  };

  return (
    <section className="relative min-h-[85vh] text-white overflow-hidden flex flex-col justify-between pt-8 pb-16">
      {/* Background Imagery with High Contrast Gradient & Blur Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80"
          alt="South Florida Oceanfront"
          className="w-full h-full object-cover object-center opacity-35 scale-105 filter contrast-110 blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 flex-1 flex flex-col justify-center">
        
        {/* Realtor Identity Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-badge text-cyan-300 text-xs font-semibold mb-6 w-fit shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>KONRAD SCHULTZ | BEACHFRONT REALTY (LIC # 3188541)</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl font-serif leading-[1.1]">
          Find Your Dream Home in <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400 bg-clip-text text-transparent">South Florida</span>
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
          Modern real estate guidance backed by local market intelligence, custom AI analytics, and personalized service across Aventura, Sunny Isles, & Miami.
        </p>

        {/* Floating Smart Property Search Box in Glass */}
        <div className="mt-8 glass-modal rounded-3xl p-5 sm:p-7 shadow-2xl max-w-5xl">
          <form onSubmit={handleApplySearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            
            {/* City Filter */}
            <div>
              <label className="block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-1.5">
                Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={localCity}
                  onChange={(e) => setLocalCity(e.target.value)}
                  className="w-full glass-input text-white rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all cursor-pointer"
                >
                  <option value="All" className="bg-slate-900 text-white">All South Florida</option>
                  <option value="Aventura" className="bg-slate-900 text-white">Aventura</option>
                  <option value="Sunny Isles Beach" className="bg-slate-900 text-white">Sunny Isles Beach</option>
                  <option value="Bal Harbour" className="bg-slate-900 text-white">Bal Harbour</option>
                  <option value="Miami" className="bg-slate-900 text-white">Miami / Brickell</option>
                  <option value="Fort Lauderdale" className="bg-slate-900 text-white">Fort Lauderdale</option>
                  <option value="Hollywood" className="bg-slate-900 text-white">Hollywood</option>
                  <option value="Hallandale Beach" className="bg-slate-900 text-white">Hallandale Beach</option>
                  <option value="Boca Raton" className="bg-slate-900 text-white">Boca Raton</option>
                </select>
              </div>
            </div>

            {/* Property Type Filter */}
            <div>
              <label className="block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-1.5">
                Property Type
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={localType}
                  onChange={(e) => setLocalType(e.target.value)}
                  className="w-full glass-input text-white rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all cursor-pointer"
                >
                  <option value="All" className="bg-slate-900 text-white">All Types</option>
                  <option value="Condo" className="bg-slate-900 text-white">Luxury Condo</option>
                  <option value="Penthouse" className="bg-slate-900 text-white">Penthouse</option>
                  <option value="Single Family" className="bg-slate-900 text-white">Single Family</option>
                  <option value="Waterfront Villa" className="bg-slate-900 text-white">Waterfront Villa</option>
                </select>
              </div>
            </div>

            {/* Max Price Filter */}
            <div>
              <label className="block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-1.5">
                Max Price
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={localMaxPrice}
                  onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
                  className="w-full glass-input text-white rounded-xl pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 transition-all cursor-pointer"
                >
                  <option value={10000000} className="bg-slate-900 text-white">Any Price</option>
                  <option value={1000000} className="bg-slate-900 text-white">Under $1,000,000</option>
                  <option value={2000000} className="bg-slate-900 text-white">Under $2,000,000</option>
                  <option value={4000000} className="bg-slate-900 text-white">Under $4,000,000</option>
                  <option value={7000000} className="bg-slate-900 text-white">Under $7,000,000</option>
                </select>
              </div>
            </div>

            {/* Waterfront Checkbox */}
            <div className="flex items-center gap-2 pb-0.5">
              <label className="flex items-center gap-2 text-xs text-slate-200 font-semibold cursor-pointer glass-input rounded-xl px-3.5 py-2.5 w-full hover:border-cyan-400/40 transition-all">
                <input
                  type="checkbox"
                  checked={localWaterfront}
                  onChange={(e) => setLocalWaterfront(e.target.checked)}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-900 border-white/20 cursor-pointer"
                />
                <Waves className="w-4 h-4 text-cyan-400" />
                <span>Waterfront Only</span>
              </label>
            </div>

            {/* Search Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/20 border border-cyan-300/40 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-950" />
                Search Listings
              </button>
            </div>

          </form>

          {/* Quick Filter Pills */}
          <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center gap-2 flex-wrap text-xs text-slate-300">
            <span className="font-semibold text-slate-400 uppercase tracking-wider">Popular Searches:</span>
            <button
              onClick={() => handleQuickPill('Sunny Isles Beach', 'Condo', true)}
              className="px-3 py-1 rounded-lg glass-card text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer"
            >
              Sunny Isles Waterfront
            </button>
            <button
              onClick={() => handleQuickPill('Aventura', 'Condo', false)}
              className="px-3 py-1 rounded-lg glass-card text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer"
            >
              Aventura ParkSquare
            </button>
            <button
              onClick={() => handleQuickPill('Fort Lauderdale', 'Waterfront Villa', true)}
              className="px-3 py-1 rounded-lg glass-card text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer"
            >
              Las Olas Yacht Dockage
            </button>
            <button
              onClick={() => handleQuickPill('Bal Harbour', 'Condo', true)}
              className="px-3 py-1 rounded-lg glass-card text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-all cursor-pointer"
            >
              Bal Harbour Oceanfront
            </button>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={handleSearch}
            className="px-6 py-3.5 rounded-xl glass-card hover:bg-white/10 text-white font-semibold text-sm border border-white/20 flex items-center gap-2 transition-all cursor-pointer shadow-lg"
          >
            Explore Map & Grid
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>
          <button
            onClick={handleValuation}
            className="px-6 py-3.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 backdrop-blur-md border border-emerald-500/40 text-emerald-300 font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg"
          >
            Get Instant Home Valuation
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
          <button
            onClick={handleSchedule}
            className="px-6 py-3.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg"
          >
            <Phone className="w-4 h-4 text-cyan-400" />
            Contact Konrad (954-297-5559)
          </button>
        </div>

      </div>

      {/* Trust & Stats Footer Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5 px-6 rounded-2xl glass-panel shadow-2xl">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-cyan-300 font-serif">Miami Board</div>
            <div className="text-xs text-slate-400 font-medium">Licensed Florida Realtor® #3188541</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-white font-serif">Beachfront Realty</div>
            <div className="text-xs text-slate-400 font-medium">Premier Aventura Office Brokerage</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-emerald-400 font-serif">$250M+</div>
            <div className="text-xs text-slate-400 font-medium">South Florida Listings Handled</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold text-sky-400 font-serif">AI Powered</div>
            <div className="text-xs text-slate-400 font-medium">Market Analytics & Valuation</div>
          </div>
        </div>
      </div>
    </section>
  );
};
