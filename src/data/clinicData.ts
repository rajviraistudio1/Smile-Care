import { Dentist, FAQItem, Testimonial, Treatment } from '../types';

export const CLINIC_INFO = {
  name: 'SmileCare Dental Clinic',
  tagline: 'Healthy Teeth. Confident Smiles.',
  shortDescription: 'Bengaluru’s trusted dental clinic dedicated to gentle, modern, and comprehensive oral healthcare for the entire family in a calm and comforting environment.',
  establishedYear: 2012,
  phonePrimary: '+91 80 2520 1890',
  phoneMobile: '+91 98450 12345',
  whatsapp: '+91 98450 12345',
  email: 'appointments@smilecaredental.in',
  contactEmail: 'contact@smilecaredental.in',
  address: {
    line1: '#42, 2nd Floor, 100 Feet Road',
    line2: 'HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    country: 'India',
    landmark: 'Opposite Starbucks, Near CMH Hospital Junction (450m from Indiranagar Metro Station)'
  },
  openingHours: [
    { days: 'Monday – Saturday', hours: '9:00 AM – 8:00 PM' },
    { days: 'Sunday', hours: '10:00 AM – 2:00 PM (By Prior Appointment)' }
  ],
  stats: [
    { label: 'Happy Smiles Treated', value: '14,000+' },
    { label: 'Years of Clinical Excellence', value: '14+' },
    { label: 'Patient Satisfaction', value: '4.9 / 5' },
    { label: 'Certified Specialist Dentists', value: '100%' }
  ]
};

export const TREATMENTS: Treatment[] = [
  {
    id: 'general-dentistry',
    name: 'General Dentistry',
    category: 'Preventive',
    shortDescription: 'Routine checkups, digital X-rays, cavity detection, and preventive dental care.',
    fullDescription: 'Comprehensive oral evaluations designed to maintain optimal oral health, catch dental issues early before they cause pain, and preserve your natural teeth for a lifetime.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    duration: '30 – 45 mins',
    idealFor: 'Anyone needing a regular 6-month checkup, cavity screening, or general tooth discomfort evaluation.',
    keyBenefits: [
      'Comprehensive 32-point oral cavity checkup',
      'Low-radiation digital intraoral X-ray imaging',
      'Early detection of hidden decay and gum diseases',
      'Personalized oral hygiene counseling'
    ],
    procedureSteps: [
      'Visual examination & medical history review',
      'Digital diagnostic imaging if required',
      'Plaque, calculus & gum health assessment',
      'Detailed diagnosis discussion and tailored care plan'
    ]
  },
  {
    id: 'teeth-cleaning',
    name: 'Teeth Cleaning & Polishing',
    category: 'Preventive',
    shortDescription: 'Advanced ultrasonic scaling and enamel polishing to remove plaque, tartar, and surface stains.',
    fullDescription: 'Professional ultrasonic dental scaling safely eliminates stubborn tartar (calculus) and bacterial plaque from below the gum line, preventing gingivitis, bad breath, and tooth mobility.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    duration: '40 – 60 mins',
    idealFor: 'Individuals with bleeding gums, yellow stains from tea/coffee, bad breath, or routine annual hygiene.',
    keyBenefits: [
      'Gentle ultrasonic vibration technology for pain-free cleaning',
      'Removes stubborn tobacco, tea, and coffee stains',
      'Reverses early gum inflammation and bleeding',
      'Smooth fluoridated polishing for long-lasting freshness'
    ],
    procedureSteps: [
      'Gum pocket depth and tartar evaluation',
      'Ultrasonic scaling to dislodge calculus deposits',
      'Fine hand scaling around delicate interdental zones',
      'Micro-abrasive polishing paste application for a smooth sheen'
    ]
  },
  {
    id: 'root-canal-treatment',
    name: 'Root Canal Treatment (RCT)',
    category: 'Restorative',
    shortDescription: 'Pain-free single-sitting rotary root canal therapy to save infected natural teeth.',
    fullDescription: 'Modern endodontic treatment removes inflamed or infected pulp tissue from inside the root canal, sterilizes the chamber, and seals it permanently to relieve intense toothache and save the natural tooth.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    duration: '45 – 60 mins (Single or Two Sittings)',
    idealFor: 'Severe throbbing toothache, sensitivity to hot food, swelling in gums, deep decay, or cracked teeth.',
    keyBenefits: [
      '98%+ success rate in saving natural tooth structure',
      'Painless procedure with advanced computer-guided local anesthesia',
      'High-precision rotary nickel-titanium instruments',
      'Option for single-visit completion in uncomplicated cases'
    ],
    procedureSteps: [
      'Digital 3D apex locator diagnosis and profound numbing',
      'Micro-access to gently remove infected nerve tissue',
      'Thorough disinfection with laser/ultrasonic irrigation',
      'Hermetic root canal sealing (Gutta-Percha) followed by core buildup & crown'
    ]
  },
  {
    id: 'dental-implants',
    name: 'Dental Implants',
    category: 'Restorative',
    shortDescription: 'Permanent titanium fixtures that replace missing teeth with natural look, feel, and function.',
    fullDescription: 'Medical-grade titanium posts surgically positioned into the jawbone, acting as a sturdy root anchor for custom-crafted ceramic crowns, bridges, or full-arch dentures.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    duration: 'Consultation + 2-stage precision placement',
    idealFor: 'Single or multiple missing teeth, loose dentures, or individuals seeking a permanent tooth replacement.',
    keyBenefits: [
      'Lifetime durability with proper oral maintenance',
      'Preserves jawbone density and facial structure',
      'Restores 100% natural chewing power without modifying adjacent healthy teeth',
      'Custom color-matched zirconia or porcelain crowns'
    ],
    procedureSteps: [
      '3D CBCT bone scan and digital implant planning',
      'Gentle keyhole implant fixture placement under local anesthesia',
      'Osseointegration healing period for strong bone fusion',
      'Precision CAD/CAM crown fabrication and permanent cementation'
    ]
  },
  {
    id: 'cosmetic-dentistry',
    name: 'Cosmetic Dentistry & Smile Design',
    category: 'Cosmetic',
    shortDescription: 'Porcelain veneers, composite bonding, and in-clinic LED teeth whitening for radiant smiles.',
    fullDescription: 'Custom aesthetic solutions combining digital smile design, ultra-thin porcelain veneers, and safe chairside teeth whitening to fix gaps, chips, discolored enamel, and gummy smiles.',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80',
    duration: '1 – 2 appointments',
    idealFor: 'Chipped teeth, uneven spacing, deep yellowing/fluorosis, gummy smile, or complete smile makeover.',
    keyBenefits: [
      'Up to 6-8 shades brighter teeth in a single 45-minute whitening session',
      'Ultra-thin custom porcelain veneers with natural translucency',
      'Minimally invasive cosmetic composite edge bonding',
      'Digital preview of your proposed smile before starting'
    ],
    procedureSteps: [
      'High-resolution aesthetic facial and dental photo analysis',
      'Digital smile preview and shade selection',
      'Gentle enamel preparation and temporary mock-up',
      'Permanent bonding of laboratory-crafted ceramic veneers or LED light activation'
    ]
  },
  {
    id: 'pediatric-dentistry',
    name: 'Pediatric Dentistry',
    category: 'Specialty',
    shortDescription: 'Gentle, joyful dental care tailored specifically for infants, children, and teenagers.',
    fullDescription: 'A child-friendly, fear-free environment focused on preventive dental health, pit and fissure sealants, fluoride treatments, early orthodontic assessment, and healthy childhood oral habits.',
    image: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=800&q=80',
    duration: '30 – 40 mins',
    idealFor: 'Children aged 1 to 16 for routine checkups, baby bottle tooth decay, habit breaking, or preventive sealants.',
    keyBenefits: [
      'Specialized gentle pediatric communication technique (Tell-Show-Do)',
      'Pit & fissure sealants to prevent 80% of childhood cavities',
      'Fluoride varnish applications for cavity-resistant enamel',
      'Friendly rewards and positive reinforcement for young champions'
    ],
    procedureSteps: [
      'Interactive, fun familiarization with the dental chair',
      'Gentle oral exam and developmental milestone check',
      'Cavity prevention treatment (cleaning, sealants, or fluoride)',
      'Parental guidance on diet, teething, and brushing techniques'
    ]
  },
  {
    id: 'orthodontics',
    name: 'Orthodontics & Clear Aligners',
    category: 'Specialty',
    shortDescription: 'Invisible clear aligners, ceramic braces, and traditional braces for perfectly aligned teeth.',
    fullDescription: 'Modern orthodontic solutions to correct crooked teeth, overlapping bites, gaps, and jaw misalignment using discreet clear aligners or low-profile ceramic braces.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    duration: '6 – 18 months customized treatment plan',
    idealFor: 'Crowded teeth, gaps between teeth, overbite, underbite, crossbite, or aesthetic smile straightening.',
    keyBenefits: [
      'Nearly invisible clear aligners that are easily removable for eating & brushing',
      '3D computerized progression simulation of tooth movement',
      'No dietary restrictions with removable aligners',
      'Smooth, comfortable design without metal wire pokes'
    ],
    procedureSteps: [
      'Digital 3D intraoral optical scanning (no gooey impression paste)',
      'Customized computerized 3D treatment plan simulation',
      'Delivery of initial series of custom-milled aligner trays',
      'Periodic progress reviews every 6-8 weeks until completion'
    ]
  },
  {
    id: 'wisdom-tooth-removal',
    name: 'Wisdom Tooth Removal',
    category: 'Restorative',
    shortDescription: 'Gentle, pain-managed surgical extractions for impacted or painful third molars.',
    fullDescription: 'Safe, minor surgical removal of problematic, impacted, or misaligned wisdom teeth to prevent swelling, severe jaw pain, cysts, and damage to neighboring healthy molars.',
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80',
    duration: '30 – 45 mins',
    idealFor: 'Pain in the back of the jaw, recurrent gum swelling around molars, food lodgment, or impacted wisdom teeth.',
    keyBenefits: [
      'Performed with profound local anesthesia for total comfort',
      'Minimally invasive surgical technique for faster soft-tissue recovery',
      'Prevents crowding and decay of adjacent second molars',
      'Comprehensive post-operative healing care kit and dedicated follow-up'
    ],
    procedureSteps: [
      'OPG panoramic digital X-ray to assess root morphology and nerve proximity',
      'Complete local anesthesia administration',
      'Gentle, controlled extraction with specialized atraumatic instruments',
      'Sterile suture placement and detailed post-care healing instructions'
    ]
  }
];

export const DENTISTS: Dentist[] = [
  {
    id: 'dr-priya-sharma',
    name: 'Dr. Priya Sharma',
    qualification: 'BDS, MDS (Prosthodontics & Implantology)',
    role: 'Chief Prosthodontist & Implant Specialist',
    specialization: 'Aesthetic Smile Design, Dental Implants & Full Mouth Rehabilitation',
    experienceYears: 14,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Priya Sharma is an accomplished Prosthodontist and Implantologist with over 14 years of clinical experience in Bengaluru. She graduated with honors from the prestigious Government Dental College, Bengaluru, followed by her Masters in Prosthodontics. Known for her artistic eye and gentle touch, Dr. Priya specializes in complex smile makeovers, digital implantology, and fixed porcelain rehabilitations. She believes dentistry is where science meets artistry, and strives to ensure every patient leaves feeling confident and genuinely cared for.',
    education: [
      'BDS – Government Dental College & Research Institute, Bengaluru (2010)',
      'MDS (Prosthodontics & Crown Bridge) – RGUHS, Karnataka (2013)',
      'Fellowship in Advanced Oral Implantology (ICOI, USA)'
    ],
    memberships: [
      'Indian Prosthodontic Society (IPS)',
      'Indian Dental Association (IDA - Bengaluru Branch)',
      'International Congress of Oral Implantologists (ICOI)'
    ]
  },
  {
    id: 'dr-rajesh-menon',
    name: 'Dr. Rajesh Menon',
    qualification: 'BDS, MDS (Conservative Dentistry & Endodontics)',
    role: 'Senior Endodontist & Microscopic RCT Specialist',
    specialization: 'Painless Single-Visit Root Canals, Laser Dentistry & Restorative Care',
    experienceYears: 12,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Rajesh Menon is a passionate Endodontist renowned across Bengaluru for his gentle and painless approach to root canal treatments. With 12 years of focused clinical practice, Dr. Menon has completed over 6,500 successful root canal procedures. He is a pioneer in adopting micro-endodontics and rotary nickel-titanium instrumentation that turns what used to be a feared dental procedure into a comfortable, single-visit experience. Patients frequently commend his calm demeanor, detailed explanations, and empathetic chairside manner.',
    education: [
      'BDS – Oxford Dental College & Hospital, Bengaluru (2012)',
      'MDS (Conservative Dentistry & Endodontics) – RGUHS, Karnataka (2015)',
      'Certified Microscopic Endodontics Specialist'
    ],
    memberships: [
      'Indian Endodontic Society (IES)',
      'Federation of Operative Dentistry of India (FODI)',
      'Karnataka State Dental Council (Reg No: 28412-A)'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    patientName: 'Ananya S. Rao',
    location: 'Indiranagar, Bengaluru',
    treatment: 'Root Canal Treatment & Ceramic Crown',
    rating: 5,
    comment: 'I had severe dental anxiety after a painful experience elsewhere years ago. Dr. Rajesh at SmileCare completely changed my perspective! The root canal was 100% painless and completed in just one sitting. The clinic is spotless and modern.',
    date: 'February 2026'
  },
  {
    id: 't2',
    patientName: 'Vikramaditya Hegde',
    location: 'Koramangala, Bengaluru',
    treatment: 'Dental Implants (2 Teeth Replacement)',
    rating: 5,
    comment: 'Dr. Priya Sharma explained the entire implant procedure with 3D scans before we even touched a tool. The surgery was smooth, healing was quick, and now I can chew almonds and apples without hesitation. Truly world-class care!',
    date: 'January 2026'
  },
  {
    id: 't3',
    patientName: 'Meera & Rohan Kulkarni',
    location: 'HSR Layout, Bengaluru',
    treatment: 'Pediatric Dental Care for 6yo son',
    rating: 5,
    comment: 'Taking our 6-year-old son to the dentist used to be a nightmare. The pediatric team at SmileCare was so warm, cheerful, and patient. He received his cavity sealants without shedding a single tear and proudly showed off his bravery badge!',
    date: 'March 2026'
  },
  {
    id: 't4',
    patientName: 'Deepak V. Raman',
    location: 'Whitefield, Bengaluru',
    treatment: 'Teeth Cleaning & Laser Whitening',
    rating: 5,
    comment: 'Booked an appointment for teeth cleaning and whitening right before my sister’s wedding. The clinic adheres to European sterilization protocols. The results were visibly dramatic and natural. Highly recommended dental clinic in Bengaluru!',
    date: 'December 2025'
  }
];

export const CLINIC_VALUES = [
  {
    title: 'Patient-First Empathy',
    description: 'We listen attentively to your concerns, respect your comfort thresholds, and never push unnecessary treatments.',
    icon: 'HeartHandshake'
  },
  {
    title: 'Painless Gentle Technology',
    description: 'Modern computer-guided local anesthesia, rotary endodontics, and ultra-quiet equipment make dental visits stress-free.',
    icon: 'Sparkles'
  },
  {
    title: 'Hospital-Grade Sterilization',
    description: 'Class-B fractionated vacuum autoclaves, disposable barrier protection, and rigorous 5-tier infection control standards.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Transparent Pricing & Plans',
    description: 'Complete upfront treatment estimates with itemized explanations. No hidden charges or surprise line items.',
    icon: 'CheckCircle2'
  }
];

export const CLINIC_FACILITIES = [
  {
    title: 'Digital 3D OPG & Intraoral Imaging',
    description: 'Instant ultra-low radiation X-rays displayed on chairside monitors for crystal clear patient understanding.'
  },
  {
    title: 'German Ergonomic Dental Units',
    description: 'Contoured memory-foam dental chairs designed for optimal lumbar support and relaxed posture during treatments.'
  },
  {
    title: 'Class-B Vacuum Autoclaves',
    description: 'Strict 100% sterilization of all instruments with sealed sterile pouches opened directly in front of the patient.'
  },
  {
    title: 'Quiet Rotary Endodontic Systems',
    description: 'State-of-the-art cordless rotary motors providing whisper-quiet, rapid, and vibration-free root canal therapies.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Appointments & Visits',
    question: 'Do I need an appointment before visiting SmileCare Dental Clinic?',
    answer: 'While we do accommodate walk-ins for dental emergencies, we strongly recommend booking an appointment in advance. Prior scheduling ensures zero wait time and guarantees dedicated time with your specific specialist doctor.'
  },
  {
    id: 'faq-2',
    category: 'General Dental Health',
    question: 'How often should I visit a dentist for a checkup?',
    answer: 'We recommend visiting every 6 months for a routine dental checkup and professional cleaning. Regular checkups catch early enamel demineralization, small cavities, and gum inflammation before they escalate into painful or costly issues.'
  },
  {
    id: 'faq-3',
    category: 'Appointments & Visits',
    question: 'How long does a standard dental check-up and consultation take?',
    answer: 'A comprehensive first check-up usually takes 30 to 45 minutes. This includes a 32-point oral examination, low-radiation digital X-rays (if indicated), gum health evaluation, and an open discussion regarding treatment options and preventive advice.'
  },
  {
    id: 'faq-4',
    category: 'Pediatric & Family',
    question: 'Do you treat children, and at what age should a child first visit the dentist?',
    answer: 'Yes, absolutely! We love treating young smiles and provide a warm, kid-friendly environment. The Indian Dental Association and American Academy of Pediatric Dentistry recommend a child’s first dental visit by their 1st birthday or within 6 months after their first milk tooth erupts.'
  },
  {
    id: 'faq-5',
    category: 'Emergency Care',
    question: 'Do you provide emergency dental care in Bengaluru?',
    answer: 'Yes. We offer priority same-day emergency slots for severe acute toothaches, knocked-out teeth, broken crowns, sudden facial swelling, or dental trauma. Please call our direct helpline at +91 98450 12345 immediately if you are experiencing a dental emergency.'
  },
  {
    id: 'faq-6',
    category: 'Appointments & Visits',
    question: 'What should I bring along to my dental appointment?',
    answer: 'Please bring any previous dental records or X-rays you might have, a list of current medications or relevant medical history (e.g. hypertension, diabetes, cardiac history), and your photo ID for clinic registration.'
  },
  {
    id: 'faq-7',
    category: 'Appointments & Visits',
    question: 'Can I reschedule or cancel my appointment if my plans change?',
    answer: 'Yes. We understand schedules can be unpredictable in Bengaluru traffic! You can easily reschedule or cancel your appointment by calling us or sending a WhatsApp message to +91 98450 12345 at least 2 hours prior to your slot so we can offer it to someone in need.'
  },
  {
    id: 'faq-8',
    category: 'Treatments & Procedures',
    question: 'What treatments do you provide at SmileCare Dental Clinic?',
    answer: 'SmileCare is a multi-specialty dental clinic offering General Dentistry, Professional Teeth Cleaning & Ultrasonic Scaling, Painless Single-Sitting Root Canal Treatments (RCT), Titanium Dental Implants, Cosmetic Dentistry (Veneers, Bonding, Whitening), Pediatric Dentistry, Orthodontics (Braces & Clear Aligners), and Surgical Wisdom Tooth Extractions.'
  },
  {
    id: 'faq-9',
    category: 'Treatments & Procedures',
    question: 'Is a Root Canal Treatment (RCT) painful at your clinic?',
    answer: 'Not at all. With modern local anesthetics, electronic apex locators, and quiet rotary instruments, a root canal at SmileCare feels no different than getting a routine dental filling. In fact, the procedure is designed to immediately relieve the pain caused by the infected tooth nerve.'
  },
  {
    id: 'faq-10',
    category: 'Costs & Payments',
    question: 'What payment modes do you accept at the clinic?',
    answer: 'We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm), Credit Cards, Debit Cards, Net Banking, and Cash. For extensive dental procedures like multiple implants or full orthodontic alignments, zero-cost EMI plans are also available.'
  }
];
