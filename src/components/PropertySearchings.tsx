import React, { useState, useMemo } from 'react';
import { PropertyListing, SearchFilters } from '../types';
import { PropertyCard } from './PropertyCard';
import { InteractiveMap } from './InteractiveMap';
import { Search, MapPin, SlidersHorizontal, Map as MapIcon, Grid, LayoutList, RefreshCw, Waves, DollarSign, Bed, Building } from 'lucide-react';

interface PropertySearchingsProps {
  listings: PropertyListing[];
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onViewDetails: (listing: PropertyListing) => void;
  onScheduleTour: (listing: PropertyListing) => void;
}

export const PropertySearchings: React.FC<PropertySearchingsProps> = ({
  listings,
  filters,
  setFilters,
  savedIds,
  onToggleSave,
  onViewDetails,
  onScheduleTour
}) => {
  const [selectedListing, setSelectedListing] = useState<PropertyListing | null>(null);
  const [viewMode, setViewMode] = useState<'split' | 'map' | 'grid'>('split');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter listings according to filter criteria
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Search Query
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesQuery =
          item.title.toLowerCase().includes(q) ||
          item.address.toLowerCase().includes(q) ||
          item.city.toLowerCase().includes(q) ||
          item.neighborhood.toLowerCase().includes(q) ||
          item.mlsNumber.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // City
      if (filters.city && filters.city !== 'All') {
        if (item.city.toLowerCase() !== filters.city.toLowerCase()) return false;
      }

      // Property Type
      if (filters.propertyType && filters.propertyType !== 'All') {
        if (item.propertyType.toLowerCase() !== filters.propertyType.toLowerCase()) return false;
      }

      // Max Price
      if (filters.maxPrice && item.price > filters.maxPrice) return false;

      // Bedrooms
      if (filters.bedrooms && item.bedrooms < filters.bedrooms) return false;

      // Bathrooms
      if (filters.bathrooms && item.bathrooms < filters.bathrooms) return false;

      // Waterfront
      if (filters.isWaterfrontOnly && !item.isWaterfront) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'sqft-desc') return b.sqft - a.sqft;
      return 0; // default order
    });
  }, [listings, filters]);

  const handleResetFilters = () => {
    setFilters({
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
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Search Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-5 sm:p-6 rounded-3xl shadow-2xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white flex items-center gap-2">
            Active South Florida Listings
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time properties across Aventura, Sunny Isles, Bal Harbour, Miami & Fort Lauderdale
          </p>
        </div>

        {/* View Mode Toggle Switch */}
        <div className="flex items-center gap-1.5 glass-card p-1.5 rounded-2xl border border-white/10 self-start md:self-auto">
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'split' ? 'bg-cyan-400 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5" />
            Split View
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'map' ? 'bg-cyan-400 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            Map View
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === 'grid' ? 'bg-cyan-400 text-slate-950 font-bold shadow-md' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            Grid View
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card p-4 rounded-2xl space-y-4 border border-white/10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          
          {/* Keyword Search */}
          <div className="relative col-span-1 sm:col-span-2">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search address, neighborhood, MLS #..."
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full glass-input rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 placeholder:text-slate-400"
            />
          </div>

          {/* City */}
          <div>
            <select
              value={filters.city}
              onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
              className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-white">All Cities</option>
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

          {/* Type */}
          <div>
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters(prev => ({ ...prev, propertyType: e.target.value }))}
              className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="All" className="bg-slate-900 text-white">All Types</option>
              <option value="Condo" className="bg-slate-900 text-white">Condo</option>
              <option value="Penthouse" className="bg-slate-900 text-white">Penthouse</option>
              <option value="Single Family" className="bg-slate-900 text-white">Single Family</option>
              <option value="Waterfront Villa" className="bg-slate-900 text-white">Waterfront Villa</option>
            </select>
          </div>

          {/* Max Price */}
          <div>
            <select
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value={10000000} className="bg-slate-900 text-white">Any Max Price</option>
              <option value={1000000} className="bg-slate-900 text-white">Max $1,000,000</option>
              <option value={2000000} className="bg-slate-900 text-white">Max $2,000,000</option>
              <option value={4000000} className="bg-slate-900 text-white">Max $4,000,000</option>
              <option value={7000000} className="bg-slate-900 text-white">Max $7,000,000</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="w-full glass-input rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="price-desc" className="bg-slate-900 text-white">Price: High to Low</option>
              <option value="price-asc" className="bg-slate-900 text-white">Price: Low to High</option>
              <option value="sqft-desc" className="bg-slate-900 text-white">Size: Largest SqFt</option>
            </select>
          </div>

        </div>

        {/* Quick Toggles Row */}
        <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-slate-200 font-medium">
              <input
                type="checkbox"
                checked={filters.isWaterfrontOnly}
                onChange={(e) => setFilters(prev => ({ ...prev, isWaterfrontOnly: e.target.checked }))}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-slate-900 border-white/20"
              />
              <Waves className="w-3.5 h-3.5 text-cyan-400" />
              <span>Waterfront Properties Only</span>
            </label>
          </div>

          <button
            onClick={handleResetFilters}
            className="text-slate-300 hover:text-cyan-300 flex items-center gap-1 text-xs font-semibold cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Filters
          </button>
        </div>

      </div>

      {/* Main Content View (Split Map/Grid, Map, or Grid) */}
      {viewMode === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px]">
          
          {/* Left Column: Interactive Map (5 Cols) */}
          <div className="lg:col-span-5 h-[350px] lg:h-full">
            <InteractiveMap
              listings={filteredListings}
              selectedListing={selectedListing}
              onSelectListing={(item) => setSelectedListing(item)}
              onViewDetails={onViewDetails}
              onScheduleTour={onScheduleTour}
            />
          </div>

          {/* Right Column: Listing Cards Scroll Container (7 Cols) */}
          <div className="lg:col-span-7 h-full overflow-y-auto pr-1 space-y-4 scrollbar-thin">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-semibold">
              <span>{filteredListings.length} South Florida Listings Found</span>
              <span>Click any card or pin to view details</span>
            </div>

            {filteredListings.length === 0 ? (
              <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <Search className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="text-base font-bold text-slate-200">No properties matched your search filters</div>
                <div className="text-xs text-slate-400">Try broadening your city selection, price range, or reset filters.</div>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-cyan-600 text-slate-950 font-bold text-xs rounded-xl"
                >
                  Reset Search Criteria
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredListings.map((item) => (
                  <PropertyCard
                    key={item.id}
                    listing={item}
                    isSaved={savedIds.includes(item.id)}
                    onToggleSave={onToggleSave}
                    onViewDetails={onViewDetails}
                    onScheduleTour={onScheduleTour}
                    isSelected={selectedListing?.id === item.id}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {viewMode === 'map' && (
        <div className="w-full h-[650px]">
          <InteractiveMap
            listings={filteredListings}
            selectedListing={selectedListing}
            onSelectListing={(item) => setSelectedListing(item)}
            onViewDetails={onViewDetails}
            onScheduleTour={onScheduleTour}
          />
        </div>
      )}

      {viewMode === 'grid' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400 font-semibold px-1">
            Displaying {filteredListings.length} Active Properties
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredListings.map((item) => (
              <PropertyCard
                key={item.id}
                listing={item}
                isSaved={savedIds.includes(item.id)}
                onToggleSave={onToggleSave}
                onViewDetails={onViewDetails}
                onScheduleTour={onScheduleTour}
                isSelected={selectedListing?.id === item.id}
              />
            ))}
          </div>
        </div>
      )}

    </section>
  );
};
