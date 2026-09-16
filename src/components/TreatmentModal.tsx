import React from 'react';
import { X, CheckCircle2, Clock, Calendar, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import { Treatment } from '../types';

interface TreatmentModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onBook: (treatmentName: string) => void;
}

export const TreatmentModal: React.FC<TreatmentModalProps> = ({ treatment, onClose, onBook }) => {
  if (!treatment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Image */}
        <div className="relative h-56 sm:h-64 bg-slate-100">
          <img
            src={treatment.image}
            alt={treatment.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-900/60 hover:bg-slate-900 text-white p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="bg-teal-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
              {treatment.category} Dentistry
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display mt-1 text-white">
              {treatment.name}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Overview</h4>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {treatment.fullDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/70 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                Typical Duration
              </span>
              <p className="font-bold text-slate-800 text-sm">{treatment.duration}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 font-semibold flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                Ideal For
              </span>
              <p className="font-bold text-slate-800">{treatment.idealFor}</p>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Key Clinical Benefits
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
              {treatment.keyBenefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-teal-50/40 p-2.5 rounded-xl border border-teal-100/50">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Procedure Steps */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              What to Expect: Procedure Steps
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700">
              {treatment.procedureSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-50 p-2.5 rounded-xl">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onBook(treatment.name);
                onClose();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment for {treatment.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
