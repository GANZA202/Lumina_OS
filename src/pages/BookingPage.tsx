import React, { useState } from 'react';
import { useSaaS } from '../context/SaaSContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Instagram, 
  MessageCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const { photographer, currentLanguage, t } = useSaaS();

  // Booking details core state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [eventType, setEventType] = useState('Wedding');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  
  // App states
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  // Target photographer contact details
  const photographerPhone = photographer.whatsappNumber || '250725891435'; // standard clean phone for wa.me API
  const instagramHandle = (photographer.instagramLink || 'https://www.instagram.com/_iampri_nce/').replace(/\/$/, '').split('/').pop() || '_iampri_nce';
  const customPhone = photographer.phoneContact || '+250 793 216 848';

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate database booking submission latency
    setTimeout(() => {
      // Create the beautiful WhatsApp message body
      const formattedMessage = `New Booking Request:
------------------------------
Name: ${fullName}
Email: ${email}
Phone: ${phoneNumber}
Event: ${eventType}
Date: ${eventDate}
Location: ${location}
Message: ${message}
------------------------------
Submitted via Lumina OS Platform.`;

      const encodedMsg = encodeURIComponent(formattedMessage);
      const waApiUrl = `https://wa.me/${photographerPhone}?text=${encodedMsg}`;

      setWhatsAppUrl(waApiUrl);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Open whatsapp automatically in a new tab if allowed
      try {
        window.open(waApiUrl, '_blank');
      } catch (err) {
        console.warn("Popup blocked, providing direct CTA triggers in overlay template.");
      }
    }, 1200);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setEventType('Wedding');
    setEventDate('');
    setLocation('');
    setMessage('');
    setIsSubmitted(false);
  };

  // Event Categories translated
  const eventCategories = [
    { value: 'Wedding', en: 'Traditional & Modern Wedding', rw: 'Ubukwe n’Ibirori rya Gakondo' },
    { value: 'Corporate', en: 'Corporate Keynotes / Conferences', rw: 'Inama n’Ibirori by’Ibigorere' },
    { value: 'Portraits', en: 'Fine-Art Portrait Shoot', rw: 'Gufata Amafoto Ateguwe' },
    { value: 'Birthday', en: 'Birthday / Anniversary Celebration', rw: 'Ubuyoboži n’Isabukuru y’Amavuko' },
    { value: 'Exhibitions', en: 'Cultural Exhibition & Fashion Shots', rw: 'Imurikagurisha n’Imideli' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-4xl mx-auto space-y-8 font-sans">
        
        {/* Header Title Section */}
        <div className="text-center md:text-left border-b border-gray-200 dark:border-neutral-800 pb-6">
          <h1 className="text-3xl sm:text-4xl font-serif italic text-gray-950 dark:text-white leading-tight">
            {currentLanguage === 'en' ? 'Exclusive Booking Commissions' : 'Kwandikisha Serivisi z’Amafoto'}
          </h1>
          <p className="text-xs text-neutral-505 uppercase tracking-wider mt-1 text-neutral-400">
            {currentLanguage === 'en' 
              ? 'Reserve professional high-resolution coverage for your upcoming milestone. Instantly forwards request logs directly to our active studio WhatsApp link.'
              : 'Gira umwanya wihariye wo gufatirwa amafoto y’igiciro cyiza. Bisubizwa ako kanya mu kinyarwanda cyangwa icyongereza kuri WhatsApp yacu.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left panel info column */}
          <div className="space-y-6 text-left">
            <div className="bg-white dark:bg-editorial-card border border-gray-100 dark:border-neutral-800 rounded-2xl p-5 shadow-sm space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C4A484] block">How it works</span>
              
              <div className="space-y-3.5 text-xs text-neutral-500 dark:text-neutral-400">
                <div className="flex gap-2">
                  <div className="h-5 w-5 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center font-bold text-gray-800 dark:text-white shrink-0">1</div>
                  <p>Fill out the requested commission parameters with your accurate location details.</p>
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-5 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center font-bold text-gray-800 dark:text-white shrink-0">2</div>
                  <p>On submit, we automatically package a luxury dispatch log formatted beautifully.</p>
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-5 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center font-bold shrink-0">3</div>
                  <p>Your WhatsApp chat pops up prefilled. Simply hit send to book with MTN MoMo secure payment ready!</p>
                </div>
              </div>
            </div>

            {/* Quick backup info card */}
            <div className="bg-[#161618] border border-neutral-850 rounded-2xl p-5 text-white">
              <span className="text-[9px] uppercase tracking-wider font-bold text-editorial-tan">Studio Direct Lines</span>
              <div className="space-y-3 mt-3 text-xs text-neutral-300">
                <p className="flex items-center gap-1.5 font-mono">
                  <Phone className="w-4 h-4 text-editorial-tan" />
                  {customPhone}
                </p>
                <div className="flex items-center gap-1.5 font-sans">
                  <Instagram className="w-4 h-4 text-editorial-tan" />
                  <a href={`https://instagram.com/${instagramHandle}`} target="_blank" rel="noreferrer" className="hover:underline">@{instagramHandle}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel - Core Booking Form container */}
          <div className="md:col-span-2 relative">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="booking-form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-editorial-card border border-gray-100 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm text-left"
                >
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    
                    {/* Full Name input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input 
                          type="text" 
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Marie Ganza"
                          className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-editorial-tan dark:border-neutral-800 dark:bg-neutral-900 dark:text-white transition shadow-inner"
                        />
                      </div>
                    </div>

                    {/* Dual sub inputs: Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">Email address</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                          <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="marie@gmail.com"
                            className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-editorial-tan dark:border-neutral-800 dark:bg-neutral-900 dark:text-white transition shadow-inner"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">Phone Number (WhatsApp Active)</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                          <input 
                            type="tel" 
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="e.g. +250 788 123 456"
                            className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-editorial-tan dark:border-neutral-800 dark:bg-neutral-900 dark:text-white transition shadow-inner"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Event Type select */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">Shoot Event Category</label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-editorial-tan dark:border-neutral-800 dark:bg-neutral-900 dark:text-white transition"
                      >
                        {eventCategories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {currentLanguage === 'en' ? cat.en : cat.rw}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Dual Location & Date input */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">Event Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                          <input 
                            type="date" 
                            required
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-editorial-tan dark:border-neutral-800 dark:bg-neutral-900 dark:text-white transition shadow-inner"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">Event Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                          <input 
                            type="text" 
                            required
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Kigali Heights, Rwanda"
                            className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-editorial-tan dark:border-neutral-800 dark:bg-neutral-900 dark:text-white transition shadow-inner"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message Box */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">Description & Specific Mood Message</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-neutral-400" />
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Provide visual inspirations, outfit specifications, style guidelines..."
                          className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-editorial-tan dark:border-neutral-800 dark:bg-neutral-900 dark:text-white transition shadow-inner"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-editorial-tan rounded-full text-xs font-bold uppercase tracking-widest shadow-md transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Formatting luxury request...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Booking Commission</span>
                        </>
                      )}
                    </button>

                  </form>
                </motion.div>
              ) : (
                /* SUCCESS NOTIFICATION & REDIRECTION SCREEN */
                <motion.div
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white dark:bg-editorial-card border border-gray-100 dark:border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-xl text-center space-y-6"
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif italic text-gray-950 dark:text-white leading-tight">
                      Booking Request Submitted!
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 max-w-sm mx-auto leading-relaxed">
                      Your booking request has been successfully processed by the system.
                    </p>
                  </div>

                  {/* Highlight Toast styled box */}
                  <div className="p-4 bg-emerald-50 dark:bg-[#12251a]/20 border border-emerald-100 dark:border-[#225035]/30 rounded-2xl text-xs text-left space-y-1 max-w-md mx-auto">
                    <span className="font-bold text-emerald-800 dark:text-emerald-400 block uppercase tracking-widest text-[10px]">
                      🔔 Dispatch Status: Active
                    </span>
                    <p className="text-neutral-501 text-neutral-600 dark:text-neutral-300">
                      We have prepared the direct WhatsApp integration. If the window did not open automatically, please trigger the CTA below to forward details directly to our studio representatives.
                    </p>
                  </div>

                  {/* Dual platform redirection actions */}
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto pt-2">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </a>

                    <a
                      href={`https://instagram.com/${instagramHandle}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-1/2 flex items-center justify-center gap-2 border border-gray-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-gray-700 dark:text-neutral-200 hover:text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                    >
                      <Instagram className="w-4 h-4" />
                      <span>Send DM on Insta</span>
                    </a>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-neutral-800 flex justify-between items-center text-xs">
                    <button
                      onClick={handleReset}
                      className="text-neutral-400 hover:text-white hover:underline cursor-pointer font-bold uppercase tracking-wide text-[10px]"
                    >
                      &larr; Lodge another Booking
                    </button>
                    <a
                      href="#/gallery"
                      className="text-editorial-tan hover:underline font-bold uppercase tracking-wide text-[10px] flex items-center gap-1"
                    >
                      <span>Explore Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );
};
