import React, { useState } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Calendar, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { PageId } from '../types';
import { CLINIC_INFO } from '../data/clinicData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'treatments', label: 'Treatments' },
    { id: 'appointment', label: 'Appointment' },
    { id: 'faq', label: 'FAQ' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top Notification / Contact Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-5 flex-wrap gap-y-1">
            <a 
              href={`tel:${CLINIC_INFO.phoneMobile}`} 
              className="flex items-center gap-1.5 hover:text-teal-300 transition-colors font-medium"
              id="topbar-phone-link"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>{CLINIC_INFO.phoneMobile}</span>
              <span className="text-slate-500 hidden sm:inline">|</span>
              <span className="text-slate-400 hidden sm:inline">{CLINIC_INFO.phonePrimary}</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>100 Feet Road, Indiranagar, Bengaluru</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>Mon – Sat: 9:00 AM – 8:00 PM</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 text-[11px] font-medium border border-teal-500/30">
              <ShieldCheck className="w-3 h-3" />
              100% Sterile Protocol
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1"
            id="nav-logo-btn"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              {/* Tooth icon badge */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C8.5 2 7 4.5 7 7c0 2 .5 4 1 6 .5 2 .5 5 1.5 7 .5 1 1.5 2 2.5 2s1.5-1 2-2.5c.5-1.5.5-2.5 1-2.5s.5 1 1 2.5c.5 1.5 1 2.5 2 2.5s2-1 2.5-2c1-2 1-5 1.5-7 .5-2 1-4 1-6 0-2.5-1.5-5-5-5-1.5 0-2.5 1-3.5 1S13.5 2 12 2z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
                  Smile<span className="text-teal-600">Care</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded border border-teal-200/60 ml-1">
                  Dental
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-normal flex items-center gap-1">
                <span>Indiranagar, Bengaluru</span>
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all relative cursor-pointer ${
                    isActive 
                      ? 'text-teal-700 bg-teal-50/80 shadow-xs' 
                      : 'text-slate-600 hover:text-teal-600 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-teal-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-book-appointment-btn"
              onClick={() => handleNavClick('appointment')}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md shadow-teal-600/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('appointment')}
              className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs"
              id="mobile-nav-quick-book"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between transition-colors ${
                    isActive 
                      ? 'bg-teal-50 text-teal-700' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <button
              id="mobile-menu-book-cta"
              onClick={() => handleNavClick('appointment')}
              className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-5 h-5" />
              Book an Appointment
            </button>
            
            <div className="bg-slate-50 p-3 rounded-xl text-xs text-slate-600 space-y-1.5 border border-slate-200/60">
              <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                Bengaluru Location
              </p>
              <p className="pl-5 text-slate-600">
                100 Feet Rd, Indiranagar, Bengaluru 560038
              </p>
              <p className="pl-5 text-teal-700 font-semibold">
                Call: {CLINIC_INFO.phoneMobile}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
