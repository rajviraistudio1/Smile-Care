import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  Award, 
  Sparkles,
  Heart
} from 'lucide-react';
import { PageId } from '../types';
import { CLINIC_INFO, TREATMENTS } from '../data/clinicData';

interface FooterProps {
  onNavigate: (page: PageId, treatmentId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId, treatmentId?: string) => {
    onNavigate(page, treatmentId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Emergency & Quick Helpline Banner */}
      <div className="bg-gradient-to-r from-teal-900/60 via-slate-900 to-teal-950 border-b border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 shrink-0 border border-teal-500/30">
              <Phone className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base md:text-lg">
                Dental Emergency in Bengaluru?
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm">
                Same-day emergency pain relief slots available. Call our helpline immediately.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${CLINIC_INFO.phoneMobile}`}
              id="footer-emergency-call"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-teal-600/30 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call {CLINIC_INFO.phoneMobile}</span>
            </a>
            <button
              onClick={() => handleNav('appointment')}
              id="footer-emergency-book"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-4 py-2.5 rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              Book Priority Slot
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.5 2 7 4.5 7 7c0 2 .5 4 1 6 .5 2 .5 5 1.5 7 .5 1 1.5 2 2.5 2s1.5-1 2-2.5c.5-1.5.5-2.5 1-2.5s.5 1 1 2.5c.5 1.5 1 2.5 2 2.5s2-1 2.5-2c1-2 1-5 1.5-7 .5-2 1-4 1-6 0-2.5-1.5-5-5-5-1.5 0-2.5 1-3.5 1S13.5 2 12 2z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight font-display">
                Smile<span className="text-teal-400">Care</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {CLINIC_INFO.tagline}
              <br />
              {CLINIC_INFO.shortDescription}
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                Hospital-Grade Hygiene
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs border border-slate-700">
                <Award className="w-3.5 h-3.5 text-teal-400" />
                14+ Years in Bengaluru
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleNav('home')} 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('about')} 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  About Us & Team
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('treatments')} 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  Dental Treatments
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('appointment')} 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  Book Appointment
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('faq')} 
                  className="hover:text-teal-400 transition-colors flex items-center gap-1.5 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-teal-500" />
                  Patient FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Treatments */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Treatments
            </h4>
            <ul className="space-y-2.5 text-sm">
              {TREATMENTS.slice(0, 5).map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => handleNav('treatments', t.id)}
                    className="hover:text-teal-400 transition-colors text-slate-400 flex items-center gap-1.5 text-left hover:translate-x-0.5 transform duration-150"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    <span className="truncate">{t.name}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('treatments')}
                  className="text-teal-400 hover:text-teal-300 text-xs font-semibold flex items-center gap-1 pt-1"
                >
                  <span>View All 8 Treatments</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Clinic & Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-200 font-medium">{CLINIC_INFO.address.line1}</p>
                  <p>{CLINIC_INFO.address.line2}</p>
                  <p>{CLINIC_INFO.address.city}, {CLINIC_INFO.address.state} {CLINIC_INFO.address.pincode}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${CLINIC_INFO.phoneMobile}`} className="hover:text-teal-300 font-medium text-slate-200">
                  {CLINIC_INFO.phoneMobile}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-teal-300 text-slate-300 break-all">
                  {CLINIC_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1 border-t border-slate-800">
                <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <p className="text-slate-300 font-medium">Mon – Sat: 9:00 AM – 8:00 PM</p>
                  <p className="text-slate-400">Sun: 10:00 AM – 2:00 PM (By Appt)</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Location Tag */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Serving patients across Indiranagar, Koramangala, Whitefield & Bengaluru</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
