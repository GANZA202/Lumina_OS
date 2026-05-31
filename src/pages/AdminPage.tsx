import React, { useState } from 'react';
import { useSaaS } from '../context/SaaSContext';
import { 
  Users, 
  FolderLock, 
  ShieldCheck, 
  Trash2, 
  Sparkles, 
  CheckCircle, 
  SlidersHorizontal,
  HardDrive,
  Eye,
  Settings,
  X,
  BadgeAlert,
  AlertOctagon,
  RefreshCw,
  Search,
  Flag
} from 'lucide-react';

interface MockPhotographerTenant {
  id: string;
  name: string;
  studio: string;
  email: string;
  tier: 'Free' | 'Pro' | 'Studio';
  storage: string;
  active: boolean;
}

export const AdminPage: React.FC = () => {
  const { albums, feedbacks, activityLogs, deleteAlbum, triggerSimulationEvent } = useSaaS();
  
  const [moderateAlbumSearch, setModerateAlbumSearch] = useState('');
  const [isProcessingLog, setIsProcessingLog] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState<string | null>(null);

  // Mock global tenant records
  const [tenantPhotographers, setTenantPhotographers] = useState<MockPhotographerTenant[]>([
    { id: 'usr-1', name: 'Alex Vance (You)', studio: 'LensCraft Studios', email: 'alex.vance@lenscraft.io', tier: 'Pro', storage: '42.8 GB', active: true },
    { id: 'usr-2', name: 'Austin Cole', studio: 'Vogue New York', email: 'austin.cole@vogue.com', tier: 'Studio', storage: '840.1 GB', active: true },
    { id: 'usr-3', name: 'Emily Chang', studio: 'Coastal Wedding Lab', email: 'emily.chang@weddinglab.io', tier: 'Pro', storage: '91.2 GB', active: true },
    { id: 'usr-4', name: 'Marcus Brody', studio: 'Urban Press Agency', email: 'brody@pressagency.org', tier: 'Free', storage: '4.9 GB', active: false },
    { id: 'usr-5', name: 'Leticia Ruiz', studio: 'Ruiz Portrait Co.', email: 'leticia@ruizportraits.com', tier: 'Pro', storage: '12.4 GB', active: true },
  ]);

  const togglePhotographerState = (id: string) => {
    setTenantPhotographers(prev => prev.map(t => {
      if (t.id === id) return { ...t, active: !t.active };
      return t;
    }));
  };

  const handleAdminTriggerSim = () => {
    setIsProcessingLog(true);
    triggerSimulationEvent();
    setTimeout(() => {
      setIsProcessingLog(false);
    }, 450);
  };

  const filteredAlbumsModeration = albums.filter(a => 
    a.title.toLowerCase().includes(moderateAlbumSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 p-3 sm:p-6 lg:p-8 text-left text-xs">
      
      {/* Header element */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-15 dark:border-gray-850 pb-5">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">Moderator Admin Console</h1>
          <p className="text-sm text-neutral-401 text-neutral-400 mt-1 dark:text-neutral-500">
            System-wide storage capacities monitors, independent tenant photographer logs, and assets content moderation panels.
          </p>
        </div>

        {/* Live Simulator button */}
        <button
          onClick={handleAdminTriggerSim}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-amber-300 dark:border-amber-700 bg-amber-500/10 hover:bg-amber-500/20 px-4 py-2.5 text-xs font-bold text-amber-700 dark:text-amber-400 transition"
          title="Inject random mock viewer views and reviews system-wide"
        >
          <Sparkles className={`w-4 h-4 ${isProcessingLog ? 'animate-spin' : ''}`} />
          <span>Inject Guest Activities</span>
        </button>
      </div>

      {/* Global SaaS System Health counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-950 shadow-sm relative overflow-hidden">
          <span className="text-[10px] uppercase font-bold text-neutral-400">Tenant Photographers</span>
          <p className="text-2xl font-black mt-2 text-neutral-900 dark:text-white">1,859</p>
          <span className="block text-[10px] text-green-500 font-semibold mt-1">▲ 14.5% more this month</span>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-950 shadow-sm relative overflow-hidden">
          <span className="text-[10px] uppercase font-bold text-neutral-400">Active Shares Online</span>
          <p className="text-2xl font-black mt-2 text-neutral-900 dark:text-white">{albums.length + 842}</p>
          <span className="block text-[10px] text-neutral-400 dark:text-neutral-500 mt-1">Hosting 184,332 high-res assets</span>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-950 shadow-sm relative overflow-hidden">
          <span className="text-[10px] uppercase font-bold text-neutral-400">Total Cloud Storage</span>
          <p className="text-2xl font-black mt-2 text-neutral-900 dark:text-white">12.8 TB</p>
          <span className="block text-[10px] text-amber-500 font-semibold mt-1">AWS S3 & Cloudinary connected</span>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-950 shadow-sm relative overflow-hidden">
          <span className="text-[10px] uppercase font-bold text-neutral-400">Direct Subscriptions</span>
          <p className="text-2xl font-black mt-2 text-neutral-900 dark:text-white">459 Pro / Studio</p>
          <span className="block text-[10px] text-green-500 font-semibold mt-1">MRR: $12,480 Stripe balance</span>
        </div>
      </div>

      {/* Grid: Photographers & Media Moderations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Photographers listings (2/3 scale) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-gray-901 dark:text-white flex items-center gap-1.5">
              <Users className="w-4.5 h-4.5 text-neutral-402" />
              Manage Independent Tenants ({tenantPhotographers.length} logged)
            </h3>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 dark:bg-gray-950 dark:border-gray-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto text-left">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 dark:bg-neutral-900 text-neutral-400 font-semibold">
                  <tr>
                    <th className="p-3">Photographer Studio Info</th>
                    <th className="p-3">SaaS Tier</th>
                    <th className="p-3">Storage space</th>
                    <th className="p-3 text-center">Security Status</th>
                    <th className="p-3 text-right">Moderator actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-neutral-900">
                  {tenantPhotographers.map((tenant) => (
                    <tr key={tenant.id} className="hover:bg-neutral-50/20 dark:hover:bg-neutral-900/30">
                      <td className="p-3">
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">{tenant.name}</p>
                          <span className="block text-[10px] font-mono text-neutral-400">{tenant.studio} • {tenant.email}</span>
                        </div>
                      </td>
                      <td className="p-3 font-semibold">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          tenant.tier === 'Studio' ? 'bg-amber-100 text-amber-800' : tenant.tier === 'Pro' ? 'bg-indigo-100 text-indigo-800' : 'bg-neutral-100 text-neutral-700'
                        }`}>
                          {tenant.tier}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-semibold">{tenant.storage}</td>
                      <td className="p-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                          tenant.active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${tenant.active ? 'bg-green-500' : 'bg-red-500'}`} />
                          {tenant.active ? 'Active Tenant' : 'Suspended'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => togglePhotographerState(tenant.id)}
                          className={`h-7 px-2 text-[10px] font-bold rounded-lg transition ${
                            tenant.active 
                              ? 'border border-red-200 text-red-500 hover:bg-red-50' 
                              : 'bg-green-950 text-green-300 hover:bg-green-900'
                          }`}
                        >
                          {tenant.active ? 'Suspend Tenant' : 'Activate Access'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Global Content Management System (1/3 scale) */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-950 shadow-sm text-left">
            <span className="font-extrabold text-sm block border-b dark:border-neutral-900 pb-2.5 mb-3.5 flex items-center gap-1.5">
              <FolderLock className="w-4.5 h-4.5 text-neutral-400" />
              Content Moderation
            </span>

            {/* Minor Search */}
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
              <input 
                type="text" 
                placeholder="Search user album catalogs..."
                value={moderateAlbumSearch}
                onChange={(e) => setModerateAlbumSearch(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-neutral-50 dark:bg-neutral-900 rounded-lg outline-none border border-neutral-100 dark:border-neutral-805"
              />
            </div>

            <div className="space-y-3 font-semibold">
              {filteredAlbumsModeration.map((a) => (
                <div key={a.id} className="p-3 bg-neutral-50 dark:bg-neutral-900/40 rounded-xl space-y-1.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-extrabold line-clamp-1 dark:text-neutral-200">{a.title}</p>
                      <span className="block text-[9px] text-neutral-400 font-mono">By Tenant: Alex Vance</span>
                    </div>
                    <button
                      onClick={() => setAlbumToDelete(a.id)}
                      className="p-1 hover:bg-red-50 rounded text-red-500 transition"
                      title="Moderate Delete Album"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  
                  {/* Stats review row */}
                  <div className="flex gap-4 text-[10px] font-mono text-neutral-400 pt-1">
                    <span>Photos: {a.media.length}</span>
                    <span>Views: {a.viewCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick warning */}
          <div className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-800 dark:bg-gray-950 flex gap-3 text-left">
            <AlertOctagon className="w-5 h-5 text-neutral-405 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-neutral-608 dark:text-neutral-300">Moderator Compliance</p>
              <span className="block text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5 leading-normal">
                Always ensure independent photographers remain complaint to DMCA policies regarding uploaded portrait shoots.
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* MODERATION DELETE CONFIRMATION MODAL */}
      {albumToDelete && (
        <div id="delete-admin-confirm-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs text-xs">
          <div className="w-full max-w-sm bg-[#121214] rounded-2xl shadow-2xl border border-red-900/30 overflow-hidden text-white p-6 space-y-5 text-left">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-950/40 border border-red-900/40">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="font-serif italic text-lg text-white">Moderate Delete Album?</h3>
              <p className="text-[11px] text-neutral-400 font-serif leading-normal text-center">
                Are you sure you want to moderate-delete <strong className="text-white">"{albums.find(a => a.id === albumToDelete)?.title}"</strong> system-wide? This action blocks client links instantly.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setAlbumToDelete(null)}
                className="flex-1 px-4 py-2 rounded-full border border-gray-800 text-[9px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (albumToDelete) {
                    deleteAlbum(albumToDelete);
                    setAlbumToDelete(null);
                  }
                }}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-[9px] font-bold uppercase tracking-widest transition cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
