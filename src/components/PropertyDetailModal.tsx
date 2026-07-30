import React, { useState } from 'react';
import { PropertyListing } from '../types';
import { X, Heart, Bed, Bath, Square, Waves, MapPin, Calendar, Calculator, ShieldCheck, Phone, Mail, CheckCircle2, ChevronLeft, ChevronRight, Share2, Compass } from 'lucide-react';
import konradHeadshot from '../assets/images/konrad_headshot_1785287220015.jpg';

interface PropertyDetailModalProps {
  listing: PropertyListing | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onScheduleTour: (listing: PropertyListing) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  listing,
  onClose,
  isSaved,
  onToggleSave,
  onScheduleTour
}) => {
  if (!listing) return null;

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  
  // Mortgage Estimator State
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);

  // Mortgage calculations
  const principalAmount = listing.price * (1 - downPaymentPercent / 100);
  const monthlyInterestRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  const monthlyPrincipalAndInterest =
    monthlyInterestRate > 0
      ? (principalAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments))) /
        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1)
      : principalAmount / totalPayments;

  const estimatedPropertyTax = (listing.price * 0.012) / 12; // ~1.2% FL Tax
  const estimatedInsurance = (listing.price * 0.006) / 12; // ~0.6% Insurance
  const totalMonthlyCost = monthlyPrincipalAndInterest + estimatedPropertyTax + estimatedInsurance + listing.hoaFeePerMonth;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl glass-modal rounded-3xl overflow-hidden shadow-2xl my-8 text-slate-100 max-h-[90vh] flex flex-col border border-white/20">
        
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold">
              MLS #{listing.mlsNumber}
            </span>
            <span className="text-xs text-slate-300 font-medium">
              Beachfront Realty • Konrad Schultz
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(listing.id)}
              className="p-2 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/20 transition-all cursor-pointer"
              title={isSaved ? 'Remove from Saved' : 'Save Property'}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'text-rose-500 fill-rose-500' : 'text-slate-300'}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 border border-white/15 text-slate-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          
          {/* Photo Gallery Viewer */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
              <img
                src={listing.images[selectedImgIndex]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
              {listing.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImgIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-950 border border-white/20 backdrop-blur-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImgIndex((prev) => (prev + 1) % listing.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-950 border border-white/20 backdrop-blur-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Selector Strip */}
            {listing.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {listing.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      selectedImgIndex === idx ? 'border-cyan-400 ring-2 ring-cyan-400/30' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Price Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white mb-2">
                {listing.title}
              </h1>
              <div className="text-slate-300 text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>{listing.address}, {listing.city}, FL {listing.zip} ({listing.neighborhood})</span>
              </div>
            </div>

            <div className="text-left md:text-right">
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
                ${listing.price.toLocaleString()}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-1">
                ${listing.pricePerSqft}/sqft • HOA: ${listing.hoaFeePerMonth}/mo
              </div>
            </div>
          </div>

          {/* Key Property Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-6 rounded-2xl glass-input text-center">
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Bedrooms</div>
              <div className="text-xl font-bold text-cyan-400 mt-1 flex items-center justify-center gap-1">
                <Bed className="w-5 h-5" />
                {listing.bedrooms}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Bathrooms</div>
              <div className="text-xl font-bold text-cyan-400 mt-1 flex items-center justify-center gap-1">
                <Bath className="w-5 h-5" />
                {listing.bathrooms}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Living Area</div>
              <div className="text-xl font-bold text-cyan-400 mt-1 flex items-center justify-center gap-1">
                <Square className="w-5 h-5" />
                {listing.sqft.toLocaleString()} sqft
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Year Built</div>
              <div className="text-xl font-bold text-white mt-1">
                {listing.yearBuilt}
              </div>
            </div>
          </div>

          {/* Property Description */}
          <div>
            <h2 className="text-lg font-bold text-white font-serif mb-3">About This Property</h2>
            <p className="text-slate-200 leading-relaxed font-light text-sm sm:text-base">
              {listing.description}
            </p>
          </div>

          {/* Amenities & Features Badges */}
          <div>
            <h2 className="text-lg font-bold text-white font-serif mb-3">Amenities & Luxury Highlights</h2>
            <div className="flex flex-wrap gap-2">
              {listing.amenities.map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl glass-badge text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Mortgage & Monthly Cost Calculator */}
          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white font-serif">Estimated Monthly Ownership Cost</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Controls */}
              <div className="space-y-4 md:col-span-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1">
                    <span>Down Payment ({downPaymentPercent}%)</span>
                    <span>${((listing.price * downPaymentPercent) / 100).toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-900 rounded-lg h-2 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full glass-input rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1">Loan Term</label>
                    <select
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(Number(e.target.value))}
                      className="w-full glass-input rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                    >
                      <option value={30} className="bg-slate-900 text-white">30-Year Fixed</option>
                      <option value={15} className="bg-slate-900 text-white">15-Year Fixed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Monthly Cost Breakdown */}
              <div className="glass-card p-4 rounded-xl space-y-2 text-xs">
                <div className="text-slate-300 font-semibold">Total Estimated Payment</div>
                <div className="text-2xl font-extrabold text-cyan-400 font-serif">
                  ${Math.round(totalMonthlyCost).toLocaleString()}<span className="text-xs text-slate-400 font-normal">/mo</span>
                </div>
                <div className="pt-2 border-t border-white/10 space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span>Principal & Interest:</span>
                    <span className="font-semibold">${Math.round(monthlyPrincipalAndInterest).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HOA Dues:</span>
                    <span className="font-semibold">${listing.hoaFeePerMonth.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Property Tax:</span>
                    <span className="font-semibold">${Math.round(estimatedPropertyTax).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Insurance:</span>
                    <span className="font-semibold">${Math.round(estimatedInsurance).toLocaleString()}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Direct Agent Contact & Schedule Box */}
          <div className="p-6 rounded-2xl glass-panel flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <img
                src={konradHeadshot}
                alt="Konrad Schultz"
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-2xl object-cover border border-cyan-400/40 shadow-md shrink-0 hidden sm:block"
              />
              <div className="space-y-1">
                <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                  Exclusively Represented By Konrad Schultz
                </div>
                <div className="text-xl font-bold text-white font-serif">
                  Interested in viewing {listing.title}?
                </div>
                <div className="text-xs text-slate-300">
                  Contact Realtor® Konrad Schultz (Lic # 3188541) at Beachfront Realty for a private showing.
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href="tel:9542975559"
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer backdrop-blur-md"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                Call 954-297-5559
              </a>
              <button
                onClick={() => {
                  onClose();
                  onScheduleTour(listing);
                }}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-cyan-300/40"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                Schedule Private Tour
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
