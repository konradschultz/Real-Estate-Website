import React, { useState } from 'react';
import { MARKET_STATS } from '../data/marketData';
import { BarChart2, TrendingUp, DollarSign, Calculator, Building, Compass, ArrowUpRight } from 'lucide-react';

export const MarketInsights: React.FC = () => {
  // Investor ROI Calculator State
  const [purchasePrice, setPurchasePrice] = useState(1200000);
  const [expectedMonthlyRent, setExpectedMonthlyRent] = useState(7500);
  const [annualHoaTaxesInsurance, setAnnualHoaTaxesInsurance] = useState(24000);
  const [downPaymentPct, setDownPaymentPct] = useState(25);

  // ROI calculations
  const grossAnnualRent = expectedMonthlyRent * 12;
  const netAnnualIncome = grossAnnualRent - annualHoaTaxesInsurance;
  const capRate = ((netAnnualIncome / purchasePrice) * 100).toFixed(2);
  const initialCashInvestment = purchasePrice * (downPaymentPct / 100);
  const cashOnCashReturn = ((netAnnualIncome / initialCashInvestment) * 100).toFixed(2);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
          South Florida Real Estate Intelligence
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white">
          Market Insights & Investor Analytics
        </h1>
        <p className="text-slate-300 text-sm sm:text-base font-light">
          Real-time metrics on median home prices, inventory velocity, price per square foot trends, and cap rates across Aventura, Sunny Isles, and Miami.
        </p>
      </div>

      {/* Market Stats Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MARKET_STATS.map((stat, idx) => (
          <div key={idx} className="p-6 rounded-3xl glass-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-serif text-white">{stat.city}</h3>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 backdrop-blur-md">
                <TrendingUp className="w-3 h-3" />
                +{stat.yearOverYearGrowth}% YoY
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-2xl glass-input">
                <div className="text-slate-400">Median Price</div>
                <div className="text-base font-bold text-white mt-0.5">${stat.medianPrice.toLocaleString()}</div>
              </div>
              <div className="p-3 rounded-2xl glass-input">
                <div className="text-slate-400">Avg Price/SqFt</div>
                <div className="text-base font-bold text-cyan-400 mt-0.5">${stat.avgPricePerSqft}/sqft</div>
              </div>
              <div className="p-3 rounded-2xl glass-input">
                <div className="text-slate-400">Avg Days on Market</div>
                <div className="text-base font-bold text-slate-200 mt-0.5">{stat.avgDaysOnMarket} Days</div>
              </div>
              <div className="p-3 rounded-2xl glass-input">
                <div className="text-slate-400">Active Inventory</div>
                <div className="text-base font-bold text-slate-200 mt-0.5">{stat.inventoryCount} Units</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Investor ROI & Cap Rate Calculator */}
      <div className="p-8 rounded-3xl glass-panel shadow-2xl space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/30 text-cyan-400 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-white">Interactive Real Estate ROI & Yield Calculator</h2>
              <p className="text-xs text-slate-300">Estimate rental returns, net cash flows, and cap rates for South Florida investment properties.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1.5">
                <span>Property Purchase Price</span>
                <span className="text-cyan-400 font-bold">${purchasePrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="400000"
                max="5000000"
                step="50000"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-900 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1.5">
                <span>Estimated Monthly Gross Rent</span>
                <span className="text-emerald-400 font-bold">${expectedMonthlyRent.toLocaleString()}/mo</span>
              </div>
              <input
                type="range"
                min="2500"
                max="25000"
                step="500"
                value={expectedMonthlyRent}
                onChange={(e) => setExpectedMonthlyRent(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-slate-900 rounded-lg h-2 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Annual Taxes + HOA + Insurance
                </label>
                <input
                  type="number"
                  step="1000"
                  value={annualHoaTaxesInsurance}
                  onChange={(e) => setAnnualHoaTaxesInsurance(Number(e.target.value))}
                  className="w-full glass-input rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                  Down Payment %
                </label>
                <select
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full glass-input rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value={20} className="bg-slate-900 text-white">20% Down</option>
                  <option value={25} className="bg-slate-900 text-white">25% Down</option>
                  <option value={30} className="bg-slate-900 text-white">30% Down</option>
                  <option value={100} className="bg-slate-900 text-white">100% Cash Purchase</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary Box (5 Cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl glass-card space-y-4">
            <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Investment Performance Summary</div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl glass-input">
                <div className="text-[11px] text-slate-400">Estimated Cap Rate</div>
                <div className="text-2xl font-bold text-emerald-400 font-serif mt-0.5">{capRate}%</div>
              </div>
              <div className="p-3 rounded-xl glass-input">
                <div className="text-[11px] text-slate-400">Cash-on-Cash Return</div>
                <div className="text-2xl font-bold text-cyan-400 font-serif mt-0.5">{cashOnCashReturn}%</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span>Gross Annual Income:</span>
                <span className="font-semibold">${grossAnnualRent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Net Annual NOI:</span>
                <span className="font-semibold text-emerald-400">${netAnnualIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Initial Down Payment:</span>
                <span className="font-semibold">${initialCashInvestment.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
