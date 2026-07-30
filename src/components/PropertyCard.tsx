import React, { useState } from 'react';
import { PropertyListing } from '../types';
import { Heart, Bed, Bath, Square, Waves, MapPin, Calendar, Sparkles, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface PropertyCardProps {
  listing: PropertyListing;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onViewDetails: (listing: PropertyListing) => void;
  onScheduleTour: (listing: PropertyListing) => void;
  isSelected?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  listing,
  isSaved,
  onToggleSave,
  onViewDetails,
  onScheduleTour,
  isSelected
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  return (
    <div
      onClick={() => onViewDetails(listing)}
      className={`group relative glass-card glass-card-hover rounded-2xl overflow-hidden cursor-pointer ${
        isSelected
          ? 'border-cyan-400/80 ring-2 ring-cyan-400/30 bg-slate-900/80'
          : ''
      }`}
    >
      {/* Image Carousel & Badge Area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={listing.images[activeImageIndex]}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Carousel Image Controls */}
        {listing.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-950 hover:scale-110"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/70 text-white backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-950 hover:scale-110"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {listing.isWaterfront && (
            <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1 shadow-lg">
              <Waves className="w-3 h-3 text-cyan-400" />
              Waterfront
            </span>
          )}
          {listing.isFeatured && (
            <span className="px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-1 shadow-lg">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Featured
            </span>
          )}
          {listing.isPriceReduced && (
            <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
              Price Reduced
            </span>
          )}
        </div>

        {/* Favorite Save Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(listing.id);
          }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-slate-900 transition-all hover:scale-110"
          title={isSaved ? 'Remove from Saved' : 'Save Property'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`} />
        </button>

        {/* Image Indicator Dots */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
            {listing.images.map((_, idx) => (
              <span
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === activeImageIndex ? 'bg-cyan-400 w-3' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Property Details Body */}
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <div className="text-2xl font-extrabold text-white font-serif tracking-tight">
            ${listing.price.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 font-medium">
            ${listing.pricePerSqft}/sqft
          </div>
        </div>

        <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1">
          {listing.title}
        </h3>

        <div className="text-xs text-slate-400 flex items-center gap-1 mb-4">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="truncate">{listing.address}, {listing.city}, FL</span>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl glass-input text-xs text-slate-300 font-medium mb-4">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-cyan-400" />
            <span>{listing.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-cyan-400" />
            <span>{listing.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="w-4 h-4 text-cyan-400" />
            <span>{listing.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Card CTA Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(listing);
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 text-slate-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onScheduleTour(listing);
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500/90 to-blue-600/90 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer border border-cyan-300/30"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-950" />
            Schedule Tour
          </button>
        </div>
      </div>
    </div>
  );
};
