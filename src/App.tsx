import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { TreatmentsPage } from './components/pages/TreatmentsPage';
import { AppointmentPage } from './components/pages/AppointmentPage';
import { FAQPage } from './components/pages/FAQPage';
import { AdminPage } from './components/pages/AdminPage';
import { Calendar, Phone } from 'lucide-react';
import { CLINIC_INFO } from './data/clinicData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    // Check initial URL hash or pathname for /admin or #admin
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path === '/admin' || hash === '#admin') {
      return 'admin';
    }
    return 'home';
  });

  const [selectedTreatment, setSelectedTreatment] = useState<string>('');

  // Handle browser back/forward or hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin') {
        setCurrentPage('admin');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId, treatmentNameOrId?: string) => {
    setCurrentPage(page);
    if (page === 'admin') {
      window.location.hash = 'admin';
    } else if (window.location.hash === '#admin') {
      history.pushState(null, '', window.location.pathname);
    }

    if (page === 'appointment' && treatmentNameOrId) {
      setSelectedTreatment(treatmentNameOrId);
    } else if (page === 'treatments' && treatmentNameOrId) {
      setSelectedTreatment(treatmentNameOrId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminView = currentPage === 'admin';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Hide regular public navigation if inside admin page for a dedicated admin experience */}
      {!isAdminView && (
        <Navbar 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
        />
      )}

      {/* Main Page Content Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}
        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'treatments' && (
          <TreatmentsPage 
            onNavigate={handleNavigate} 
            selectedTreatmentId={selectedTreatment}
          />
        )}
        {currentPage === 'appointment' && (
          <AppointmentPage 
            initialTreatment={selectedTreatment} 
            onNavigate={handleNavigate} 
          />
        )}
        {currentPage === 'faq' && (
          <FAQPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'admin' && (
          <AdminPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Floating Quick Action Widget for Instant Appointment Booking / Call on Mobile */}
      {!isAdminView && (
        <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5">
          <a
            href={`tel:${CLINIC_INFO.phoneMobile}`}
            className="w-12 h-12 rounded-full bg-slate-900 text-teal-400 hover:bg-slate-800 shadow-xl border border-slate-700 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            aria-label="Call clinic helpline"
            title="Call clinic helpline"
            id="floating-call-btn"
          >
            <Phone className="w-5 h-5" />
          </a>

          {currentPage !== 'appointment' && (
            <button
              onClick={() => handleNavigate('appointment')}
              id="floating-book-btn"
              className="hidden sm:inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-full shadow-xl shadow-teal-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-teal-500"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      {!isAdminView && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}


