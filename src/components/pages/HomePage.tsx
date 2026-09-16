import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  Award, 
  UserCheck, 
  HeartHandshake,
  Stethoscope,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PageId } from '../../types';
import { CLINIC_INFO, DENTISTS, TESTIMONIALS, TREATMENTS, CLINIC_VALUES } from '../../data/clinicData';

interface HomePageProps {
  onNavigate: (page: PageId, treatmentId?: string) => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
    alt: 'SmileCare modern digital dental operatory in Indiranagar Bengaluru',
    caption: 'Modern Digital Operatory Suite',
    subtitle: 'Indiranagar 100 Feet Road Clinic',
    doctor: DENTISTS[0],
    roleTitle: 'Dr. Priya Sharma',
    specialtyBadge: 'Chief Prosthodontist & Implants'
  },
  {
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
    alt: 'Gentle dental consultation and cleanings at SmileCare',
    caption: 'Gentle Consultation & Oral Hygiene',
    subtitle: 'Calm, anxiety-free clinic environment',
    doctor: DENTISTS[1],
    roleTitle: 'Dr. Rajesh Menon',
    specialtyBadge: 'Senior Endodontist & RCT Specialist'
  },
  {
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80',
    alt: 'Precision restorative dental care and root canal treatment',
    caption: 'Micro-Precision Restorative Care',
    subtitle: 'Painless single-visit root canals & crowns',
    doctor: DENTISTS[1],
    roleTitle: 'Dr. Rajesh Menon',
    specialtyBadge: 'Microscopic RCT & Restorative'
  },
  {
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=80',
    alt: 'Cosmetic smile design and teeth whitening at SmileCare',
    caption: 'Aesthetic Smile Design & Whitening',
    subtitle: 'Natural, radiant and confident transformations',
    doctor: DENTISTS[0],
    roleTitle: 'Dr. Priya Sharma',
    specialtyBadge: 'Aesthetic Smile Design & Veneers'
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const featuredTreatments = TREATMENTS.slice(0, 4);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto-rotating timer every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-cyan-50/30 to-slate-50 pt-12 pb-16 md:pt-20 md:pb-24 border-b border-slate-200/60">
        {/* Subtle background decorative shapes */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-xs sm:text-sm font-semibold border border-teal-200/70 shadow-2xs">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Premier Dental Care in Indiranagar, Bengaluru</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-display">
                  Healthy Teeth.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600">
                    Confident Smiles.
                  </span>
                </h1>
                <p className="text-lg sm:text-xl font-medium text-slate-700">
                  Welcome to <span className="font-semibold text-slate-900">SmileCare Dental Clinic</span>
                </p>
              </div>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Experience gentle, pain-managed dental care using world-class technology. From routine cleanings and laser smile design to microscopic root canals and titanium implants, our specialists ensure you and your family smile with confidence.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  id="hero-book-apt-btn"
                  onClick={() => onNavigate('appointment')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-teal-600/25 hover:shadow-teal-600/35 transition-all cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book an Appointment</span>
                </button>

                <button
                  id="hero-explore-treatments-btn"
                  onClick={() => onNavigate('treatments')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100/80 text-slate-800 font-semibold text-base px-7 py-4 rounded-xl border border-slate-300 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                >
                  <span>Explore Our Treatments</span>
                  <ArrowRight className="w-4 h-4 text-teal-600" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                {CLINIC_INFO.stats.map((stat, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <p className="text-2xl font-extrabold text-teal-700 font-display">{stat.value}</p>
                    <p className="text-xs font-medium text-slate-600 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main hero photo carousel */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-4/3 sm:aspect-5/4 group">
                  {/* Sliding / fading images */}
                  {HERO_SLIDES.map((slide, index) => {
                    const isActive = index === currentSlideIndex;
                    return (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                          isActive 
                            ? 'opacity-100 scale-100 z-10' 
                            : 'opacity-0 scale-105 pointer-events-none z-0'
                        }`}
                      >
                        <img
                          src={slide.image}
                          alt={slide.alt}
                          className="w-full h-full object-cover"
                          loading={index === 0 ? 'eager' : 'lazy'}
                        />
                      </div>
                    );
                  })}

                  {/* Dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent z-20 pointer-events-none" />

                  {/* Carousel navigation arrows on hover */}
                  <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex justify-between z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); handlePrevSlide(); }}
                      className="w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleNextSlide(); }}
                      className="w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Dynamic caption and slide indicators */}
                  <div className="absolute bottom-4 left-4 right-4 text-white z-30 flex items-end justify-between gap-2">
                    <div className="space-y-0.5 max-w-[75%]">
                      <p className="text-sm font-semibold flex items-center gap-1.5 transition-all">
                        <Sparkles className="w-4 h-4 text-teal-300 shrink-0" />
                        <span className="truncate">{HERO_SLIDES[currentSlideIndex].caption}</span>
                      </p>
                      <p className="text-xs text-slate-300 truncate">{HERO_SLIDES[currentSlideIndex].subtitle}</p>
                    </div>

                    {/* Slide progress / navigation dots */}
                    <div className="flex items-center gap-1.5 pb-1">
                      {HERO_SLIDES.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setCurrentSlideIndex(dotIdx)}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            dotIdx === currentSlideIndex 
                              ? 'w-5 bg-teal-400' 
                              : 'w-1.5 bg-white/50 hover:bg-white/80'
                          }`}
                          aria-label={`Go to slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Dentist badge (layered above carousel, changes with slide) */}
                <div 
                  key={`doctor-badge-${currentSlideIndex}`}
                  className="absolute -bottom-6 -left-4 sm:-left-6 bg-white rounded-2xl p-3.5 sm:p-4 shadow-xl border border-slate-100 flex items-center gap-3.5 max-w-xs z-40 animate-in fade-in zoom-in-95 duration-300"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-teal-500 shadow-xs">
                    <img 
                      src={HERO_SLIDES[currentSlideIndex].doctor.image} 
                      alt={HERO_SLIDES[currentSlideIndex].doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-slate-900 leading-tight mt-0.5">
                      {HERO_SLIDES[currentSlideIndex].roleTitle}
                    </p>
                    <p className="text-[11px] text-teal-700 font-medium truncate max-w-[160px]">
                      {HERO_SLIDES[currentSlideIndex].specialtyBadge}
                    </p>
                  </div>
                </div>

                {/* Floating Sterile badge (layered above carousel) */}
                <div className="absolute -top-4 -right-3 sm:-right-4 bg-slate-900 text-white rounded-2xl px-4 py-2.5 shadow-xl border border-slate-800 flex items-center gap-2 text-xs font-semibold z-40">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>100% Autoclaved Equipment</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Introduction to Clinic */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
                <HeartHandshake className="w-3.5 h-3.5" />
                About SmileCare
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display leading-tight">
                Gentle, Ethical Dental Care Designed Around Your Comfort
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Founded with a mission to eliminate dental fear, SmileCare Dental Clinic combines specialist clinical precision with genuine warmth. Located centrally in Indiranagar, Bengaluru, we offer a serene environment where every treatment is clearly explained before we begin.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Whether you need a quick preventive check-up, single-visit root canal relief, or full dental implant restoration, our experienced team ensures your visit is comfortable, hygienic, and rewarding.
              </p>

              <div className="pt-2">
                <button
                  id="intro-learn-more-btn"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-bold text-sm group cursor-pointer"
                >
                  <span>Read our full clinic story and mission</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/70 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Specialist-Led Care</h3>
                <p className="text-slate-600 text-xs sm:text-sm">Every treatment performed by MDS qualified specialist doctors.</p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/70 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Painless Dentistry</h3>
                <p className="text-slate-600 text-xs sm:text-sm">Computer-aided anesthesia and gentle rotary technology.</p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/70 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Class-B Sterilization</h3>
                <p className="text-slate-600 text-xs sm:text-sm">Hospital-grade vacuum autoclaves & sealed disposable packs.</p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/70 space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Zero Wait Times</h3>
                <p className="text-slate-600 text-xs sm:text-sm">Scheduled appointments prioritize your busy workday.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Dental Treatments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Featured Dental Treatments
            </h2>
            <p className="text-slate-600 text-base">
              Comprehensive clinical solutions designed to protect your natural teeth and enhance your smile aesthetics.
            </p>
          </div>

          <button
            id="featured-view-all-btn"
            onClick={() => onNavigate('treatments')}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>View All 8 Treatments</span>
            <ArrowRight className="w-4 h-4 text-teal-600" />
          </button>
        </div>

        {/* Treatment cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col group hover:-translate-y-1 duration-200"
            >
              <div className="h-44 overflow-hidden relative bg-slate-100">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-2xs">
                  {treatment.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-700 transition-colors">
                    {treatment.name}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {treatment.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('treatments', treatment.id)}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigate('appointment', treatment.name)}
                    className="bg-teal-50 hover:bg-teal-600 hover:text-white text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-wider bg-teal-950 px-3 py-1 rounded-md border border-teal-800">
              The SmileCare Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
              Why Bengaluru Families Choose SmileCare
            </h2>
            <p className="text-slate-400 text-base">
              We combine modern clinical precision, advanced technology, and genuine empathy to deliver unmatched dental outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLINIC_VALUES.map((val, idx) => (
              <div 
                key={idx} 
                className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-3 hover:border-teal-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center border border-teal-500/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-white">{val.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Meet Our Dentists Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            Expert Clinicians
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Meet Our Specialist Dentists
          </h2>
          <p className="text-slate-600 text-base">
            Experienced MDS specialists bringing decades of combined clinical mastery in implantology, smile makeovers, and microscopic root canals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {DENTISTS.map((dentist) => (
            <div 
              key={dentist.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row"
            >
              <div className="sm:w-2/5 bg-slate-100 relative min-h-[220px]">
                <img
                  src={dentist.image}
                  alt={dentist.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded">
                  {dentist.experienceYears}+ Yrs Exp
                </span>
              </div>

              <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-slate-900">{dentist.name}</h3>
                  <p className="text-xs font-semibold text-teal-700">{dentist.qualification}</p>
                  <p className="text-xs text-slate-500 font-medium">{dentist.role}</p>
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 pt-1">
                    {dentist.bio}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('about')}
                    className="text-xs font-bold text-slate-700 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigate('appointment')}
                    className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Consult
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Patient Testimonials */}
      <section className="bg-teal-50/60 border-y border-teal-100/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-teal-800 font-bold text-xs uppercase tracking-wider bg-teal-100 px-3 py-1 rounded-md">
              Real Patient Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              What Our Patients Say
            </h2>
            <p className="text-slate-600 text-base">
              Over 14,000 satisfied patients trust SmileCare Dental Clinic for gentle, compassionate oral healthcare in Bengaluru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-2xl border border-teal-100 shadow-2xs flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <p className="font-bold text-slate-900 text-sm">{t.patientName}</p>
                  <p className="text-xs text-slate-500">{t.location}</p>
                  <p className="text-[11px] font-semibold text-teal-700 mt-0.5">{t.treatment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Clinic Opening Hours & Bengaluru Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-teal-700 font-bold text-xs uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
              Visit Us in Bengaluru
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 font-display">
              Convenient Location & Flexible Hours
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Located on 100 Feet Road in Indiranagar with elevator access, ample parking, and easy connectivity via the Namma Metro Purple Line.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-slate-900">{CLINIC_INFO.address.line1}, {CLINIC_INFO.address.line2}</p>
                  <p className="text-slate-600">{CLINIC_INFO.address.city}, {CLINIC_INFO.address.state} – {CLINIC_INFO.address.pincode}</p>
                  <p className="text-xs text-teal-700 font-medium mt-0.5">{CLINIC_INFO.address.landmark}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-600 shrink-0" />
                <div className="text-sm">
                  <span className="font-bold text-slate-900">Direct Helpline: </span>
                  <a href={`tel:${CLINIC_INFO.phoneMobile}`} className="text-teal-700 font-bold hover:underline">
                    {CLINIC_INFO.phoneMobile}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <Clock className="w-6 h-6 text-teal-400" />
              <div>
                <h3 className="font-bold text-lg text-white">Opening Hours</h3>
                <p className="text-xs text-slate-400">Walk-ins welcome for emergencies</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              {CLINIC_INFO.openingHours.map((slot, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-800/80">
                  <span className="text-slate-300 font-medium">{slot.days}</span>
                  <span className="text-teal-300 font-bold">{slot.hours}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('appointment')}
                className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Calendar className="w-4 h-4" />
                Book Your Preferred Time Slot
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Clear Appointment CTA near Bottom */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="max-w-3xl space-y-5 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              Ready to Experience Gentle, Modern Dental Care?
            </h2>
            <p className="text-teal-100 text-base leading-relaxed">
              Schedule your consultation online in under 60 seconds. Our clinical team will reach out promptly to confirm your preferred slot.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                id="bottom-cta-book-btn"
                onClick={() => onNavigate('appointment')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-teal-50 font-bold text-base px-8 py-4 rounded-xl shadow-lg transition-all cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-teal-700" />
                <span>Book an Appointment</span>
              </button>

              <a
                href={`tel:${CLINIC_INFO.phoneMobile}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-800/80 hover:bg-teal-800 text-white font-semibold text-base px-7 py-4 rounded-xl border border-teal-500/40 transition-colors cursor-pointer"
              >
                <Phone className="w-5 h-5 text-teal-300" />
                <span>Call {CLINIC_INFO.phoneMobile}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
