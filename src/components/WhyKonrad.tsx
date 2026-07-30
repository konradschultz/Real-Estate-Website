import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/marketData';
import { Award, ShieldCheck, MapPin, Phone, Mail, Star, Calendar, CheckCircle2, Building, Sparkles, UserCheck } from 'lucide-react';
import konradHeadshot from '../assets/images/konrad_headshot_1785287220015.jpg';

interface WhyKonradProps {
  onScheduleConsultation: () => void;
}

export const WhyKonrad: React.FC<WhyKonradProps> = ({ onScheduleConsultation }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactNotes, setContactNotes] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Realtor Biography & Credential Hero Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Agent Photo & Identity Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto lg:mx-0 rounded-3xl overflow-hidden border-2 border-cyan-400/40 shadow-2xl bg-slate-950">
              <img
                src={konradHeadshot}
                alt="Konrad Schultz, Realtor"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl font-bold font-serif text-white tracking-tight">
                Konrad Schultz
              </h1>
              <div className="text-sm font-semibold text-cyan-300">
                Realtor® | Beachfront Realty
              </div>
              <div className="text-xs text-slate-300 font-medium">
                Miami Board of Realtors • License # 3188541
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 pt-2">
              <a
                href="tel:9542975559"
                className="py-3 px-4 rounded-xl bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-900/90 font-bold text-xs flex items-center justify-center gap-2 transition-all backdrop-blur-md cursor-pointer"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call or Text: 954-297-5559</span>
              </a>
              <a
                href="mailto:KonradSchultz001@mymdc.net"
                className="py-3 px-4 rounded-xl bg-white/10 border border-white/15 text-slate-200 hover:text-white hover:bg-white/15 font-semibold text-xs flex items-center justify-center gap-2 transition-all backdrop-blur-md cursor-pointer"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>KonradSchultz001@mymdc.net</span>
              </a>
            </div>
          </div>

          {/* Bio & Value Proposition (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Technology-Forward South Florida Real Estate Advisor
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white leading-snug">
              "Combining local South Florida expertise with modern AI technology to help buyers, sellers, and investors make smarter decisions."
            </h2>

            <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed">
              Konrad Schultz represents a new generation of real estate advisory in South Florida. Based out of Beachfront Realty's premier Aventura office, Konrad merges hyper-local neighborhood market intelligence across Aventura, Sunny Isles, Bal Harbour, and Fort Lauderdale with advanced digital analytics to maximize client outcomes.
            </p>

            {/* Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-2xl glass-input space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Official License # 3188541
                </div>
                <p className="text-slate-300">Board of Realtors in Miami & Florida Realtors Association.</p>
              </div>

              <div className="p-3.5 rounded-2xl glass-input space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-cyan-400" />
                  Beachfront Realty Office
                </div>
                <p className="text-slate-300">20803 Biscayne Blvd, Suite 102, Aventura, FL 33180.</p>
              </div>

              <div className="p-3.5 rounded-2xl glass-input space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                  Buyer & Seller Representation
                </div>
                <p className="text-slate-300">Contract negotiations, CMA valuation, luxury staging & closing.</p>
              </div>

              <div className="p-3.5 rounded-2xl glass-input space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-cyan-400" />
                  100% Client Commitment
                </div>
                <p className="text-slate-300">Fast response times, transparent data, and white-glove service.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onScheduleConsultation}
                className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-cyan-300/40"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                Schedule Consultation With Konrad
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Verified Client Testimonials */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">Client Reviews & Testimonials</h2>
          <p className="text-xs sm:text-sm text-slate-300">Read what buyers, sellers, and investors say about working with Konrad Schultz.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="p-6 rounded-3xl glass-card space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-200 font-light italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <img src={t.photo} alt={t.clientName} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                <div>
                  <div className="text-sm font-bold text-white">{t.clientName}</div>
                  <div className="text-[11px] text-cyan-300 font-medium">{t.location} • {t.transactionType}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Contact & Lead Capture Form Section */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-serif text-white">Ready to Make Your South Florida Move?</h2>
          <p className="text-xs text-slate-300">Send Konrad Schultz a direct message or request a call back.</p>
        </div>

        {formSubmitted ? (
          <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-400/40 text-center space-y-3 backdrop-blur-md">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <div className="text-lg font-bold text-white">Message Received!</div>
            <p className="text-xs text-emerald-200">
              Thank you {contactName}! Konrad Schultz (Realtor® Lic # 3188541) will reach out to you shortly. You can also reach him immediately at 954-297-5559.
            </p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 954-555-0199"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="sarah@example.com"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">How can Konrad help you?</label>
              <textarea
                rows={3}
                placeholder="I am looking to buy a 3-bedroom condo in Sunny Isles Beach under $2M..."
                value={contactNotes}
                onChange={(e) => setContactNotes(e.target.value)}
                className="w-full glass-input rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer border border-cyan-300/40"
            >
              Send Message To Konrad Schultz
            </button>
          </form>
        )}
      </div>

    </section>
  );
};
