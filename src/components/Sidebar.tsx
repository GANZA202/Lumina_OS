import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSaaS } from '../context/SaaSContext';
import { 
  LayoutDashboard, 
  FolderPlus, 
  UploadCloud, 
  Grid, 
  CreditCard, 
  HardDrive, 
  Settings, 
  ShieldAlert, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { photographer, albums, t, currentLanguage } = useSaaS();

  // Storage calculation percentage
  const storagePercent = Math.min(100, Math.round((photographer.storageUsed / photographer.storageLimit) * 100));
  
  const navItems = [
    { name: t.dashboard, to: '/dashboard', icon: LayoutDashboard },
    { name: t.myAlbums, to: '/albums', icon: Grid },
    { name: t.uploadHub, to: '/upload', icon: UploadCloud },
    { name: t.pricingPlan, to: '/pricing', icon: CreditCard },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 border-r border-editorial-border bg-editorial-dark flex flex-col p-8 justify-between">
      <div className="space-y-8">
        {/* Navigation Section */}
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-editorial-tan font-bold px-1.5">
            {t.management}
          </p>
          <nav className="space-y-2.5">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-wider transition duration-150 ${
                    isActive
                      ? 'bg-editorial-card text-white border border-editorial-border shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-editorial-card/40'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`w-1.2 h-1.2 rounded-full transition-colors ${isActive ? 'bg-editorial-tan' : 'bg-transparent'}`} />
                    <item.icon className="h-4 w-4 shrink-0 text-editorial-tan/70" />
                    <span className="truncate">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Administration link (if enabled) */}
        <div className="space-y-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-editorial-tan font-bold px-1.5">
            {t.systemControl}
          </p>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold uppercase tracking-wider transition duration-150 ${
                isActive
                  ? 'bg-amber-950/20 text-white border border-[#2A2A2E] shadow-sm'
                  : 'text-amber-500 hover:bg-amber-500/10'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`w-1.2 h-1.2 rounded-full ${isActive ? 'bg-amber-400' : 'bg-transparent'}`} />
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span className="truncate">{t.moderatorSettings}</span>
              </>
            )}
          </NavLink>
        </div>
      </div>

      {/* Storage and Usage Info at bottom */}
      <div className="mt-auto pt-8 border-t border-[#2A2A2E] space-y-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#2A2A2E] shadow-inner">
            <img 
              src={photographer.avatar} 
              alt={photographer.name}
              className="h-full w-full object-cover" 
            />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white leading-tight truncate">{photographer.name}</p>
            <p className="text-[10px] text-editorial-text-muted mt-0.5 truncate">{photographer.studioName}</p>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-400">
            <span className="flex items-center gap-1">
              <HardDrive className="h-3 w-3 text-editorial-tan" />
              {t.cloudStorage}
            </span>
            <span className="font-bold text-white">
              {photographer.storageUsed} / {photographer.storageLimit} GB
            </span>
          </div>

          <div className="h-1.5 w-full bg-[#2A2A2E] rounded-full overflow-hidden">
            <div 
              className="h-full bg-editorial-tan transition-all duration-500"
              style={{ width: `${storagePercent}%` }}
            />
          </div>
          <p className="text-[9px] text-left text-neutral-500 uppercase tracking-tight font-sans">
            {storagePercent}% {t.capacityConsumed}
          </p>
        </div>

        {storagePercent > 75 && (
          <NavLink 
            to="/pricing"
            className="flex items-center justify-between text-[10px] py-1.5 px-3 rounded bg-red-950/20 text-red-400 font-bold hover:underline"
          >
            <span>{t.runningOutSpace}</span>
            <ChevronRight className="w-3 h-3" />
          </NavLink>
        )}
      </div>
    </aside>
  );
};
