import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Camera, 
  Shield, 
  Share2, 
  Download, 
  Sparkles, 
  Eye, 
  Check, 
  ArrowRight, 
  Video, 
  Lock,
  MessageSquare,
  Zap
} from 'lucide-react';
import { useSaaS } from '../context/SaaSContext';

export const LandingPage: React.FC = () => {
  const { isDarkMode } = useSaaS();

  return (
    <div className="bg-editorial-dark text-[#E0E0E0] font-sans min-h-screen selection:bg-editorial-tan/30">
      {/* Hero Section */}
      <section id="hero-section" className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-36 lg:pt-36 lg:pb-44">
        {/* Subtle decorative mesh background */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-editorial-tan-dark/10 to-editorial-tan/10 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.187rem]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-editorial-card border border-editorial-border px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold text-editorial-tan mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Empowering photographers globally
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl font-serif italic tracking-tight sm:text-5xl md:text-6xl text-white max-w-4xl mx-auto leading-tight"
          >
            Share high-res shoots with clients, <span className="text-editorial-tan not-italic font-sans uppercase tracking-[0.1em] block text-xl sm:text-2xl mt-4">gorgeously & securely</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-base text-editorial-text-muted max-w-2xl mx-auto leading-relaxed"
          >
            The premium media sharing suite designed specifically for professional wedding, portrait, and editorial photographers. Impress clients with bespoke visual grids, protect proofs, and track downloads with surgical precision.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/register"
              className="group flex items-center gap-2.5 rounded-full bg-white px-7 py-3 text-xs font-bold uppercase tracking-widest text-black hover:bg-editorial-tan transition-colors shadow-lg"
            >
              Start Free Trial 
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/login"
              className="rounded-full border border-editorial-border bg-editorial-card px-7 py-3 text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-[#1f1f23] transition-colors"
            >
              Explore Demo Gallery
            </Link>
          </motion.div>
        </div>

        {/* Visual App Sandbox Mockup */}
        <div className="mt-16 sm:mt-20 lg:mt-24 mx-auto max-w-5xl px-4">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-[32px] border border-editorial-border bg-editorial-card p-3 shadow-2xl overflow-hidden"
          >
            <div className="rounded-2xl border border-editorial-border bg-[#09090b] overflow-hidden relative">
              {/* Fake Chrome window pill */}
              <div className="flex items-center gap-1.5 h-10 px-4 bg-editorial-dark border-b border-editorial-border">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <div className="mx-auto text-[10px] uppercase font-mono tracking-wider text-neutral-500 w-64 bg-editorial-card rounded-md py-0.5 border border-editorial-border truncate text-center">
                  lumina.io/gallery/bennett-wedding
                </div>
              </div>

              {/* Cover View */}
              <div className="h-[250px] sm:h-[350px] relative">
                <img 
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200" 
                  alt="Wedding Preview" 
                  className="w-full h-full object-cover grayscale opacity-80"
                />
                <div className="absolute inset-0 bg-[#000]/60 flex flex-col justify-end p-6 sm:p-10 text-left">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#C4A484] font-bold">NAPA VALLEY — SPRING COLLECTION</span>
                  <h2 className="text-2xl sm:text-4xl font-serif italic text-white mt-1">The Bennett Wedding</h2>
                  <p className="text-neutral-300 text-xs mt-1 max-w-md hidden sm:block font-serif">A high-resolution bespoke digital exhibition showcasing sunset romance.</p>
                </div>
              </div>

              {/* Photo grid of premium assets */}
              <div className="p-4 sm:p-6 grid grid-cols-4 gap-2.5 sm:gap-4 bg-editorial-card">
                {[
                  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=300',
                  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=300',
                  'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=300',
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
                ].map((url, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden relative group border border-editorial-border bg-editorial-dark">
                    <img src={url} alt="Grid thumbnail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-20 md:py-28 bg-editorial-dark border-t border-b border-editorial-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-serif italic text-white leading-tight">
              Frictionless publishing tool for your photography
            </h2>
            <p className="mt-4 text-sm text-editorial-text-muted max-w-2xl mx-auto uppercase tracking-wide">
              Everything you need to send, organize, proof, protect, and deliver media files in high fidelity.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-editorial-border bg-editorial-card p-6 shadow-xs relative hover:border-editorial-tan transition-all duration-350">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-editorial-tan text-editorial-dark mb-5">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-serif italic text-white">Seamless Drag & Drop</h3>
              <p className="mt-2.5 text-xs text-editorial-text-muted leading-relaxed">
                Upload batch images and streamable video formats simultaneously. Handles large file sizes effortlessly with live-response progress state indicators.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-editorial-border bg-editorial-card p-6 shadow-xs relative hover:border-editorial-tan transition-all duration-350">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-editorial-tan text-editorial-dark mb-5">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-serif italic text-white">Robust Privacy Locks</h3>
              <p className="mt-2.5 text-xs text-editorial-text-muted leading-relaxed">
                Require security passcodes, toggle public grids, or set expiring access timelines to safeguard private high-end fashion or bridal client portfolios.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-editorial-border bg-editorial-card p-6 shadow-xs relative hover:border-editorial-tan transition-all duration-350">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-editorial-tan text-editorial-dark mb-5">
                <Share2 className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-serif italic text-white">Branded Sharing Hubs</h3>
              <p className="mt-2.5 text-xs text-editorial-text-muted leading-relaxed">
                Generate clean, bespoke online web galleries matching your studio aesthetic. Live status badges ready for professional organic promotion.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-editorial-border bg-editorial-card p-6 shadow-xs relative hover:border-editorial-tan transition-all duration-350">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-editorial-tan text-editorial-dark mb-5">
                <Download className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-serif italic text-white">Instant ZIP Packaging</h3>
              <p className="mt-2.5 text-xs text-editorial-text-muted leading-relaxed">
                Allow clients to select favorite photos or click on a single download button to instantly archive high-resolution original files.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-2xl border border-editorial-border bg-editorial-card p-6 shadow-xs relative hover:border-editorial-tan transition-all duration-350">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-editorial-tan text-editorial-dark mb-5">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-serif italic text-white">Detailed Download Logs</h3>
              <p className="mt-2.5 text-xs text-editorial-text-muted leading-relaxed">
                Track who viewed your album, how many pictures have been downloaded, and exact client session timings in real-time.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-2xl border border-editorial-border bg-editorial-card p-6 shadow-xs relative hover:border-editorial-tan transition-all duration-350">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-editorial-tan text-editorial-dark mb-5">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-serif italic text-white">Direct Feedback Loops</h3>
              <p className="mt-2.5 text-xs text-editorial-text-muted leading-relaxed">
                Clients can comment and review proofs directly in the portal, giving photographers immediate revision feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Matrix */}
      <section id="pricing" className="py-20 md:py-28 bg-editorial-dark border-t border-editorial-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif italic text-white leading-tight">
              Transparent, photographer-centric pricing
            </h2>
            <p className="mt-4 text-xs tracking-wider uppercase text-editorial-tan font-bold">
              No hidden platform fees • Tailored to your studio scale
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="rounded-2xl border border-editorial-border bg-editorial-card p-8 flex flex-col justify-between text-left">
              <div>
                <h3 className="text-xl font-serif italic text-white">Free Plan</h3>
                <p className="text-[11px] text-editorial-text-muted mt-1 leading-normal">For hobbyist photographers starting out.</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-serif italic text-white">$0</span>
                  <span className="text-xs uppercase tracking-wider text-neutral-500 ml-1.5">/ month</span>
                </div>
                <ul className="mt-8 space-y-4 text-xs font-semibold text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-editorial-tan" /> 5 GB High-Res Cloud Storage
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-editorial-tan" /> Create up to 3 Active Albums
                  </li>
                  <li className="flex items-center gap-2 text-neutral-600">
                    <XIcon className="h-4.5 w-4.5 text-neutral-700" /> No Password Protections
                  </li>
                  <li className="flex items-center gap-2 text-neutral-600">
                    <XIcon className="h-4.5 w-4.5 text-neutral-700" /> Client Video Streaming Limit
                  </li>
                </ul>
              </div>
              <Link 
                to="/register" 
                className="mt-8 block w-full rounded-full border border-editorial-border bg-editorial-dark py-3 text-center text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-[#1a1a1f] transition-all"
              >
                Sign Up Free
              </Link>
            </div>

            {/* Pro Plan (Best Value) */}
            <div className="rounded-2xl border-2 border-editorial-tan bg-editorial-card p-8 flex flex-col justify-between text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 rounded-bl-xl bg-editorial-tan text-editorial-dark px-3.5 py-1 text-[9px] font-bold uppercase tracking-widest">
                BEST VALUE
              </div>
              <div>
                <h3 className="text-xl font-serif italic text-white">Pro Plan</h3>
                <p className="text-[11px] text-editorial-text-muted mt-1 leading-normal">Our most popular setup loaded with delivery security features.</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-serif italic text-white">$19</span>
                  <span className="text-xs uppercase tracking-wider text-neutral-500 ml-1.5">/ month</span>
                </div>
                <ul className="mt-8 space-y-4 text-xs font-semibold text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-editorial-tan" /> 100 GB Cloud Storage
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-editorial-tan" /> Unlimited Albums
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-editorial-tan" /> Password Protected Sharing
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-editorial-tan" /> Video Streaming Support
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-editorial-tan" /> Granular Expiry & Action Logs
                  </li>
                </ul>
              </div>
              <Link 
                to="/register" 
                className="mt-8 block w-full rounded-full bg-white py-3 text-center text-xs font-bold uppercase tracking-widest text-black hover:bg-editorial-tan transition-all shadow-md"
              >
                Sign Up for Pro
              </Link>
            </div>

            {/* Studio Plan */}
            <div className="rounded-2xl border border-editorial-border bg-editorial-card p-8 flex flex-col justify-between text-left">
              <div>
                <h3 className="text-xl font-serif italic text-white">Studio Plan</h3>
                <p className="text-[11px] text-editorial-text-muted mt-1 leading-normal">Designed for creative collaborative agencies & studios.</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-serif italic text-white">$49</span>
                  <span className="text-xs uppercase tracking-wider text-neutral-500 ml-1.5">/ month</span>
                </div>
                <ul className="mt-8 space-y-4 text-xs font-semibold text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-editorial-tan" /> 1 TB Premium Cloud Storage
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-editorial-tan" /> Ultimate Team Portals
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-editorial-tan" /> Complete Studio Branding
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4.5 w-4.5 text-editorial-tan" /> Priority 24/7 Support Line
                  </li>
                </ul>
              </div>
              <Link 
                to="/register" 
                className="mt-8 block w-full rounded-full border border-editorial-border bg-[#0f0f11] py-3 text-center text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-editorial-dark transition"
              >
                Get Studio Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 md:py-28 bg-[#09090b] text-white border-t border-b border-editorial-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-14">
            <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-editorial-tan">Artist Recognition</span>
            <h2 className="text-3xl font-serif italic mt-1 sm:text-4xl text-white">
              What photography artists are saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="rounded-xl border border-editorial-border bg-[#121214] p-6 text-left">
              <p className="text-xs text-neutral-300 leading-relaxed italic font-serif">
                "Our clients absolutely love the digital wedding galleries. The slide controls, direct ZIP exports and stunning visual displays look incredibly premium."
              </p>
              <div className="mt-5 flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" alt="Photog profile" className="h-9 w-9 rounded-full object-cover grayscale border border-editorial-border" />
                <div>
                  <h4 className="text-xs font-bold text-white">Julia Vance</h4>
                  <span className="text-[10px] text-editorial-tan font-mono">Bridal Shoot Specialist</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-editorial-border bg-[#121214] p-6 text-left">
              <p className="text-xs text-neutral-300 leading-relaxed italic font-serif">
                "Expiring links are amazing for ensuring licensing compliances. LensShare has automated my delivery pipeline completely. Best $19 I spend every month."
              </p>
              <div className="mt-5 flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Photog profile" className="h-9 w-9 rounded-full object-cover grayscale border border-editorial-border" />
                <div>
                  <h4 className="text-xs font-bold text-white">Austin Cole</h4>
                  <span className="text-[10px] text-editorial-tan font-mono">Editorial Fashion Studio</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-editorial-border bg-[#121214] p-6 text-left">
              <p className="text-xs text-neutral-300 leading-relaxed italic font-serif">
                "The storage metrics and tracking logs are a goldmine. I always know the exact second my corporate clients have compiled their selected images."
              </p>
              <div className="mt-5 flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Photog profile" className="h-9 w-9 rounded-full object-cover grayscale border border-editorial-border" />
                <div>
                  <h4 className="text-xs font-bold text-white">Mia Chang</h4>
                  <span className="text-[10px] text-editorial-tan font-mono">Corporate Events Lead</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-editorial-dark border-t border-editorial-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-xs font-bold tracking-widest text-neutral-500 uppercase">
              © {new Date().getFullYear()} LuminaOS. All rights reserved.
            </p>
            <span className="text-[10px] text-neutral-500 font-serif italic mt-1 block">
              Created and Developed by <strong className="text-neutral-400">Ngendo Prince</strong> (Contact Developer: <a href="tel:0793216848" className="hover:text-[#C4A484] underline font-bold">0793216848</a>) • Commercial-grade distribution suite for creative photographer agencies.
            </span>
          </div>
          <div className="flex gap-6 text-[10px] uppercase font-bold tracking-wider text-neutral-400">
            <Link to="/" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition">Terms of Service</Link>
            <Link to="/" className="hover:text-white transition">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Simple visual X icon
const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="2.5" 
    stroke="currentColor" 
    className={`w-4.5 h-4.5 ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
