import React, { useState, useEffect } from 'react';
import { INITIAL_LISTINGS as LISTINGS } from './data/listingsData';
import { PropertyListing, SearchFilters } from './types';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PropertySearchings } from './components/PropertySearchings';
import { HomeValuationings } from './components/HomeValuationings';
import { CommunitiesSection } from './components/CommunitiesSection';
import { MarketInsights } from './components/MarketInsights';
import { WhyKonrad } from './components/WhyKonrad';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { ScheduleModal } from './components/ScheduleModal';
import { AIConciergeWidget } from './components/AIConciergeWidget';
import { Footer } from './components/Footer';

import { Bot, Sparkles, Heart, Phone, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'listings' | 'valuation' | 'communities' | 'market' | 'about' | 'favorites'>('home');
  
  // Saved Favorites State
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('ks_saved_properties');
      return stored ? JSON.parse(stored) : ['prop-1', 'prop-3'];
    } catch {
      return ['prop-1', 'prop-3'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ks_saved_properties', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Search Filters State
  const [filters, setFilters] = useState<SearchFilters>({
    city: 'All',
    propertyType: 'All',
    minPrice: 0,
    maxPrice: 10000000,
    bedrooms: 0,
    bathrooms: 0,
    isWaterfrontOnly: false,
    isInvestmentOnly: false,
    searchQuery: '',
    sortBy: 'price-desc'
  });

  // Modals state
  const [selectedListingForDetail, setSelectedListingForDetail] = useState<PropertyListing | null>(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [preselectedListingForSchedule, setPreselectedListingForSchedule] = useState<PropertyListing | null>(null);
  const [aiWidgetOpen, setAiWidgetOpen] = useState(false);

  // Quick Action Handlers
  const handleViewListingDetails = (listing: PropertyListing) => {
    setSelectedListingForDetail(listing);
  };

  const handleScheduleListingTour = (listing: PropertyListing) => {
    setPreselectedListingForSchedule(listing);
    setScheduleModalOpen(true);
  };

  const handleOpenGeneralSchedule = () => {
    setPreselectedListingForSchedule(null);
    setScheduleModalOpen(true);
  };

  const handleCommunitySelect = (cityName: string) => {
    setFilters((prev) => ({ ...prev, city: cityName }));
    setActiveTab('listings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const savedListings = LISTINGS.filter((l) => savedIds.includes(l.id));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedIds.length}
        onOpenAIConcierge={() => setAiWidgetOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* TAB 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div className="space-y-12 pb-16">
            <HeroSection
              filters={filters}
              setFilters={setFilters}
              onSearchSubmit={() => {
                setActiveTab('listings');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenValuation={() => {
                setActiveTab('valuation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenSchedule={handleOpenGeneralSchedule}
            />

            {/* Featured Listings Preview */}
            <PropertySearchings
              listings={LISTINGS}
              filters={filters}
              setFilters={setFilters}
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
              onViewDetails={handleViewListingDetails}
              onScheduleTour={handleScheduleListingTour}
            />

            {/* Communities Showcase */}
            <CommunitiesSection onSelectCommunity={handleCommunitySelect} />

            {/* Market Intelligence */}
            <MarketInsights />

            {/* Why Konrad Schultz & Credentials */}
            <WhyKonrad onScheduleConsultation={handleOpenGeneralSchedule} />
          </div>
        )}

        {/* TAB 2: ACTIVE LISTINGS & MAP */}
        {activeTab === 'listings' && (
          <div className="py-6">
            <PropertySearchings
              listings={LISTINGS}
              filters={filters}
              setFilters={setFilters}
              savedIds={savedIds}
              onToggleSave={handleToggleSave}
              onViewDetails={handleViewListingDetails}
              onScheduleTour={handleScheduleListingTour}
            />
          </div>
        )}

        {/* TAB 3: INSTANT HOME VALUATION */}
        {activeTab === 'valuation' && (
          <div className="py-6">
            <HomeValuationings onScheduleConsultation={handleOpenGeneralSchedule} />
          </div>
        )}

        {/* TAB 4: COMMUNITIES */}
        {activeTab === 'communities' && (
          <div className="py-6">
            <CommunitiesSection onSelectCommunity={handleCommunitySelect} />
          </div>
        )}

        {/* TAB 5: MARKET INSIGHTS & ROI */}
        {activeTab === 'market' && (
          <div className="py-6">
            <MarketInsights />
          </div>
        )}

        {/* TAB 6: ABOUT KONRAD SCHULTZ */}
        {activeTab === 'about' && (
          <div className="py-6">
            <WhyKonrad onScheduleConsultation={handleOpenGeneralSchedule} />
          </div>
        )}

        {/* TAB 7: SAVED FAVORITES */}
        {activeTab === 'favorites' && (
          <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h1 className="text-3xl font-bold font-serif text-white flex items-center gap-2">
                  <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                  Saved Properties
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Your bookmarked South Florida properties ({savedListings.length})
                </p>
              </div>
            </div>

            {savedListings.length === 0 ? (
              <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
                <Heart className="w-10 h-10 text-slate-600 mx-auto" />
                <div className="text-lg font-bold text-white">No Saved Properties Yet</div>
                <p className="text-xs text-slate-400">Click the heart icon on any property card to save it for easy access.</p>
                <button
                  onClick={() => setActiveTab('listings')}
                  className="px-4 py-2 rounded-xl bg-cyan-600 text-slate-950 font-bold text-xs"
                >
                  Browse Active Listings
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedListings.map((listing) => (
                  <div key={listing.id} className="relative">
                    <PropertySearchings
                      listings={[listing]}
                      filters={filters}
                      setFilters={setFilters}
                      savedIds={savedIds}
                      onToggleSave={handleToggleSave}
                      onViewDetails={handleViewListingDetails}
                      onScheduleTour={handleScheduleListingTour}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Floating AI Concierge Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setAiWidgetOpen(true)}
          className="group relative px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 transition-all hover:scale-105 cursor-pointer ring-4 ring-cyan-500/20"
        >
          <Bot className="w-5 h-5 text-slate-950" />
          <span className="text-slate-950 font-extrabold hidden sm:inline">Ask AI Concierge</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
          </span>
        </button>
      </div>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        listing={selectedListingForDetail}
        onClose={() => setSelectedListingForDetail(null)}
        isSaved={selectedListingForDetail ? savedIds.includes(selectedListingForDetail.id) : false}
        onToggleSave={handleToggleSave}
        onScheduleTour={handleScheduleListingTour}
      />

      {/* Schedule Showing / Consultation Modal */}
      <ScheduleModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        preselectedListing={preselectedListingForSchedule}
      />

      {/* Floating AI Concierge Widget Window */}
      <AIConciergeWidget
        isOpen={aiWidgetOpen}
        onClose={() => setAiWidgetOpen(false)}
        onOpenScheduleModal={handleOpenGeneralSchedule}
        activeListingsCount={LISTINGS.length}
      />

      {/* Footer */}
      <Footer onNavClick={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}
