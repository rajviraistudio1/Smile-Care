import React, { useState } from 'react';
import { 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Info, 
  Stethoscope, 
  Filter
} from 'lucide-react';
import { PageId, Treatment } from '../../types';
import { TREATMENTS, CLINIC_INFO } from '../../data/clinicData';
import { TreatmentModal } from '../TreatmentModal';

interface TreatmentsPageProps {
  onNavigate: (page: PageId, treatmentName?: string) => void;
  selectedTreatmentId?: string;
}

export const TreatmentsPage: React.FC<TreatmentsPageProps> = ({ onNavigate, selectedTreatmentId }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalTreatment, setActiveModalTreatment] = useState<Treatment | null>(() => {
    if (selectedTreatmentId) {
      return TREATMENTS.find(t => t.id === selectedTreatmentId) || null;
    }
    return null;
  });

  const categories = ['All', 'Preventive', 'Restorative', 'Cosmetic', 'Specialty'];

  const filteredTreatments = selectedCategory === 'All' 
    ? TREATMENTS 
    : TREATMENTS.filter(t => t.category === selectedCategory);

  const handleBookTreatment = (treatmentName: string) => {
    onNavigate('appointment', treatmentName);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-teal-50/80 via-slate-50 to-slate-50 pt-12 pb-16 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-xs sm:text-sm font-semibold border border-teal-200/70">
            <Stethoscope className="w-4 h-4 text-teal-600" />
            <span>Comprehensive Multi-Specialty Dental Care</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            Our Dental Treatments
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From routine preventive checkups to complex aesthetic smile makeovers and titanium implants, explore our full spectrum of specialized dental services in Bengaluru.
          </p>
        </div>
      </section>

      {/* 2. Category Filter & Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat === 'All' ? 'All Treatments (8)' : cat}
            </button>
          ))}
        </div>

        {/* 8 Treatments Grid / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              id={`treatment-card-${treatment.id}`}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col group"
            >
              {/* Image Banner */}
              <div className="h-60 overflow-hidden relative bg-slate-100">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-xs text-slate-800 text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
                    {treatment.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold font-display leading-tight drop-shadow-xs">
                    {treatment.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                
                {/* Short Description & Brief Explanation */}
                <div className="space-y-4">
                  <p className="text-slate-800 font-medium text-sm leading-relaxed">
                    {treatment.shortDescription}
                  </p>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-teal-600" />
                      Clinical Explanation
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {treatment.fullDescription}
                    </p>
                  </div>

                  {/* Key Benefits snippet */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Why Choose This Treatment
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {treatment.keyBenefits.slice(0, 3).map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Duration & CTAs */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Duration: <strong className="text-slate-800">{treatment.duration}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalTreatment(treatment)}
                      className="px-4 py-2.5 rounded-xl text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer border border-slate-200"
                    >
                      More Details
                    </button>

                    <button
                      id={`book-treatment-${treatment.id}`}
                      onClick={() => handleBookTreatment(treatment.name)}
                      className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Appointment</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Hygiene & Technology Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold">Hospital-Grade Sterilization</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Every instrument undergoes 5-step ultrasonic cleaning and Class-B vacuum autoclave pouching.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold">Pain-Managed Protocols</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Computer-assisted local anesthesia delivery ensures numb, comfortable, and fear-free procedures.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold">Transparent Estimates</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Complete cost transparency with itemized treatment plans before any procedure begins.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Have Questions CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-teal-50/70 border border-teal-100 rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-slate-900 font-display">
            Not sure which treatment is right for your symptoms?
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">
            Book a comprehensive 30-minute consultation with our specialist doctors. We will examine your teeth and create a personalized plan.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('appointment')}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Book General Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Treatment Modal */}
      <TreatmentModal
        treatment={activeModalTreatment}
        onClose={() => setActiveModalTreatment(null)}
        onBook={handleBookTreatment}
      />
    </div>
  );
};
