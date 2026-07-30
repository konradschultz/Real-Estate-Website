import React from 'react';
import { COMMUNITIES } from '../data/communitiesData';
import { MapPin, ArrowRight, Building, DollarSign, Compass } from 'lucide-react';

interface CommunitiesSectionProps {
  onSelectCommunity: (city: string) => void;
}

export const CommunitiesSection: React.FC<CommunitiesSectionProps> = ({ onSelectCommunity }) => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          South Florida Neighborhood Guides
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white">
          Explore Featured Communities
        </h1>
        <p className="text-slate-300 text-sm sm:text-base font-light">
          Sell the lifestyle, not just houses. Discover South Florida's most coveted coastal enclaves, golf sanctuaries, and oceanfront towers.
        </p>
      </div>

      {/* Grid of Community Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMMUNITIES.map((community) => (
          <div
            key={community.id}
            onClick={() => onSelectCommunity(community.name)}
            className="group relative glass-card glass-card-hover rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            {/* Image Banner */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
              <img
                src={community.image}
                alt={community.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute top-3 left-3 glass-badge px-3 py-1 rounded-full text-[10px] font-bold text-cyan-300">
                {community.activeCount} Active Listings
              </div>

              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-2xl font-bold font-serif text-white tracking-tight">
                  {community.name}
                </h3>
                <div className="text-xs text-cyan-300 font-medium">
                  {community.tagline}
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              
              <div className="space-y-3">
                {/* Specs Pill */}
                <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl glass-input text-slate-300 font-semibold">
                  <span>Avg Price: <strong className="text-white">{community.avgPrice}</strong></span>
                  <span><strong className="text-cyan-400">{community.pricePerSqft}</strong></span>
                </div>

                <p className="text-xs text-slate-300 font-light leading-relaxed line-clamp-3">
                  {community.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-1 pt-1">
                  {community.keyFeatures.slice(0, 3).map((feat, idx) => (
                    <div key={idx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCommunity(community.name);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/10 group-hover:bg-cyan-400 group-hover:text-slate-950 text-slate-200 border border-white/15 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Explore {community.name} Listings
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
