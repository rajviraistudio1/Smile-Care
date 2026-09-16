import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Phone, 
  Calendar, 
  Sparkles, 
  MessageCircleQuestion, 
  CheckCircle2,
  X
} from 'lucide-react';
import { PageId } from '../../types';
import { FAQ_ITEMS, CLINIC_INFO } from '../../data/clinicData';

interface FAQPageProps {
  onNavigate: (page: PageId) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Appointments & Visits', 'General Dental Health', 'Treatments & Procedures', 'Pediatric & Family', 'Emergency Care', 'Costs & Payments'];

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        item.question.toLowerCase().includes(query) || 
        item.answer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Header Banner */}
      <section className="bg-gradient-to-b from-teal-50/80 via-slate-50 to-slate-50 pt-12 pb-16 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/80 text-teal-800 text-xs sm:text-sm font-semibold border border-teal-200/70">
            <HelpCircle className="w-4 h-4 text-teal-600" />
            <span>Got Questions? We’ve Got Answers</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our appointments, treatments, pain management protocols, and clinic policies in Bengaluru.
          </p>
        </div>
      </section>

      {/* 2. Search & Category Filters */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="faq-search-input"
            placeholder="Search questions (e.g. root canal, appointment, children, emergency)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center flex-wrap gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`faq-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 pt-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? 'border-teal-500/50 shadow-md ring-1 ring-teal-500/20' 
                      : 'border-slate-200/80 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
                        {faq.category}
                      </span>
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-teal-100 text-teal-700 rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                      <p className="bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80 p-8 space-y-3">
              <MessageCircleQuestion className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="font-bold text-slate-800">No matching questions found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching with different terms or reset your filters to see all dental FAQs.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="text-xs font-bold text-teal-700 hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. Still Have Questions Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold font-display">
              Still have questions about your dental health?
            </h3>
            <p className="text-slate-300 text-sm max-w-md">
              Our clinical coordination desk is always happy to guide you over phone or during an in-person check-up.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`tel:${CLINIC_INFO.phoneMobile}`}
              id="faq-call-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl border border-slate-700 transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-400" />
              <span>Call Reception</span>
            </a>

            <button
              onClick={() => onNavigate('appointment')}
              id="faq-book-btn"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
