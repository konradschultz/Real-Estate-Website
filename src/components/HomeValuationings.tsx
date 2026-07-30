import React, { useState } from 'react';
import { ValuationFormState, ValuationResult } from '../types';
import { Home, Calculator, Sparkles, CheckCircle2, MapPin, Building, ArrowRight, ShieldCheck, Phone, Mail, Award, Clock } from 'lucide-react';

interface HomeValuationingsProps {
  onScheduleConsultation: () => void;
}

export const HomeValuationings: React.FC<HomeValuationingsProps> = ({ onScheduleConsultation }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ValuationFormState>({
    address: '',
    city: 'Aventura',
    zip: '33180',
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1850,
    propertyType: 'Condo',
    condition: 'renovated',
    hasPool: true,
    isWaterfront: true,
    name: '',
    email: '',
    phone: ''
  });

  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.address) return;
    setStep(2);
  };

  const handleCalculateValuation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setValuationResult(data);
        setStep(3);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Title Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          AI Home Valuation & Seller Advisory
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white">
          What Is Your South Florida Property Worth?
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light">
          Get an immediate AI-driven home valuation estimate backed by recent South Florida closed sales, local market indices, and Konrad Schultz's expert advisory.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 max-w-md mx-auto text-xs font-semibold">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${step >= 1 ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
          <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">1</span>
          <span>Address</span>
        </div>
        <div className="w-6 h-[1px] bg-slate-800"></div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${step >= 2 ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
          <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">2</span>
          <span>Property Specs</span>
        </div>
        <div className="w-6 h-[1px] bg-slate-800"></div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${step === 3 ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' : 'bg-slate-900 text-slate-500 border-slate-800'}`}>
          <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">3</span>
          <span>Valuation</span>
        </div>
      </div>

      {/* Form Card Container */}
      <div className="glass-modal rounded-3xl p-6 sm:p-10 shadow-2xl">
        
        {step === 1 && (
          <form onSubmit={handleNextStep1} className="space-y-6 max-w-xl mx-auto">
            <h2 className="text-xl font-bold font-serif text-white text-center">Step 1: Enter Your Property Address</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-1.5">
                  Street Address
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 18555 Collins Ave #2104"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full glass-input rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-1.5">
                    City
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full glass-input rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
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

                <div>
                  <label className="block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-1.5">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="33180"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full glass-input rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-cyan-300/80 uppercase tracking-wider mb-1.5">
                  Property Type
                </label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full glass-input rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="Condo" className="bg-slate-900 text-white">Condo / High-Rise</option>
                  <option value="Penthouse" className="bg-slate-900 text-white">Penthouse</option>
                  <option value="Single Family" className="bg-slate-900 text-white">Single Family Home</option>
                  <option value="Waterfront Villa" className="bg-slate-900 text-white">Waterfront Villa / Estate</option>
                  <option value="Townhouse" className="bg-slate-900 text-white">Townhouse</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-lg border border-cyan-300/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Continue to Property Details
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCalculateValuation} className="space-y-6 max-w-xl mx-auto">
            <h2 className="text-xl font-bold font-serif text-white text-center">Step 2: Key Property Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Bedrooms
                </label>
                <input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Bathrooms
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Square Footage (SqFt)
                </label>
                <input
                  type="number"
                  value={formData.sqft}
                  onChange={(e) => setFormData({ ...formData, sqft: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Overall Condition
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="luxurious">Luxurious / Fully Upgraded</option>
                  <option value="renovated">Renovated / Good Condition</option>
                  <option value="standard">Standard / Original</option>
                  <option value="needs-work">Needs Renovation</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center gap-2 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasPool}
                  onChange={(e) => setFormData({ ...formData, hasPool: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
                />
                <span>Private or Resort Pool</span>
              </label>

              <label className="flex items-center gap-2 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isWaterfront}
                  onChange={(e) => setFormData({ ...formData, isWaterfront: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
                />
                <span>Direct Waterfront / Ocean</span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-semibold text-sm hover:bg-slate-800 transition-all cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-lg hover:from-emerald-400 hover:to-teal-500 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Calculating...' : 'Generate Instant Valuation'}
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {step === 3 && valuationResult && (
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                Valuation Report for {formData.address}, {formData.city}
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white font-serif">
                ${valuationResult.estimatedValue.toLocaleString()}
              </div>
              <div className="text-sm text-slate-400">
                Estimated Market Range: <span className="text-emerald-400 font-semibold">${valuationResult.lowEstimate.toLocaleString()}</span> — <span className="text-emerald-400 font-semibold">${valuationResult.highEstimate.toLocaleString()}</span>
              </div>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs">
              <div>
                <div className="text-slate-400">Est. Price / SqFt</div>
                <div className="text-lg font-bold text-cyan-400 mt-1">${valuationResult.pricePerSqft}/sqft</div>
              </div>
              <div>
                <div className="text-slate-400">Recent Comps</div>
                <div className="text-lg font-bold text-white mt-1">{valuationResult.comparablesCount} Sales</div>
              </div>
              <div>
                <div className="text-slate-400">Confidence Index</div>
                <div className="text-lg font-bold text-emerald-400 mt-1">94% High</div>
              </div>
            </div>

            {/* Professional Advisory Lead Capture Card */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-4">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white font-serif">
                    Request Certified Comprehensive Market Analysis (CMA)
                  </div>
                  <div className="text-xs text-slate-400">
                    Konrad Schultz will perform a manual walkthrough analysis to refine this algorithm estimate for your exact unit view, upgrades, and market timing.
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onScheduleConsultation}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  Schedule Seller Consultation with Konrad
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-850 cursor-pointer"
                >
                  Evaluate Another Home
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Selling Process Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold">1</div>
          <h3 className="text-base font-bold text-white font-serif">Data-Driven Pricing Strategy</h3>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            We leverage hyper-local South Florida MLS sale records, pending contract metrics, and buyer demand trends to price your property for top market value.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold">2</div>
          <h3 className="text-base font-bold text-white font-serif">Luxury Media & 3D Tours</h3>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            High-definition drone footage, twilight photography, virtual floorplans, and targeted digital campaigns reaching high-net-worth buyers in NYC, LA, and South America.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold">3</div>
          <h3 className="text-base font-bold text-white font-serif">Bilingual Expert Negotiation</h3>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Konrad Schultz provides end-to-end contract protection, escrow coordination, inspection management, and smooth closing with Beachfront Realty.
          </p>
        </div>
      </div>

    </section>
  );
};
