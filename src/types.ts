export type PageId = 'home' | 'about' | 'treatments' | 'appointment' | 'faq';

export interface Treatment {
  id: string;
  name: string;
  category: 'Preventive' | 'Restorative' | 'Cosmetic' | 'Specialty';
  shortDescription: string;
  fullDescription: string;
  image: string;
  duration: string;
  idealFor: string;
  keyBenefits: string[];
  procedureSteps: string[];
}

export interface Dentist {
  id: string;
  name: string;
  qualification: string;
  role: string;
  specialization: string;
  experienceYears: number;
  image: string;
  bio: string;
  education: string[];
  memberships: string[];
}

export interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  treatment: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface AppointmentFormState {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  treatment: string;
  dentistPreference: string;
  message: string;
}

export interface SubmittedAppointment extends AppointmentFormState {
  referenceId: string;
  submittedAt: string;
}
