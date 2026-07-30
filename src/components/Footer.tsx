import React from 'react';
import { Compass, Award, MapPin, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: 'home' | 'listings' | 'valuation' | 'communities' | 'market' | 'about' | 'favorites') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-slate-950/90 backdrop-blur-md border-t border-white/10 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        
        {/* Brand & Brokerage Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Compass className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="text-base font-bold text-white font-serif">KONRAD SCHULTZ</div>
              <div className="text-[10px] text-cyan-300 font-semibold tracking-widest uppercase">Beachfront Realty</div>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-light leading-relaxed">
            South Florida real estate advisory driven by local market intelligence, custom AI valuation tools, and personalized client advocacy.
          </p>

          <div className="text-xs space-y-1.5 text-slate-200">
            <div className="flex items-center gap-2 font-semibold text-cyan-300">
              <Award className="w-4 h-4 shrink-0" />
              <span>License # 3188541 • Board of Realtors Miami</span>
            </div>
          </div>
        </div>

        {/* Contact & Office Address */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">Aventura Office</h4>
          <div className="text-xs space-y-2">
            <div className="flex items-start gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Beachfront Realty<br />20803 Biscayne Blvd, Suite 102<br />Aventura, FL 33180</span>
            </div>
            <a href="tel:9542975559" className="flex items-center gap-2 text-slate-200 hover:text-cyan-300 transition-colors">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>954-297-5559</span>
            </a>
            <a href="mailto:KonradSchultz001@mymdc.net" className="flex items-center gap-2 text-slate-200 hover:text-cyan-300 transition-colors">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>KonradSchultz001@mymdc.net</span>
            </a>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">Quick Links</h4>
          <ul className="text-xs space-y-2">
            <li>
              <button onClick={() => onNavClick('listings')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                Active Listings & Map Search
              </button>
            </li>
            <li>
              <button onClick={() => onNavClick('valuation')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                Instant Home Valuation
              </button>
            </li>
            <li>
              <button onClick={() => onNavClick('communities')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                South Florida Neighborhoods
              </button>
            </li>
            <li>
              <button onClick={() => onNavClick('market')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                Market Trends & Investor ROI
              </button>
            </li>
            <li>
              <button onClick={() => onNavClick('about')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                About Konrad Schultz, Realtor®
              </button>
            </li>
          </ul>
        </div>

        {/* Communities Covered */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider font-serif">Areas Served</h4>
          <div className="text-xs space-y-1 text-slate-300">
            <div>• Aventura & ParkSquare</div>
            <div>• Sunny Isles Beach & Ocean Drive</div>
            <div>• Bal Harbour & Bay Harbor Islands</div>
            <div>• Brickell & Downtown Miami</div>
            <div>• Fort Lauderdale & Las Olas Canals</div>
            <div>• Hollywood & Hallandale Beach</div>
            <div>• Boca Raton & Highland Beach</div>
          </div>
        </div>

      </div>

      {/* Bottom Equal Housing Disclaimer */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-[11px] text-slate-400">
        <div>
          © {new Date().getFullYear()} Konrad Schultz, Realtor®. All Rights Reserved. Beachfront Realty, Inc. License # 3188541.
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Equal Housing Opportunity
          </span>
          <span>•</span>
          <span>MLS IDX Data Provider</span>
        </div>
      </div>
    </footer>
  );
};
