import React, { useState } from 'react';
import { ConsultationRequest, PropertyListing } from '../types';
import { X, Calendar, Clock, CheckCircle2, Phone, Mail, User, ShieldCheck, MapPin } from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedListing?: PropertyListing | null;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  preselectedListing
}) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recapData, setRecapData] = useState<any>(null);

  const [formData, setFormData] = useState<ConsultationRequest>({
    name: '',
    email: '',
    phone: '',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '10:00 AM',
    type: preselectedListing ? 'Property Showing Tour' : 'In-Person Consultation',
    notes: preselectedListing ? `Interested in viewing ${preselectedListing.title} (${preselectedListing.address})` : ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/schedule-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setRecapData(data);
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in text-slate-100">
      <div className="relative w-full max-w-lg glass-modal rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6 border border-white/20">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              Schedule Showing or Consultation
            </h2>
            <div className="text-xs text-slate-300">
              Konrad Schultz, Realtor® • Beachfront Realty (Lic # 3188541)
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 border border-white/15 text-slate-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted && recapData ? (
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-bold font-serif text-white">Showing Request Confirmed!</h3>
            <p className="text-xs text-slate-200 leading-relaxed max-w-sm mx-auto">
              {recapData.message}
            </p>

            <div className="p-4 rounded-2xl glass-input text-left text-xs space-y-2">
              <div className="font-bold text-cyan-300 border-b border-white/10 pb-1">
                Confirmation ID: {recapData.confirmationId}
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Date & Time:</span>
                <span className="text-white font-medium">{formData.date} at {formData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Consultation Type:</span>
                <span className="text-white font-medium">{formData.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Realtor:</span>
                <span className="text-white font-medium">Konrad Schultz (954-297-5559)</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer border border-cyan-300/40"
            >
              Close Confirmation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {preselectedListing && (
              <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 text-xs space-y-1 backdrop-blur-md">
                <div className="font-bold text-cyan-300">Selected Property Showing:</div>
                <div className="text-white font-medium">{preselectedListing.title}</div>
                <div className="text-slate-300">${preselectedListing.price.toLocaleString()} • {preselectedListing.city}</div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Jonathan Miller"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="954-297-5559"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="jonathan@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">Preferred Time</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  <option value="09:00 AM" className="bg-slate-900 text-white">09:00 AM</option>
                  <option value="11:00 AM" className="bg-slate-900 text-white">11:00 AM</option>
                  <option value="02:00 PM" className="bg-slate-900 text-white">02:00 PM</option>
                  <option value="04:00 PM" className="bg-slate-900 text-white">04:00 PM</option>
                  <option value="06:00 PM" className="bg-slate-900 text-white">06:00 PM Sunset Showing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">Consultation Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="Property Showing Tour" className="bg-slate-900 text-white">In-Person Property Showing</option>
                <option value="In-Person Consultation" className="bg-slate-900 text-white">In-Person Buyer / Seller Advisory</option>
                <option value="Virtual Video Call" className="bg-slate-900 text-white">Virtual Video Call (Zoom/FaceTime)</option>
                <option value="Home Valuation CMA" className="bg-slate-900 text-white">Home Valuation CMA Review</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">Additional Notes (Optional)</label>
              <textarea
                rows={2}
                placeholder="Any special requests, pre-approval details, or specific questions..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full glass-input rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer border border-cyan-300/40"
            >
              {loading ? 'Submitting Request...' : 'Confirm Appointment Request'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
