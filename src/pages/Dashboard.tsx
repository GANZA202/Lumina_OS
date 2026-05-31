import React, { useState } from 'react';
import { useSaaS } from '../context/SaaSContext';
import { Link } from 'react-router-dom';
import { 
  Eye, 
  Download, 
  Folder, 
  Star, 
  Copy, 
  Check, 
  ExternalLink,
  Activity,
  MessageSquare,
  Sparkles,
  Search,
  Plus,
  Settings
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    photographer, 
    albums, 
    activityLogs, 
    feedbacks, 
    triggerSimulationEvent,
    updatePhotographer,
    t,
    currentLanguage
  } = useSaaS();

  const [searchQuery, setSearchQuery] = useState('');
  const [copiedAlbumId, setCopiedAlbumId] = useState<string | null>(null);

  // Studio profile edit form state
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState(photographer.whatsappNumber || '250725891435');
  const [instagramLink, setInstagramLink] = useState(photographer.instagramLink || 'https://www.instagram.com/_iampri_nce/');
  const [phoneContact, setPhoneContact] = useState(photographer.phoneContact || '+250 793 216 848');
  const [websiteURL, setWebsiteURL] = useState(photographer.websiteURL || '0793216848');
  
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      updatePhotographer({
        whatsappNumber,
        instagramLink,
        phoneContact,
        websiteURL
      });
      setIsSaving(false);
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
        setShowSettingsModal(false);
      }, 1500);
    }, 800);
  };

  // Download Traffic Activity as CSV
  const downloadLogsCSV = () => {
    if (!activityLogs || activityLogs.length === 0) {
      alert("No activity traffic history available to export yet.");
      return;
    }

    // CSV Headers
    const headers = ['Log ID', 'Timestamp', 'Activity Type', 'Album / Exhibition', 'Event Description', 'Client IP Address'];

    // CSV Rows conversion
    const rows = activityLogs.map(log => [
      log.id,
      new Date(log.timestamp).toISOString(),
      log.type.toUpperCase(),
      `"${log.albumTitle.replace(/"/g, '""')}"`,
      `"${log.details.replace(/"/g, '""')}"`,
      log.ipAddress
    ]);

    // Construct comma-separated text
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create safe client-side blob download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', url);
    downloadLink.setAttribute('download', `lumina_exhibition_traffic_logs_${new Date().toISOString().split('T')[0]}.csv`);
    downloadLink.style.visibility = 'hidden';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Compute stats
  const totalAlbums = albums.length;
  const totalViews = albums.reduce((acc, a) => acc + a.viewCount, 0);
  const totalDownloads = albums.reduce((acc, a) => acc + a.downloadCount, 0);
  const totalPhotos = albums.reduce((acc, a) => acc + a.media.length, 0);
  
  const avgRating = feedbacks.length > 0
    ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1)
    : '5.0';

  const copyShareLink = (albumId: string) => {
    const origin = window.location.origin;
    const shareLink = `${origin}/album/${albumId}`;
    navigator.clipboard.writeText(shareLink);
    setCopiedAlbumId(albumId);
    setTimeout(() => setCopiedAlbumId(null), 2000);
  };

  // Find most active albums
  const sortedAlbums = [...albums].sort((a, b) => b.viewCount - a.viewCount);

  // Filter logs and feedback
  const recentLogs = activityLogs.slice(0, 5);
  const recentFeedbacks = feedbacks.slice(0, 3);

  return (
    <div className="space-y-8 p-3 sm:p-6 lg:p-8 bg-editorial-dark min-h-screen animate-fade-in font-sans">
      {/* Welcome Hero Grid */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A2A2E] pb-6">
        <div>
          <h1 className="text-3xl font-serif italic text-white leading-tight">
            {t.overviewTitle} • {photographer.name.split(' ')[0]}
          </h1>
          <p className="text-xs text-editorial-text-muted uppercase tracking-wider mt-1">
            {t.overviewSub}
          </p>
        </div>

        {/* Live Simulator & Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowSettingsModal(true)}
            className="flex items-center gap-1.5 rounded-full border border-editorial-border bg-editorial-card hover:bg-neutral-800 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#C4A484] hover:text-white transition cursor-pointer"
            title="Edit Photographer & Studio Details Form"
          >
            <Settings className="h-3.5 w-3.5" />
            <span>Studio Profile Settings</span>
          </button>

          <button
            onClick={triggerSimulationEvent}
            className="flex items-center gap-1.5 rounded-full border border-dashed border-[#C4A484]/40 bg-[#1e1e24] hover:bg-neutral-800 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#C4A484] transition cursor-pointer"
            title={currentLanguage === 'en' ? 'Create simulated viewer page visits, comments, or download selections' : 'Kora ibikorwa by’abakiliya by’amoko ku buryo bwa simulation'}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {currentLanguage === 'en' ? 'Simulate Client Activity' : 'Gerageza Igikorwa cy\'Umukiliya'}
          </button>
          
          <Link
            to="/albums?create=true"
            className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-black hover:bg-editorial-tan transition shadow-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            {t.createAlbum}
          </Link>
        </div>
      </div>

      {/* Analytics Bento Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="rounded-2xl border border-editorial-border bg-editorial-card p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-editorial-tan">
            <span className="text-[10px] font-bold uppercase tracking-widest">{t.statAlbums}</span>
            <Folder className="h-4.5 w-4.5" />
          </div>
          <p className="mt-3.5 text-3xl font-serif italic text-white">{totalAlbums}</p>
          <span className="text-[10px] text-editorial-text-muted block mt-1 uppercase tracking-tight">
            {totalPhotos} {currentLanguage === 'en' ? 'high-res assets active' : 'amashusho arimo ku mugaragaro'}
          </span>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-editorial-border bg-editorial-card p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-editorial-tan">
            <span className="text-[10px] font-bold uppercase tracking-widest">{t.statViews}</span>
            <Eye className="h-4.5 w-4.5" />
          </div>
          <p className="mt-3.5 text-3xl font-serif italic text-white">
            {totalViews.toLocaleString()}
          </p>
          <span className="text-[10px] text-editorial-text-muted block mt-1 uppercase tracking-tight">
            {currentLanguage === 'en' ? 'Across online portfolio links' : 'Muri rusange ku mbuga zose'}
          </span>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-editorial-border bg-editorial-card p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-editorial-tan">
            <span className="text-[10px] font-bold uppercase tracking-widest">{t.statDownloads}</span>
            <Download className="h-4.5 w-4.5" />
          </div>
          <p className="mt-3.5 text-3xl font-serif italic text-white">
            {totalDownloads.toLocaleString()}
          </p>
          <span className="text-[10px] text-editorial-text-muted block mt-1 uppercase tracking-tight">
            {currentLanguage === 'en' ? 'Zip archives & physical tracks' : 'Muri rusange ku makuru yakuweho'}
          </span>
        </div>

        {/* Card 4 */}
        <div className="rounded-2xl border border-editorial-border bg-editorial-card p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-editorial-tan">
            <span className="text-[10px] font-bold uppercase tracking-widest">Feedback rating</span>
            <Star className="h-4.5 w-4.5 text-editorial-tan" />
          </div>
          <p className="mt-3.5 text-3xl font-serif italic text-white">{avgRating} <span className="text-sm text-neutral-500">/ 5.0</span></p>
          <span className="text-[10px] text-editorial-text-muted block mt-1 uppercase tracking-tight">
            Based on {feedbacks.length} {currentLanguage === 'en' ? 'client reviews' : 'ibitekerezo by’abakiliya'}
          </span>
        </div>
      </div>

      {/* Main Grid Content Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column Left (2/3 size): Recent Albums Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300">
              {currentLanguage === 'en' ? 'Active Albums Overview' : 'Incamake ya Alubumu Zikoreshwa'}
            </h3>
            <Link to="/albums" className="text-[10px] uppercase tracking-widest font-bold text-editorial-tan hover:text-white transition-colors">
              {currentLanguage === 'en' ? 'Manage all albums' : 'Genzura alubumu zose'} &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {albums.slice(0, 4).map((album) => (
              <div 
                key={album.id}
                className="group rounded-xl border border-editorial-border bg-editorial-card p-4 flex flex-col justify-between transition-all duration-300 hover:border-editorial-tan"
              >
                <div>
                  {/* Thumbnail / Image with overlay */}
                  <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-neutral-900 relative mb-3 border border-editorial-border">
                    <img 
                      src={album.coverUrl} 
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 opacity-90" 
                    />
                    {album.isPasswordProtected && (
                      <span className="absolute top-2 right-2 bg-neutral-950/85 border border-[#444] text-[8px] text-editorial-tan px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                        {t.secure}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-[#C4A484] uppercase">
                      {album.date} — {album.media.length} {t.items}
                    </span>
                    <h4 className="font-serif italic text-white text-lg mt-1 truncate">
                      {album.title}
                    </h4>
                    <p className="text-[11px] text-editorial-text-muted mt-1 line-clamp-2 leading-relaxed">
                      {album.description}
                    </p>
                  </div>
                </div>

                {/* Info Controls */}
                <div className="mt-5 border-t border-[#2A2A2E] pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-editorial-tan/70" /> {album.viewCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3.5 h-3.5 text-editorial-tan/70" /> {album.downloadCount}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Share Link button */}
                    <button
                      onClick={() => copyShareLink(album.id)}
                      className="inline-flex h-7 px-2.5 items-center gap-1 bg-[#121214] text-neutral-300 hover:bg-neutral-800 border border-editorial-border text-[9px] font-bold uppercase tracking-wider rounded-lg transition cursor-pointer"
                      title={currentLanguage === 'en' ? 'Copy Public Sharing Link' : 'Koporora Ihuza rya Alubumu'}
                    >
                      {copiedAlbumId === album.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>{currentLanguage === 'en' ? 'Copied' : 'Byakoporowe'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>{t.link}</span>
                        </>
                      )}
                    </button>

                    <Link
                      to={`/album/${album.id}`}
                      className="inline-flex h-7 w-7 items-center justify-center bg-[#121214] text-neutral-300 hover:bg-neutral-800 border border-editorial-border rounded-lg transition"
                      title="Preview Share Portal"
                      target="_blank"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Column Right (1/3 size): Real-time Feeds Timeline */}
        <div className="space-y-6 font-sans">
          {/* Side Module 1: Activity Logs Feed */}
          <div className="rounded-2xl border border-editorial-border bg-editorial-card p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-[#2A2A2E] pb-3">
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white">
                <Activity className="h-4 w-4 text-editorial-tan" />
                {t.liveFeedTracker}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={downloadLogsCSV}
                  className="flex items-center gap-1.5 rounded-full bg-[#1e1e24] hover:bg-neutral-800 border border-editorial-border px-3 py-1 text-[9.5px] font-bold uppercase tracking-widest text-[#C4A484] hover:text-white transition-all duration-250 shrink-0 cursor-pointer"
                  title="Download and Export CSV Traffic History"
                >
                  <Download className="w-3 h-3 text-editorial-tan" />
                  <span>{t.downloadCSV}</span>
                </button>
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {recentLogs.map((log) => (
                <div key={log.id} className="relative pl-4 border-l-2 border-editorial-border text-left text-xs">
                  <div className="flex justify-between items-start">
                    <p className="font-serif italic text-white text-sm truncate">{log.albumTitle}</p>
                    <span className="text-[9px] text-[#C4A484] font-mono">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-editorial-text-muted mt-1 leading-normal">{log.details}</p>
                  <span className="block text-[9px] font-mono text-neutral-600 mt-1 uppercase">
                    IP Address: {log.ipAddress}
                  </span>
                </div>
              ))}
              {recentLogs.length === 0 && (
                <p className="text-xs text-neutral-400 italic text-center py-4">{t.noRecentActivity}</p>
              )}
            </div>
          </div>

          {/* Side Module 2: Client Reviews Stream */}
          <div className="rounded-2xl border border-editorial-border bg-editorial-card p-5 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white mb-4 border-b border-[#2A2A2E] pb-3">
              <MessageSquare className="h-4 w-4 text-editorial-tan" />
              {currentLanguage === 'en' ? 'Recent Client Reviews' : 'Ibisubizo bya vuba by’Abakiliya'}
            </div>

            <div className="space-y-4">
              {recentFeedbacks.map((f) => {
                const albumTitle = albums.find(a => a.id === f.albumId)?.title || 'Shared Album';
                return (
                  <div key={f.id} className="text-left text-xs border-b border-[#2A2A2E] pb-3 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-200">{f.clientName}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < f.rating ? 'fill-editorial-tan text-editorial-tan' : 'text-neutral-800'}`} />
                        ))}
                      </div>
                    </div>
                    <span className="text-[9px] font-serif italic text-editorial-tan block mt-0.5">on {albumTitle}</span>
                    <p className="text-[11px] text-[#A1A1AA] leading-normal mt-1.5 font-serif italic">
                      "{f.comment}"
                    </p>
                  </div>
                );
              })}
              {recentFeedbacks.length === 0 && (
                <p className="text-xs text-neutral-400 italic text-center py-4">No client feedbacks submitted yet.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* STUDIO PROFILE EDIT SETTINGS MODAL */}
      {showSettingsModal && (
        <div id="studio-settings-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs text-xs text-white">
          <div className="w-full max-w-sm bg-[#121214] rounded-2xl shadow-2xl border border-editorial-border overflow-hidden p-6 space-y-4 text-left relative">
            <button 
              type="button"
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition cursor-pointer p-1 font-mono text-sm leading-none"
            >
              ✕
            </button>

            <div className="space-y-1">
              <h3 className="font-serif italic text-lg text-white">Studio Profile Settings</h3>
              <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">
                Update MTN Mobile Money, WhatsApp number, Instagram profile URL, and phone contact details instantly.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-3.5">
              <div className="space-y-1">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#C4A484]">WhatsApp Contact Number</label>
                <input 
                  type="text" 
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="e.g. 250725891435"
                  className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-editorial-border text-[11px] outline-none focus:border-editorial-tan text-white font-mono"
                  required
                />
                <span className="block text-[8px] text-neutral-500 font-sans leading-none">
                  Target MTN/wa.me link number directly in Rwanda format (e.g. 250725891435).
                </span>
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#C4A484]">Instagram Link</label>
                <input 
                  type="url" 
                  value={instagramLink}
                  onChange={(e) => setInstagramLink(e.target.value)}
                  placeholder="e.g. https://www.instagram.com/_iampri_nce/"
                  className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-editorial-border text-[11px] outline-none focus:border-editorial-tan text-white font-mono"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#C4A484]">Public Phone Contact</label>
                <input 
                  type="text" 
                  value={phoneContact}
                  onChange={(e) => setPhoneContact(e.target.value)}
                  placeholder="e.g. +250 793 216 848"
                  className="w-full px-3 py-1.5 rounded-lg bg-neutral-900 border border-editorial-border text-[11px] outline-none focus:border-editorial-tan text-white font-mono"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-bold uppercase tracking-wider text-[#C4A484]">Website Address / Display Number</label>
                <input 
                  type="text" 
                  value={websiteURL}
                  onChange={(e) => setWebsiteURL(e.target.value)}
                  placeholder="e.g. 0793216848"
                  className="w-full px-3 py-1.5 rounded-lg bg-[#1a1a1f] border border-editorial-border text-[11px] outline-none focus:border-editorial-tan text-white font-mono"
                  required
                />
              </div>

              {/* Developer branding and information */}
              <div className="border-t border-[#2A2A2E] pt-3 flex items-center justify-between text-[10px] text-neutral-500 font-serif">
                <span>Created by <strong className="text-white hover:text-editorial-tan transition">Ngendo Prince</strong></span>
                <span>Contact: <a href="tel:0793216848" className="underline font-sans text-neutral-400 hover:text-white">0793216848</a></span>
              </div>

              <div className="flex items-center gap-2 pt-2.5">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="flex-1 px-4 py-2 rounded-full border border-editorial-border text-[9px] font-bold uppercase tracking-widest text-[#A1A1AA] hover:text-white transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 px-4 py-2 bg-white hover:bg-neutral-200 text-black font-bold rounded-full text-[9px] uppercase tracking-widest transition cursor-pointer"
                >
                  {isSaving ? 'Saving...' : successMsg ? 'Saved ✓' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
