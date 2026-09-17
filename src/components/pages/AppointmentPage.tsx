import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  Send,
  Navigation,
  ExternalLink,
  MessageSquare,
  Database,
  RefreshCw
} from 'lucide-react';
import { PageId, AppointmentFormState, SubmittedAppointment } from '../../types';
import { CLINIC_INFO, DENTISTS, TREATMENTS } from '../../data/clinicData';
import { insertAppointment, isSupabaseConfigured } from '../../lib/supabase';

interface AppointmentPageProps {
  initialTreatment?: string;
  onNavigate: (page: PageId) => void;
}

export const AppointmentPage: React.FC<AppointmentPageProps> = ({ initialTreatment = '', onNavigate }) => {
  const [formData, setFormData] = useState<AppointmentFormState>({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    timeSlot: 'Morning (09:00 AM – 12:00 PM)',
    treatment: initialTreatment || 'General Dentistry Consultation',
    dentistPreference: 'Any Available Specialist',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<SubmittedAppointment | null>(null);
  const [dbSaved, setDbSaved] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync initialTreatment if passed dynamically
  useEffect(() => {
    if (initialTreatment) {
      setFormData(prev => ({ ...prev, treatment: initialTreatment }));
    }
  }, [initialTreatment]);

  // Today's date formatted as YYYY-MM-DD for min date in picker
  const todayString = new Date().toISOString().split('T')[0];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^[0-9+ -]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (e.g. 9845012345)';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.date) newErrors.date = 'Please choose your preferred appointment date';
    if (!formData.treatment) newErrors.treatment = 'Please select a treatment or reason for visit';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setServerError(null);

    const refId = 'SC-' + Math.floor(100000 + Math.random() * 900000);
    const appointmentRecord: SubmittedAppointment = {
      ...formData,
      referenceId: refId,
      submittedAt: new Date().toISOString()
    };

    // Insert into Supabase
    const result = await insertAppointment(appointmentRecord);

    if (result.success) {
      setSubmittedData(appointmentRecord);
      setDbSaved(!result.isLocalFallback);
      setIsSubmitting(false);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } else {
      setIsSubmitting(false);
      setServerError(
        result.error || 'Failed to record appointment in database. Please check your network or call our reception.'
      );
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setServerError(null);
    setDbSaved(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      date: '',
      timeSlot: 'Morning (09:00 AM – 12:00 PM)',
      treatment: 'General Dentistry Consultation',
      dentistPreference: 'Any Available Specialist',
      message: ''
    });
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. Page Header */}
      <section className="bg-gradient-to-b from-teal-50/80 via-slate-50 to-slate-50 pt-12 pb-16 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-xs sm:text-sm font-semibold border border-teal-200/70">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>Online Appointment Request</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            Book Your Dental Appointment
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Fill in your preferred date and treatment details below. Our Bengaluru clinic reception will contact you shortly to confirm your scheduled slot.
          </p>
        </div>
      </section>

      {/* 2. Main Booking Grid: Form + Clinic Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left / Main Column: Appointment Form or Confirmation State */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs">
            
            {submittedData ? (
              /* Success Confirmation View */
              <div className="space-y-6 text-center sm:text-left animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto sm:mx-0 border border-teal-200">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded">
                      Request Received Successfully
                    </span>
                    {dbSaved && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        <Database className="w-3 h-3 text-emerald-600" />
                        Saved in Clinic Database
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                    Thank you, {submittedData.fullName}!
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    We have received your appointment request. Our reception desk will call or WhatsApp you within <strong>2 business hours</strong> to confirm your slot and provide any pre-visit guidelines.
                  </p>
                </div>

                {/* Submitted Details Summary Card */}
                <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200/80 space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between items-center border-b border-slate-200/80 pb-2.5">
                    <span className="text-slate-500 font-medium">Booking Reference</span>
                    <span className="font-mono font-bold text-teal-700 text-base">{submittedData.referenceId}</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Selected Treatment</span>
                    <span className="font-bold text-slate-900 text-right">{submittedData.treatment}</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Preferred Date</span>
                    <span className="font-bold text-slate-900">{submittedData.date}</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Preferred Time Slot</span>
                    <span className="font-bold text-slate-900">{submittedData.timeSlot}</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Contact Phone</span>
                    <span className="font-bold text-slate-900">{submittedData.phone}</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Dentist Preference</span>
                    <span className="font-bold text-slate-900">{submittedData.dentistPreference}</span>
                  </div>

                  {submittedData.message && (
                    <div className="pt-2 border-t border-slate-200/60 text-left">
                      <span className="text-slate-500 block font-medium mb-1">Your Note:</span>
                      <p className="text-slate-700 italic bg-white p-2.5 rounded-lg border border-slate-200">
                        "{submittedData.message}"
                      </p>
                    </div>
                  )}
                </div>

                {/* What happens next banner */}
                <div className="bg-teal-50/80 rounded-2xl p-4 border border-teal-100 flex items-start gap-3 text-xs text-teal-900">
                  <Sparkles className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">What happens next?</p>
                    <p className="text-teal-800/90 mt-0.5">
                      1. Our care coordinator verifies slot availability.<br />
                      2. You receive an SMS/WhatsApp reminder with parking directions and clinic gate code.<br />
                      3. Zero waiting time when you arrive at your scheduled time!
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>

                  <button
                    onClick={() => onNavigate('home')}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            ) : (
              /* The Appointment Request Form */
              <form onSubmit={handleSubmit} className="space-y-6" id="appointment-booking-form">
                <div className="space-y-1 border-b border-slate-100 pb-4">
                  <h2 className="text-2xl font-bold text-slate-900 font-display">
                    Appointment Request Form
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    Please provide your contact info and visit requirements.
                  </p>
                </div>

                {/* Patient Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="e.g. Ananya Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                        errors.fullName ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:bg-white'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName}</p>}
                </div>

                {/* Phone & Email in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="e.g. +91 98450 12345"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                          errors.phone ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:bg-white'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone}</p>}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="e.g. ananya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                          errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:bg-white'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
                  </div>
                </div>

                {/* Preferred Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Preferred Date */}
                  <div className="space-y-1.5">
                    <label htmlFor="date" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        id="date"
                        name="date"
                        min={todayString}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                          errors.date ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:bg-white'
                        }`}
                      />
                    </div>
                    {errors.date && <p className="text-xs text-red-500 font-medium">{errors.date}</p>}
                  </div>

                  {/* Preferred Time Slot */}
                  <div className="space-y-1.5">
                    <label htmlFor="timeSlot" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Preferred Time Slot <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        id="timeSlot"
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all focus:bg-white cursor-pointer"
                      >
                        <option value="Morning (09:00 AM – 12:00 PM)">Morning (09:00 AM – 12:00 PM)</option>
                        <option value="Afternoon (12:00 PM – 04:00 PM)">Afternoon (12:00 PM – 04:00 PM)</option>
                        <option value="Evening (04:00 PM – 08:00 PM)">Evening (04:00 PM – 08:00 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Treatment / Reason for Visit */}
                <div className="space-y-1.5">
                  <label htmlFor="treatment" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Treatment / Reason for Visit <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="treatment"
                    name="treatment"
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all focus:bg-white cursor-pointer"
                  >
                    <option value="General Dentistry Consultation">General Dental Checkup & Consultation</option>
                    {TREATMENTS.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                    <option value="Emergency Toothache Relief">Emergency Acute Tooth Pain / Trauma</option>
                    <option value="Second Opinion on Dental Plan">Second Opinion on Existing Dental Plan</option>
                  </select>
                </div>

                {/* Preferred Dentist */}
                <div className="space-y-1.5">
                  <label htmlFor="dentistPreference" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Preferred Specialist Dentist (Optional)
                  </label>
                  <select
                    id="dentistPreference"
                    name="dentistPreference"
                    value={formData.dentistPreference}
                    onChange={(e) => setFormData({ ...formData, dentistPreference: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all focus:bg-white cursor-pointer"
                  >
                    <option value="Any Available Specialist">Any Available Specialist (Fastest Availability)</option>
                    {DENTISTS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.specialization.split(',')[0]})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Additional Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Additional Message or Specific Symptoms (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about any specific pain, dental anxiety, medical conditions, or timing requests..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all focus:bg-white"
                  />
                </div>

                {/* Server Error Alert */}
                {serverError && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold">Unable to process appointment online</p>
                      <p className="text-rose-700/90 leading-relaxed">{serverError}</p>
                      <p className="pt-1 text-[11px] text-rose-600">
                        You can also book directly by calling us at{' '}
                        <a href={`tel:${CLINIC_INFO.phoneMobile}`} className="font-bold underline">
                          {CLINIC_INFO.phoneMobile}
                        </a>.
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  id="submit-appointment-btn"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 disabled:bg-teal-400 text-white font-bold text-base py-4 rounded-xl shadow-lg shadow-teal-600/25 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Appointment Request</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-slate-400">
                  By submitting this form, you consent to receive a confirmation call or message from SmileCare Dental Clinic. Your private health details are strictly confidential.
                </p>
              </form>
            )}

          </div>

          {/* Right Column: Clinic Contact Details, Hours & Directions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <span className="text-teal-700 font-bold text-xs uppercase tracking-wider">Direct Contact</span>
                <h3 className="text-xl font-bold text-slate-900 font-display">SmileCare Dental Clinic</h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{CLINIC_INFO.address.line1}</p>
                    <p className="text-slate-600">{CLINIC_INFO.address.line2}</p>
                    <p className="text-slate-600">{CLINIC_INFO.address.city}, {CLINIC_INFO.address.state} {CLINIC_INFO.address.pincode}</p>
                    <p className="text-[11px] text-teal-700 font-semibold mt-1">
                      {CLINIC_INFO.address.landmark}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Clinic Reception</p>
                    <a href={`tel:${CLINIC_INFO.phoneMobile}`} className="text-teal-700 font-bold block hover:underline">
                      {CLINIC_INFO.phoneMobile}
                    </a>
                    <a href={`tel:${CLINIC_INFO.phonePrimary}`} className="text-slate-500 text-xs block hover:underline">
                      {CLINIC_INFO.phonePrimary} (Landline)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Email Inquiries</p>
                    <a href={`mailto:${CLINIC_INFO.email}`} className="text-teal-700 text-xs sm:text-sm break-all hover:underline">
                      {CLINIC_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Opening Hours</p>
                    <p className="text-slate-600 text-xs">Mon – Sat: 9:00 AM – 8:00 PM</p>
                    <p className="text-slate-500 text-xs">Sunday: 10:00 AM – 2:00 PM (By Appt)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location / Bengaluru Interactive Map Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-teal-400" />
                  <h4 className="font-bold text-lg text-white">How to Reach Us</h4>
                </div>
                <span className="text-[10px] bg-teal-900/80 text-teal-300 px-2 py-0.5 rounded font-bold border border-teal-700">
                  Indiranagar, BLR
                </span>
              </div>

              {/* Styled Visual Map Placeholder */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 h-48 flex items-center justify-center">
                {/* Visual Map graphic pattern */}
                <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Map roads schematic */}
                <div className="absolute inset-0 flex flex-col justify-around py-4 opacity-40">
                  <div className="h-4 bg-slate-700 w-full transform -rotate-6" />
                  <div className="h-6 bg-slate-700 w-full transform rotate-3" />
                </div>

                {/* Landmark Pin Indicator */}
                <div className="relative z-10 text-center space-y-1.5 p-4">
                  <div className="w-10 h-10 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-teal-500/50 animate-bounce">
                    <MapPin className="w-6 h-6 fill-current" />
                  </div>
                  <p className="font-bold text-xs text-white bg-slate-950/80 px-3 py-1 rounded-full border border-teal-500/40 inline-block">
                    SmileCare Dental Clinic • 100 Feet Rd
                  </p>
                </div>
              </div>

              {/* Transit & Parking Details */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                  <span><strong>Namma Metro:</strong> 450m from Indiranagar Metro Station (Purple Line).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                  <span><strong>Landmark:</strong> Opposite Starbucks, above Fabindia on 100 Feet Road.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                  <span><strong>Parking:</strong> Dedicated basement parking & valet assistance available.</span>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Indiranagar+100+Feet+Road+Bengaluru"
                target="_blank"
                rel="noreferrer"
                id="open-google-maps-btn"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white text-xs font-semibold py-2.5 rounded-xl border border-slate-700 transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
