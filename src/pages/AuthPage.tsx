import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useSaaS } from '../context/SaaSContext';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Mail, Lock, User, Briefcase, ChevronLeft, CheckCircle2, ShieldAlert } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login, register, currentLoginError } = useSaaS();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Decide whether to show login or signup initially based on query param / state
  const isRegisterParam = window.location.pathname.includes('register');
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot' | 'reset-success'>(
    isRegisterParam ? 'register' : 'login'
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [studioName, setStudioName] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorLocal('Please provide both email and password.');
      return;
    }
    setErrorLocal(null);
    setIsSubmitting(true);
    
    const success = await login(email, password);
    setIsSubmitting(false);
    if (success) {
      navigate('/dashboard');
    } else {
      setErrorLocal('Incorrect email or password passcode.');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !studioName || !email) {
      setErrorLocal('Please fill in all requested fields.');
      return;
    }
    setErrorLocal(null);
    setIsSubmitting(true);
    
    const success = await register(name, studioName, email);
    setIsSubmitting(false);
    if (success) {
      navigate('/dashboard');
    } else {
      setErrorLocal('Platform error creating account. Try again.');
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorLocal('Please enter your email.');
      return;
    }
    setErrorLocal(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setActiveTab('reset-success');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex dark:bg-gray-950 transition-colors">
      
      {/* LEFT SIDE: Visual Photography Backdrop Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-neutral-900 border-r border-neutral-800 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200" 
            alt="Photographer with model" 
            className="w-full h-full object-cover opacity-35 filter scale-102"
          />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-neutral-950/80" />
        </div>
        
        <div className="relative max-w-lg z-10 text-left">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 font-bold tracking-widest hover:text-white transition uppercase mb-8">
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Landing Page
          </Link>
          
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-neutral-950 shadow-md">
            <Camera className="h-6 w-6" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            "Art is capturing what is fleeting."
          </h2>

          <p className="mt-4 text-base text-neutral-300">
            Join thousands of professional photographers who leverage LensShare to deliver shoots securely, protect work proofs, and grow their corporate and wedding businesses.
          </p>

          <div className="mt-8 border-t border-neutral-800 pt-6 flex items-center gap-4">
            <div className="flex -space-x-2">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" alt="Photog" className="h-8 w-8 rounded-full border-2 border-neutral-900 object-cover" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Photog" className="h-8 w-8 rounded-full border-2 border-neutral-900 object-cover" />
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Photog" className="h-8 w-8 rounded-full border-2 border-neutral-900 object-cover" />
            </div>
            <span className="text-xs font-semibold text-neutral-400">
              Trusted by 5,200+ global independent creators
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Form Center */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16">
        <div className="w-full max-w-sm">
          
          {/* Mobile Back / Logo Layout */}
          <div className="flex items-center justify-between lg:hidden mb-8">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-500 font-bold tracking-wider hover:text-black dark:text-neutral-400 dark:hover:text-white uppercase">
              <ChevronLeft className="w-3.5 h-3.5" /> Back
            </Link>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-950 text-white dark:bg-white dark:text-neutral-950">
              <Camera className="h-4.5 w-4.5" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'login' && (
              <motion.div
                key="login-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-left mb-6">
                  <h3 className="text-2xl font-bold font-sans text-gray-950 dark:text-white">Photographer Portal</h3>
                  <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-1">Access your sharing dashboard and albums analytics</p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Demo tip box */}
                  <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-3 text-xs text-neutral-600 dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-300">
                    <span className="font-bold">✨ Live Demo Access:</span> Feel free to enter any valid email and any passcode (minimum 6 charts) to dynamically spawn an account dashboard! Or use <span className="font-bold dark:text-white">admin@lenscraft.io</span> to explore moderation features.
                  </div>

                  {(errorLocal || currentLoginError) && (
                    <div className="flex items-start gap-2.5 rounded-xl bg-red-50 p-3.5 text-xs font-semibold text-red-800 dark:bg-red-950/20 dark:text-red-400 border border-red-100 dark:border-red-950/50">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorLocal || currentLoginError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@lenscraft.io"
                        className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:ring-white transition shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Passphrase</label>
                      <button 
                        type="button"
                        onClick={() => setActiveTab('forgot')}
                        className="text-xs font-bold text-neutral-400 hover:text-black dark:hover:text-white"
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:ring-white transition shadow-xs"
                      />
                    </div>
                  </div>

                  <button
                    id="submit-login-auth-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-neutral-950 text-white rounded-xl text-sm font-bold shadow-md hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 disabled:opacity-50 transition"
                  >
                    {isSubmitting ? 'Verifying session...' : 'Launch Dashboard'}
                  </button>
                </form>

                <div className="mt-6 text-center text-xs font-medium text-gray-400">
                  New to LensShare?{' '}
                  <button 
                    onClick={() => setActiveTab('register')}
                    className="font-bold text-neutral-900 hover:underline dark:text-white"
                  >
                    Register free portfolio
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'register' && (
              <motion.div
                key="register-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-left mb-6">
                  <h3 className="text-2xl font-bold font-sans text-gray-950 dark:text-white">Create Portfolio</h3>
                  <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-1">Get started with 5 GB free client sharing space</p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {errorLocal && (
                    <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-800 dark:bg-red-950/20 dark:text-red-400 border border-red-100 dark:border-red-950/50">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{errorLocal}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Photographer Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Vance"
                        className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:ring-white transition shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Studio Name / Entity</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                      <input 
                        type="text" 
                        required
                        value={studioName}
                        onChange={(e) => setStudioName(e.target.value)}
                        placeholder="LensCraft Studios"
                        className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:ring-white transition shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Photographer Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@lenscraft.io"
                        className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:ring-white transition shadow-xs"
                      />
                    </div>
                  </div>

                  <button
                    id="submit-register-auth-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-neutral-950 text-white rounded-xl text-sm font-bold shadow-md hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 disabled:opacity-50 transition"
                  >
                    {isSubmitting ? 'Provisioning account...' : 'Create My Free Account'}
                  </button>
                </form>

                <div className="mt-6 text-center text-xs font-medium text-gray-400">
                  Already registered?{' '}
                  <button 
                    onClick={() => setActiveTab('login')}
                    className="font-bold text-neutral-900 hover:underline dark:text-white"
                  >
                    Sign in to panel
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'forgot' && (
              <motion.div
                key="forgot-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-left mb-6">
                  <h3 className="text-2xl font-bold font-sans text-gray-950 dark:text-white">Recover Lock</h3>
                  <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-1">Provide your registered email to reset account passphrases</p>
                </div>

                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  {errorLocal && (
                    <div className="flex items-center gap-2 rounded-xl bg-red-50 p-2 text-xs font-semibold text-red-800 dark:bg-red-950/20 dark:text-red-400 border border-red-100 dark:border-red-950/50">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{errorLocal}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Registered Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@lenscraft.io"
                        className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:ring-white transition shadow-xs"
                      />
                    </div>
                  </div>

                  <button
                    id="submit-forgot-auth-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-neutral-950 text-white rounded-xl text-sm font-bold shadow-md hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 disabled:opacity-50 transition"
                  >
                    {isSubmitting ? 'Checking index...' : 'Email Access Passphrase'}
                  </button>
                </form>

                <div className="mt-6 text-center text-xs font-medium text-gray-400">
                  <button 
                    onClick={() => setActiveTab('login')}
                    className="flex items-center gap-1 mx-auto font-bold text-neutral-900 hover:underline dark:text-white"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Back to Sign In
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'reset-success' && (
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center py-6"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900 mb-5">
                  <CheckCircle2 className="h-7 w-7 text-green-500 fill-green-500/10" />
                </div>
                <h3 className="text-xl font-bold text-gray-950 dark:text-white">Passphrase Dispatched</h3>
                <p className="mt-2.5 text-xs text-gray-500 dark:text-neutral-400 leading-relaxed max-w-xs mx-auto">
                  A simulated email containing a secure link has been sent to <span className="font-semibold dark:text-white">{email}</span>. Click it to verify session access.
                </p>

                <button
                  onClick={() => {
                    setErrorLocal(null);
                    setActiveTab('login');
                  }}
                  className="mt-6 w-full py-2.5 bg-neutral-950 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 transition"
                >
                  Return to Sign In
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
