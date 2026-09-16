import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  GraduationCap, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Stethoscope, 
  Users, 
  Calendar,
  Layers,
  ArrowRight,
  Clock,
  Eye
} from 'lucide-react';
import { PageId } from '../../types';
import { CLINIC_FACILITIES, CLINIC_INFO, CLINIC_VALUES, DENTISTS } from '../../data/clinicData';

interface AboutPageProps {
  onNavigate: (page: PageId, treatmentId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-teal-50/80 via-slate-50 to-slate-50 pt-12 pb-16 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-xs sm:text-sm font-semibold border border-teal-200/70">
            <Heart className="w-4 h-4 text-teal-600" />
            <span>Dedicated to Caring Smiles Since 2012</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            About SmileCare Dental Clinic
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Bengaluru’s center for compassionate, anxiety-free dentistry. Combining high-precision clinical excellence with a warm, patient-first touch.
          </p>
        </div>
      </section>

      {/* 2. Clinic Story & Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-teal-700 font-bold text-xs uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display leading-tight">
                Transforming Dental Care from a Dreaded Chore to a Comforting Experience
              </h2>
            </div>

            <p className="text-slate-600 text-base leading-relaxed">
              SmileCare Dental Clinic was founded in 2012 in Indiranagar, Bengaluru, with a singular vision: to create a healthcare environment where patients feel genuinely listened to, relaxed, and empowered about their oral health.
            </p>

            <p className="text-slate-600 text-base leading-relaxed">
              We realized that most people delay essential dental treatments because of anxiety, fear of pain, or confusing medical jargon. That’s why we reimagined every step of the patient journey—investing in whisper-quiet equipment, computer-guided painless anesthesia, and digital chairside screens so you are always in complete control of your treatment.
            </p>

            <div className="bg-teal-50/70 rounded-2xl p-5 border border-teal-100 space-y-2">
              <h3 className="font-bold text-teal-900 text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-700" />
                Our Mission & Vision
              </h3>
              <p className="text-teal-800/90 text-sm leading-relaxed">
                To deliver world-standard, pain-managed dental treatments that preserve natural dentition, enhance self-confidence, and protect lifelong oral health for families across Bengaluru.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80"
                alt="SmileCare Dental Clinic reception and consultation in Bengaluru"
                className="w-full h-[420px] object-cover"
              />
            </div>
            
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-slate-900 text-white p-5 rounded-2xl shadow-xl border border-slate-800 max-w-xs">
              <p className="text-3xl font-extrabold text-teal-400 font-display">14,000+</p>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Successful patient treatments completed in Bengaluru with a 4.9/5 satisfaction rating.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Core Values */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-wider bg-teal-950 px-3 py-1 rounded-md border border-teal-800">
              What Guides Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
              Our Core Clinical Values
            </h2>
            <p className="text-slate-400 text-base">
              Every member of our team is dedicated to ethical standards, continuous learning, and unconditional patient respect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLINIC_VALUES.map((value, idx) => (
              <div 
                key={idx}
                className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 space-y-3 hover:border-teal-500/60 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center border border-teal-500/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white">{value.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Modern Facilities & Technology */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            State-of-the-Art Infrastructure
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Modern Clinical Facilities in Bengaluru
          </h2>
          <p className="text-slate-600 text-base">
            We continuously upgrade our medical arsenal to ensure minimal invasiveness, supreme accuracy, and total patient comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CLINIC_FACILITIES.map((facility, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                <Layers className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-lg">{facility.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Patient-Care Approach */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-wider bg-teal-950 px-3 py-1 rounded-md border border-teal-800">
              Our Patient-Care Approach
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
              Anxiety-Free, Transparent & Thorough
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              We follow a proven 4-stage patient care protocol designed to eliminate surprises and keep you comfortable:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 text-sm font-bold flex items-center justify-center border border-teal-500/40">1</span>
              <h4 className="font-bold text-white text-base">Unrushed Consultation</h4>
              <p className="text-slate-400 text-xs leading-relaxed">We listen to your concerns and review your medical history with zero rush.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 text-sm font-bold flex items-center justify-center border border-teal-500/40">2</span>
              <h4 className="font-bold text-white text-base">Visual Diagnosis</h4>
              <p className="text-slate-400 text-xs leading-relaxed">High-definition intraoral images shown on screen so you see exactly what the dentist sees.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 text-sm font-bold flex items-center justify-center border border-teal-500/40">3</span>
              <h4 className="font-bold text-white text-base">Painless Execution</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Gentle anesthesia and precision instrumentation guarantee supreme comfort throughout.</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 text-sm font-bold flex items-center justify-center border border-teal-500/40">4</span>
              <h4 className="font-bold text-white text-base">Dedicated Follow-Up</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Post-treatment recovery checks and direct clinic helpline support for complete peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Meet Our Dentists Full Profiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-teal-700 font-bold text-xs uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-md border border-teal-100">
            Clinical Leadership
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Meet Our Specialist Dentists
          </h2>
          <p className="text-slate-600 text-base">
            Our clinic is led by distinguished dental surgeons with over a decade of dedicated clinical practice in Bengaluru.
          </p>
        </div>

        <div className="space-y-12">
          {DENTISTS.map((dentist, idx) => (
            <div 
              key={dentist.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Doctor Portrait & Quick Info */}
              <div className="lg:col-span-4 space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-4/5 bg-slate-100 border border-slate-200 shadow-sm relative">
                  <img
                    src={dentist.image}
                    alt={dentist.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {dentist.experienceYears}+ Years Experience
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-2 text-xs">
                  <p className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-teal-600" />
                    Specialization
                  </p>
                  <p className="text-slate-700 pl-5">{dentist.specialization}</p>
                </div>
              </div>

              {/* Biography & Credentials */}
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-1 border-b border-slate-100 pb-4">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{dentist.name}</h3>
                  <p className="text-teal-700 font-bold text-sm">{dentist.qualification}</p>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">{dentist.role}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider text-slate-500">
                    Professional Biography
                  </h4>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {dentist.bio}
                  </p>
                </div>

                {/* Education & Memberships */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100 space-y-2">
                    <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-teal-700" />
                      Education & Qualifications
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {dentist.education.map((edu, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{edu}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-2">
                    <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-teal-700" />
                      Professional Memberships
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {dentist.memberships.map((mem, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{mem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => onNavigate('appointment')}
                    className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Consultation with {dentist.name}</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 7. Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-3xl font-extrabold font-display max-w-2xl mx-auto">
            Experience the SmileCare Difference in Person
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Our clinic is conveniently situated on 100 Feet Road in Indiranagar, Bengaluru. We look forward to meeting you!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('appointment')}
              className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl transition-all cursor-pointer shadow-lg"
            >
              Book Your First Visit
            </button>
            <button
              onClick={() => onNavigate('treatments')}
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              Explore Dental Treatments
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
