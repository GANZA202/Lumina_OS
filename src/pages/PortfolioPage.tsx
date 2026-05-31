import React from 'react';
import { useSaaS } from '../context/SaaSContext';
import { Camera, Instagram, Phone, MessageCircle, Star, Calendar, Mail, Compass, Shield, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PortfolioPage: React.FC = () => {
  const { photographer, albums, feedbacks, currentLanguage } = useSaaS();

  // Dynamic photographer details or luxury defaults
  const phone = photographer.phoneContact || '+250 793 216 848'; // user call phone
  const whatsappPhone = photographer.whatsappNumber || '250725891435'; // user WhatsApp for chat links
  const instagram = photographer.instagramLink || 'https://www.instagram.com/_iampri_nce/';
  const bio = currentLanguage === 'en' 
    ? 'Fine-art photographer based in Kigali, specializing in luxury weddings, narrative portraitures, and modern brand exhibitions across East Africa. We preserve fleeting emotions into everlasting physical visual memories.'
    : 'Umuhanga mu gufata amafoto n’amashusho utuye i Kigali, akorana n’ubukwe bwiza buhanitse, amafoto ateguwe n’imurikagurisha ry’ibigo bitandukanye muri Afurika y’Iburasirazuba. Tubika ibyiyumvo byashize mukubafotora neza.';

  // Highlighted reviews
  const activeFeedbacks = feedbacks.slice(0, 3);

  // Compute stats
  const photoCount = albums.reduce((acc, a) => acc + a.media.length, 0);

  // Format WhatsApp Link
  const whatsAppLink = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    'Hello, I am interested in booking a photography session with you!'
  )}`;

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans animate-fade-in py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Top visual canvas profile layout */}
        <div className="relative rounded-3xl overflow-hidden bg-neutral-800 border border-neutral-800 py-12 px-6 sm:px-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          
          {/* Overlay glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-editorial-tan/10 rounded-full blur-3xl pointer-events-none" />

          {/* Profile Picture */}
          <div className="relative group shrink-0">
            <img 
              src={photographer.avatar} 
              alt={photographer.name}
              className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl object-cover ring-2 ring-editorial-tan shadow-xl transition-transform duration-300 group-hover:scale-103" 
            />
            <div className="absolute -bottom-2 -right-2 bg-editorial-tan text-editorial-dark p-2 rounded-xl shadow-md border border-neutral-900">
              <Camera className="w-4 h-4" />
            </div>
          </div>

          {/* Core Info */}
          <div className="text-center md:text-left space-y-4 flex-1">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#202023] border border-[#2d2d31] text-[10px] font-bold uppercase tracking-widest text-[#C4A484] mb-2 leading-none">
                <Award className="w-3.5 h-3.5" />
                {photographer.studioName || 'Elite Photographer'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif italic text-white font-semibold leading-tight mt-1">
                {photographer.name}
              </h1>
              <p className="text-[11px] font-mono text-neutral-400 mt-1 uppercase tracking-widest">
                Professional Visual Artist • East Africa Signature Suite
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl font-serif italic">
              "{bio}"
            </p>

            {/* Social / Direct triggers */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all shadow cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Client Contact</span>
              </a>

              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-[#2d2d31] bg-[#1e1e24] hover:bg-neutral-800 text-[#C4A484] px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram Profile</span>
              </a>

              <Link
                to="/booking"
                className="flex items-center gap-1.5 rounded-full bg-white hover:bg-editorial-tan text-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all shadow"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Direct Shoot</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic numerical indices cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-sans text-left">
          <div className="bg-neutral-850 border border-neutral-800 rounded-2xl p-5">
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 block font-bold">Creative Range</span>
            <p className="text-3xl font-serif italic text-white mt-1.5">{albums.length}</p>
            <span className="text-[10px] text-[#C4A484] block mt-1 uppercase font-bold tracking-tight">Active Exhibitions</span>
          </div>

          <div className="bg-neutral-850 border border-neutral-800 rounded-2xl p-5">
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 block font-bold">Total Portfolios</span>
            <p className="text-3xl font-serif italic text-white mt-1.5">{photoCount}</p>
            <span className="text-[10px] text-[#C4A484] block mt-1 uppercase font-bold tracking-tight">Delivered Captures</span>
          </div>

          <div className="bg-neutral-850 border border-neutral-800 rounded-2xl p-5">
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 block font-bold">In-Person Experience</span>
            <p className="text-3xl font-serif italic text-white mt-1.5">5+</p>
            <span className="text-[10px] text-[#C4A484] block mt-1 uppercase font-bold tracking-tight">Years Active</span>
          </div>

          <div className="bg-neutral-850 border border-neutral-800 rounded-2xl p-5">
            <span className="text-[9px] uppercase tracking-widest text-neutral-400 block font-bold">Customer Loyalty</span>
            <p className="text-3xl font-serif italic text-white mt-1.5">100%</p>
            <span className="text-[10px] text-[#C4A484] block mt-1 uppercase font-bold tracking-tight">Client Satisfaction</span>
          </div>
        </div>

        {/* Bottom Split panel layouts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main profile editorial columns */}
          <div className="lg:col-span-2 space-y-6 text-left">
            <h3 className="text-lg font-serif italic text-[#C4A484]">Creative Signature & Services</h3>
            <div className="border border-neutral-800 rounded-2xl p-6 bg-[#161618] space-y-4">
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {currentLanguage === 'en' 
                  ? 'We maintain absolute production standards. Using state-of-the-art medium-format digital phase backlights and premium cine-lenses, we customize set environments to produce timeless portraits.' 
                  : 'Dutegura buri gikorwa n-umurava mwinshi. Turinda ko amaso yacu atabona ifoto ikennye maze ugahabwa ifoto ihambaye ushobora no kumanika urufaa.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 font-sans text-xs">
                <div className="flex gap-2 items-start">
                  <Compass className="w-5 h-5 text-editorial-tan shrink-0" />
                  <div>
                    <strong className="text-white block font-bold">Luxury Weddings</strong>
                    <span className="text-neutral-400">Full-day coverage, cinematic stories, private proofs.</span>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <Mail className="w-5 h-5 text-editorial-tan shrink-0" />
                  <div>
                    <strong className="text-white block font-bold">Corporate Galleries</strong>
                    <span className="text-neutral-400">Exhibition keynotes, digital press kits, brand headshots.</span>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <Shield className="w-5 h-5 text-editorial-tan shrink-0" />
                  <div>
                    <strong className="text-white block font-bold">Fine-Art Portraits</strong>
                    <span className="text-neutral-400">Creative studio captures, editor-ready lighting, black/white proofs.</span>
                  </div>
                </div>

                <div className="flex gap-2 items-start">
                  <Award className="w-5 h-5 text-editorial-tan shrink-0" />
                  <div>
                    <strong className="text-white block font-bold">Online Sharing Hub</strong>
                    <span className="text-neutral-400">Instant client portals, feedback submission, smart zip downloads.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Client logs module */}
          <div className="bg-[#161618] border border-neutral-800 rounded-3xl p-6 text-left space-y-5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-neutral-850 pb-3">
              {currentLanguage === 'en' ? 'Verified Client Reviews' : 'Ibitekerezo by’Abahamye'}
            </h4>

            {activeFeedbacks.length === 0 ? (
              <div className="py-8 text-neutral-500 text-xs text-center font-serif italic">
                {currentLanguage === 'en' ? 'No feedback recorded yet. Visit an album to submit!' : 'Nta gitekerezo cyanditswe. Banza wandike ku rurubuga!'}
              </div>
            ) : (
              <div className="space-y-4 font-sans text-xs">
                {activeFeedbacks.map((f) => (
                  <div key={f.id} className="space-y-2 border-b border-neutral-850 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <strong className="text-neutral-200">{f.clientName}</strong>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < f.rating ? 'fill-editorial-tan text-editorial-tan' : 'text-neutral-800'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-400 leading-normal font-serif italic">
                      "{f.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
