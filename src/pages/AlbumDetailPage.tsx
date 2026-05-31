import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSaaS } from '../context/SaaSContext';
import { Album, MediaItem } from '../types';
import { 
  ChevronLeft, 
  Settings, 
  Trash2, 
  Calendar, 
  MapPin, 
  Eye, 
  Download, 
  Lock, 
  Globe, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldAlert,
  FileText,
  Star,
  Sparkles,
  Play,
  Upload,
  UserCheck
} from 'lucide-react';

export const AlbumDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    albums, 
    updateAlbum, 
    deleteMediaFromAlbum, 
    activityLogs, 
    feedbacks 
  } = useSaaS();
  
  const navigate = useNavigate();
  const [album, setAlbum] = useState<Album | null>(null);
  
  // Settings modification state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');

  const [copiedLink, setCopiedLink] = useState(false);
  const [isSavedNotify, setIsSavedNotify] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState<MediaItem | null>(null);

  // Sync state with current dynamic context
  useEffect(() => {
    const found = albums.find(a => a.id === id);
    if (found) {
      setAlbum(found);
      setTitle(found.title);
      setDescription(found.description);
      setLocationValue(found.location || '');
      setIsPasswordProtected(found.isPasswordProtected);
      setPassword(found.password || '');
      setUsername(found.username || '');
      setPasscode(found.passcode || found.password || '');
      setIsPrivate(found.isPrivate);
      setExpiryDate(found.expiryDate ? found.expiryDate.split('T')[0] : '');
    } else {
      setAlbum(null);
    }
  }, [id, albums]);

  if (!album) {
    return (
      <div className="p-12 text-center text-xs text-neutral-400">
        <ShieldAlert className="w-8 h-8 text-red-500 mx-auto mb-4" />
        <p className="font-bold">Album catalog not found or expired.</p>
        <Link to="/albums" className="mt-4 inline-block font-semibold underline text-neutral-900 dark:text-white">
          Return to album listings
        </Link>
      </div>
    );
  }

  const copyShareLink = () => {
    const origin = window.location.origin;
    // Client gallery route
    const shareLink = `${origin}/gallery/${album.id}`;
    navigator.clipboard.writeText(shareLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleUpdateSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUsername = username.trim() || album.title.toLowerCase().replace(/[^a-z0-9]/g, '') || 'client';
    const finalPasscode = passcode.trim() || password.trim() || '123456';

    updateAlbum(album.id, {
      title,
      description,
      location: locationValue || undefined,
      isPasswordProtected,
      password: isPasswordProtected ? finalPasscode : undefined,
      username: isPasswordProtected ? finalUsername : undefined,
      passcode: isPasswordProtected ? finalPasscode : undefined,
      isPrivate,
      expiryDate: expiryDate || undefined
    });

    setIsSavedNotify(true);
    setTimeout(() => setIsSavedNotify(false), 2500);
  };

  // Filter logs & feedback of this album specifically
  const albumLogs = activityLogs.filter(l => l.albumId === album.id);
  const albumFeedbacks = feedbacks.filter(f => f.albumId === album.id);

  return (
    <div className="space-y-8 p-3 sm:p-6 lg:p-8 text-left">
      
      {/* Navigation and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-15 dark:border-gray-800 pb-5">
        <div className="flex items-center gap-3">
          <Link 
            to="/albums"
            className="flex h-9 w-9 items-center justify-center rounded-lg border bg-white text-gray-500 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 transition"
          >
            <ChevronLeft className="w-4.5 h-4.5" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-gray-900 dark:text-white sm:text-2xl">{album.title}</h1>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">Control details, modify passcode security levels, view customer comments.</p>
          </div>
        </div>

        {/* Copy Share / External Link */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={copyShareLink}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-white transition shadow-sm"
          >
            {copiedLink ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            <span>{copiedLink ? 'Copied client link!' : 'Copy gallery URL'}</span>
          </button>

          <Link
            to={`/gallery/${album.id}`}
            target="_blank"
            className="flex items-center gap-1.5 rounded-xl bg-neutral-950 px-4 py-2.5 text-xs font-bold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 transition shadow-sm"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open gallery grid</span>
          </Link>
        </div>
      </div>

      {/* Main Configurations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column (2/3 size): Settings Form & Media Stream list */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Saved notification banner */}
          {isSavedNotify && (
            <div className="bg-green-50 border border-green-15 text-xs text-green-800 rounded-xl p-3.5 dark:bg-green-950/20 dark:border-green-950/50 dark:text-green-400 flex items-center gap-2 font-semibold">
              <Check className="w-4.5 h-4.5 text-green-500" />
              <span>Sharing parameters saved successfully. Simulated link updated.</span>
            </div>
          )}

          {/* Configuration Settings Box */}
          <div className="rounded-xl border border-gray-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-950 shadow-sm text-xs">
            <h3 className="font-extrabold text-sm mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <Settings className="w-4.5 h-4.5 text-neutral-400 font-bold" />
              Port Configurations
            </h3>

            <form onSubmit={handleUpdateSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Shoot Album Title</label>
                  <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-neutral-50/50 border border-neutral-200/50 rounded-xl dark:bg-neutral-900 dark:border-neutral-850 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Event Location</label>
                  <input 
                    type="text" 
                    value={locationValue}
                    onChange={(e) => setLocationValue(e.target.value)}
                    placeholder="Grand Plaza Studio"
                    className="w-full text-xs px-3 py-2 bg-neutral-50/50 border border-neutral-200/50 rounded-xl dark:bg-neutral-900 dark:border-neutral-850 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Platform Client Memo/Notes</label>
                <textarea 
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-neutral-50/50 border border-neutral-200/50 rounded-xl dark:bg-neutral-900 dark:border-neutral-850 dark:text-white"
                />
              </div>

              <div className="border-t border-gray-100 dark:border-neutral-900 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Security and Expired Settings */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block font-bold">Passphrase Lock Status</span>
                      <span className="text-[10px] text-gray-400 dark:text-neutral-500">Require code for gallery views</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={isPasswordProtected}
                      onChange={(e) => setIsPasswordProtected(e.target.checked)}
                      className="h-4.5 w-4.5"
                    />
                  </div>

                  {isPasswordProtected && (
                    <div className="space-y-3.5 p-3 rounded-xl border border-dashed border-[#C4A484]/30 bg-neutral-900/30">
                      <div>
                        <label className="block text-[9px] font-bold text-[#C4A484] uppercase tracking-wider mb-1 font-sans">Custom Album Username</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. bennett"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-gray-250 rounded-lg dark:bg-neutral-950 dark:border-neutral-800 dark:text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-editorial-tan"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-[#C4A484] uppercase tracking-wider mb-1 font-sans">Custom Album Passcode</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. 123456"
                          value={passcode}
                          onChange={(e) => {
                            setPasscode(e.target.value);
                            setPassword(e.target.value);
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-gray-250 rounded-lg dark:bg-neutral-950 dark:border-neutral-800 dark:text-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-editorial-tan"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block font-bold">Client Gallery Expiration</span>
                      <span className="text-[10px] text-gray-400 dark:text-neutral-500">Automatically block stream downloads</span>
                    </div>
                  </div>
                  <input 
                    type="date" 
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-1.5 bg-neutral-100 border rounded-lg dark:bg-neutral-900 dark:border-neutral-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Private Switch */}
              <div className="border-t border-gray-15 dark:border-neutral-900 pt-3 flex items-center justify-between">
                <div>
                  <span className="block font-bold">Hide Album from Public Portfolio List</span>
                  <span className="text-[10px] text-gray-400 dark:text-neutral-500">If active, clients can only access via direct url</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="h-4.5 w-4.5"
                />
              </div>

              <div className="border-t border-gray-15 dark:border-neutral-900 pt-4 flex justify-end">
                <button
                  id="submit-update-album-detail-btn"
                  type="submit"
                  className="px-5 py-2.5 bg-neutral-950 text-white font-bold rounded-xl hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 transition shadow-sm"
                >
                  Save Sharing Port Details
                </button>
              </div>
            </form>
          </div>

          {/* Media Items Catalog segment list */}
          <div className="rounded-xl border border-gray-105 bg-white p-6 dark:border-gray-800 dark:bg-gray-950 shadow-sm text-left">
            <div className="flex items-center justify-between border-b pb-3 mb-4 dark:border-neutral-900">
              <h3 className="font-extrabold text-sm text-gray-900 dark:text-white">Uploaded Shoots ({album.media.length} files)</h3>
              <Link to="/upload" className="font-semibold text-xs text-neutral-400 hover:underline flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" /> Upload more shoots &rarr;
              </Link>
            </div>

            {album.media.length === 0 ? (
              <div className="py-8 text-center text-xs text-neutral-400 dark:text-neutral-500">
                No visual assets found in this album. Drag or simulate files in the upload screen to preview!
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {album.media.map((med) => (
                  <div key={med.id} className="relative group rounded-lg overflow-hidden border border-gray-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900/40">
                    
                    {/* Image or Video preview representation */}
                    <div className="aspect-[16/10] bg-neutral-100 relative">
                      {med.type === 'video' ? (
                        <div className="w-full h-full relative">
                          <video src={med.url} className="w-full h-full object-cover" muted playsInline />
                          <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center bg-black/3c">
                            <Play className="w-5 h-5 text-white bg-black/60 p-1.5 rounded-full" />
                          </div>
                          <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-neutral-900/80 px-1.5 rounded font-medium text-white tracking-widest">
                            {med.duration || '0:15'}
                          </span>
                        </div>
                      ) : (
                        <img src={med.url} alt={med.title} className="w-full h-full object-cover" />
                      )}
                    </div>

                    {/* Metadata view info */}
                    <div className="p-2.5 text-xs text-left">
                      <p className="font-bold line-clamp-1 dark:text-neutral-200">{med.title}</p>
                      <div className="flex items-center justify-between text-[10px] text-neutral-400 font-medium mt-1">
                        <span>{med.size}</span>
                        <span className="flex items-center gap-0.5"><Download className="w-2.5 h-2.5" /> {med.downloadCount}</span>
                      </div>
                    </div>

                    {/* Deletion on-hover element */}
                    <button
                      onClick={() => setMediaToDelete(med)}
                      className="absolute top-1.5 right-1.5 p-1 bg-white border border-red-100 hover:bg-red-50 text-red-500 rounded-md shadow-xs transition"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right column (1/3 size): Specific view logs, feedbacks, analytics */}
        <div className="space-y-6">
          
          {/* Quick Metrics */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-950 shadow-sm text-left text-xs space-y-4">
            <span className="font-bold text-sm block border-b dark:border-neutral-900 pb-2.5">Specific Performance</span>
            
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-neutral-50 dark:bg-neutral-900/40 p-3 rounded-lg">
                <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">Views</span>
                <span className="text-xl font-bold dark:text-white block mt-1.5">{album.viewCount}</span>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-900/40 p-3 rounded-lg">
                <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">Downloads</span>
                <span className="text-xl font-bold dark:text-white block mt-1.5">{album.downloadCount}</span>
              </div>
            </div>
          </div>

          {/* Feedback left directly */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-950 shadow-sm text-left text-xs">
            <span className="font-bold text-sm block border-b dark:border-neutral-900 pb-2.5 mb-3.5 flex items-center gap-1">
              <UserCheck className="w-4 h-4 text-neutral-400" />
              Client Reviews Stream
            </span>

            {albumFeedbacks.length === 0 ? (
              <p className="text-neutral-400 text-center py-4">No reviews have been left on this shoot yet.</p>
            ) : (
              <div className="space-y-4">
                {albumFeedbacks.map((f) => (
                  <div key={f.id} className="border-b last:border-b-0 dark:border-neutral-900 pb-3 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-neutral-800 dark:text-neutral-200">{f.clientName}</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < f.rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-500 dark:text-slate-400 leading-normal mt-1.5 font-medium italic">
                      "{f.comment}"
                    </p>
                    <span className="text-[9px] font-mono text-neutral-400 block mt-1">
                      {new Date(f.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Log for this specific Album */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 dark:border-gray-800 dark:bg-gray-950 shadow-sm text-left text-xs">
            <span className="font-bold text-sm block border-b dark:border-neutral-900 pb-2.5 mb-3.5">Audit Action Trails</span>
            {albumLogs.length === 0 ? (
              <p className="text-neutral-400 text-center py-4">Sharing logs are clear.</p>
            ) : (
              <div className="space-y-3 font-mono text-[10px] leading-relaxed">
                {albumLogs.slice(0, 10).map((log) => (
                  <div key={log.id} className="pb-2 border-b border-gray-50 dark:border-neutral-900 last:border-0 last:pb-0">
                    <p className="font-bold text-gray-900 dark:text-white">{log.details}</p>
                    <div className="flex justify-between items-center text-neutral-400 dark:text-neutral-500 mt-0.5">
                      <span>IP: {log.ipAddress}</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MEDIA DELETE CONFIRMATION MODAL */}
      {mediaToDelete && (
        <div id="delete-media-confirm-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs text-xs">
          <div className="w-full max-w-sm bg-[#121214] rounded-2xl shadow-2xl border border-red-900/30 overflow-hidden text-white p-6 space-y-5 text-left">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-950/40 border border-red-900/40">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="font-serif italic text-lg text-white">Remove Asset from Gallery?</h3>
              <p className="text-[11px] text-neutral-400 font-serif leading-normal text-center">
                Are you sure you want to delete <strong className="text-white">"{mediaToDelete.title}"</strong> from this shared album? The asset will be permanently removed.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setMediaToDelete(null)}
                className="flex-1 px-4 py-2 rounded-full border border-gray-800 text-[9px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteMediaFromAlbum(album.id, mediaToDelete.id);
                  setMediaToDelete(null);
                }}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-[9px] font-bold uppercase tracking-widest transition cursor-pointer"
              >
                Delete Asset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
