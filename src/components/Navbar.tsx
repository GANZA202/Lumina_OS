import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSaaS } from '../context/SaaSContext';
import { Camera, Sun, Moon, LogIn, LogOut, LayoutDashboard, Crown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode, isAuthenticated, isAdmin, photographer, logout, currentLanguage, toggleLanguage, t } = useSaaS();
  const navigate = useNavigate();
  const location = useLocation();

  const isSharedPage = location.pathname.startsWith('/album') || location.pathname.startsWith('/gallery');

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-editorial-border bg-editorial-dark/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-editorial-tan text-editorial-dark shadow-inner transition-transform group-hover:scale-105">
            <Camera className="h-5 w-5" />
          </div>
          <div className="text-left">
            <span className="font-serif italic tracking-tight text-white text-xl">
              Lumina<span className="text-editorial-tan font-sans not-italic font-extrabold ml-0.5">OS</span>
            </span>
            <span className="block text-[8px] font-bold tracking-[0.3em] text-editorial-text-muted uppercase">
              {t.studioSuite}
            </span>
          </div>
        </Link>

        {/* Action Items */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <button
            id="lang-toggle-btn"
            onClick={toggleLanguage}
            className="flex items-center gap-1 border border-editorial-border bg-editorial-card/80 hover:bg-neutral-800 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest text-editorial-tan hover:text-white transition-all cursor-pointer"
            title={currentLanguage === 'en' ? 'Switch to Kinyarwanda' : 'Guhindura mu Cyongereza'}
          >
            <span className={currentLanguage === 'en' ? 'text-white underline font-black font-sans' : 'opacity-65'}>EN</span>
            <span className="text-neutral-600">|</span>
            <span className={currentLanguage === 'rw' ? 'text-white underline font-black font-sans' : 'opacity-65'}>RW</span>
          </button>

          {!isSharedPage && (
            <div className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-neutral-400 mr-4">
              <Link to="/gallery" className="hover:text-white transition">{currentLanguage === 'en' ? 'Bespoke Gallery' : 'Imurikagurisha'}</Link>
              <Link to="/portfolio" className="hover:text-white transition">{currentLanguage === 'en' ? 'Portfolio' : 'Ibyakozwe'}</Link>
              <Link to="/booking" className="hover:text-white transition text-editorial-tan font-bold">{currentLanguage === 'en' ? 'Book Shoot' : 'Kwandikisha'}</Link>
              <Link to="/pricing" className="hover:text-white transition">{currentLanguage === 'en' ? 'Pricing' : 'Ibiciro'}</Link>
              {isAuthenticated && isAdmin && (
                <Link to="/admin" className="hover:text-white transition flex items-center gap-1.5 text-editorial-tan">
                  <Crown className="w-3.5 h-3.5" /> {currentLanguage === 'en' ? 'Moderator Admin' : 'Moderator'}
                </Link>
              )}
            </div>
          )}

          {/* User Auth Info */}
          {isAuthenticated && isAdmin ? (
            <div className="flex items-center gap-3">
              <Link 
                to="/dashboard"
                className="hidden sm:flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-editorial-tan transition shadow-sm"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>{t.dashboard}</span>
              </Link>
              
              <div className="flex items-center gap-2 pl-2 border-l border-editorial-border">
                <img 
                  src={photographer.avatar} 
                  alt={photographer.name}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-editorial-border" 
                />
                <div className="hidden lg:block text-left text-xs">
                  <p className="font-semibold text-neutral-200 leading-3">{photographer.name}</p>
                  <span className="inline-flex items-center rounded-full bg-editorial-card border border-editorial-border px-1.5 py-0.5 text-[8px] font-bold text-editorial-tan mt-1 uppercase leading-none tracking-wider">
                    {photographer.tier === 'Free' ? (currentLanguage === 'en' ? 'Free Plan' : 'Ubuntu') : photographer.tier + ' Plan'}
                  </span>
                </div>
                <button
                  id="auth-logout-btn"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="ml-1 p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition shrink-0 cursor-pointer"
                  title={t.signOut}
                >
                  <LogOut className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          ) : isAuthenticated ? (
            /* Regular authenticated user (no dashboard/admin views) */
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img 
                  src={photographer.avatar} 
                  alt={photographer.name}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-editorial-border" 
                />
                <button
                  id="auth-logout-btn"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="ml-1 p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition shrink-0 cursor-pointer"
                  title={t.signOut}
                >
                  <LogOut className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                to="/login"
                className="flex items-center gap-1.5 rounded-lg border border-editorial-border bg-editorial-card text-neutral-300 hover:text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition"
              >
                <LogIn className="h-4 w-4" />
                <span>{t.signIn}</span>
              </Link>
              <Link 
                to="/register"
                className="hidden sm:flex rounded-full bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-black hover:bg-editorial-tan transition"
              >
                {t.getStarted}
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
