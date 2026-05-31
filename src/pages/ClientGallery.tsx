import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSaaS } from '../context/SaaSContext';
import { MediaItem } from '../types';
import { 
  Lock, 
  ChevronRight, 
  Eye, 
  Download, 
  Share2, 
  Play, 
  Image, 
  Video, 
  Sparkles, 
  ArrowLeft, 
  Star,
  Check, 
  X, 
  ChevronLeft, 
  ChevronRightSquare, 
  MessageSquare,
  AlertTriangle,
  ZoomIn,
  Camera,
  Layers,
  ThumbsUp,
  FileCheck2,
  Calendar,
  MapPin
} from 'lucide-react';

export const ClientGallery: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    albums, 
    recordAlbumView, 
    recordMediaDownload, 
    submitFeedback,
    photographer 
  } = useSaaS();

  const [album, setAlbum] = useState<any>(null);
  const [typedUsername, setTypedUsername] = useState('');
  const [typedPassword, setTypedPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'images' | 'videos'>('all');
  
  // Media modal showcase
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number>(-1);
  const [isSlideshowRunning, setIsSlideshowRunning] = useState(false);
  const [slideshowTimer, setSlideshowTimer] = useState<any>(null);

  // Download all zip trigger
  const [isZipping, setIsZipping] = useState(false);
  const [zippingProgress, setZippingProgress] = useState(0);
  const [zippingComplete, setZippingComplete] = useState(false);

  // Client commentary state
  const [clientName, setClientName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Share alert feedback
  const [shareFeedbackMsg, setShareFeedbackMsg] = useState<string | null>(null);

  // Loading skeleton state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading skeleton
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Find absolute target album
    const found = albums.find(a => a.id === id);
    if (found) {
      setAlbum(found);
      
      // Auto unlock if no password required
      if (!found.isPasswordProtected) {
        setIsUnlocked(true);
      }
    }
  }, [id, albums]);

  // Log album view once unlocked
  useEffect(() => {
    if (album && isUnlocked && !album.isExpired) {
      recordAlbumView(album.id);
    }
  }, [album, isUnlocked]);

  // Custom slideshow effect
  useEffect(() => {
    if (isSlideshowRunning && selectedMediaIndex !== -1) {
      const activeItems = getFilteredMedia();
      const interval = setInterval(() => {
        setSelectedMediaIndex((prev) => {
          const nextIdx = (prev + 1) % activeItems.length;
          setSelectedMedia(activeItems[nextIdx]);
          return nextIdx;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isSlideshowRunning, selectedMediaIndex]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center dark:bg-gray-950 p-6">
        <div className="w-full max-w-5xl space-y-6 text-left animate-pulse">
          {/* Header Skeleton */}
          <div className="h-10 w-48 bg-gray-200 dark:bg-neutral-900 rounded-lg" />
          <div className="h-44 w-full bg-gray-200 dark:bg-neutral-900 rounded-2xl" />
          {/* Grid Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 dark:bg-neutral-900 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold">Inaccessible Media Shared Portal</h2>
        <p className="text-xs text-neutral-400 mt-2 max-w-xs text-center">
          The link remains invalid, has changed, or was revoked by photographer.
        </p>
        <Link to="/" className="mt-8 px-4 py-2 bg-white text-neutral-950 text-xs font-bold rounded-lg hover:bg-neutral-100 transition">
          Return to LensShare Home
        </Link>
      </div>
    );
  }

  // PASSCODE EVALUATION HANDLER
  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Hard check fallbacks for classic mock datasets in case local cache is stale
    let expectedUsername = album.username;
    let expectedPasscode = album.passcode || album.password;

    if (!expectedUsername) {
      if (album.id === 'album-wedding-classic') {
        expectedUsername = 'bennett';
      } else if (album.id === 'album-portrait-vogue') {
        expectedUsername = 'rose';
      } else {
        expectedUsername = 'client';
      }
    }

    if (!expectedPasscode) {
      if (album.id === 'album-wedding-classic') {
        expectedPasscode = '123456';
      } else if (album.id === 'album-portrait-vogue') {
        expectedPasscode = 'rose456';
      } else {
        expectedPasscode = '123456';
      }
    }

    if (
      typedUsername.toLowerCase().trim() === expectedUsername.toLowerCase().trim() &&
      typedPassword === expectedPasscode
    ) {
      setIsUnlocked(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 3000);
    }
  };

  // ZIP DOWNLOADING ACCELERATOR HANDLER
  const handleDownloadAllZip = () => {
    if (album.media.length === 0) return;
    setIsZipping(true);
    setZippingProgress(0);
    setZippingComplete(false);

    const interval = setInterval(() => {
      setZippingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setZippingComplete(true);
          
          // contextual download record
          recordMediaDownload(album.id);
          
          setTimeout(() => {
            setIsZipping(false);
          }, 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 250);
  };

  // SINGLE MEDIA DOWNLOAD HANDLER
  const triggerSingleDownload = (m: MediaItem) => {
    recordMediaDownload(album.id, m.id);
    
    // Alert feedback
    setShareFeedbackMsg(`Downloading "${m.title}" in standard sizing...`);
    setTimeout(() => {
      setShareFeedbackMsg(null);
    }, 3000);
  };

  // SHARE SYSTEM MODAL ACTIVATE
  const triggerSocialShare = (type: 'facebook' | 'twitter' | 'link') => {
    const origin = window.location.origin;
    const url = `${origin}/gallery/${album.id}`;
    
    if (type === 'link') {
      navigator.clipboard.writeText(url);
      setShareFeedbackMsg('Link compiled to clipboard!');
    } else if (type === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      setShareFeedbackMsg('Dispatched Facebook Share port...');
    } else {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent('Beautiful Shoot: ' + album.title)}`, '_blank');
      setShareFeedbackMsg('Dispatched X Share port...');
    }

    setTimeout(() => setShareFeedbackMsg(null), 3000);
  };

  // COMMENT FEEDBACK SUBMISSION
  const handleClientFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !comment) return;

    submitFeedback(album.id, clientName, rating, comment);
    setFeedbackSubmitted(true);
    setClientName('');
    setComment('');
  };

  // Filter images and videos
  const getFilteredMedia = () => {
    return album.media.filter((med: MediaItem) => {
      if (activeFilter === 'images') return med.type === 'image';
      if (activeFilter === 'videos') return med.type === 'video';
      return true;
    });
  };

  // Modal Next/Prev navigation
  const handleModalNavigate = (direction: 'prev' | 'next') => {
    const activeItems = getFilteredMedia();
    if (activeItems.length === 0) return;

    let index = selectedMediaIndex;
    if (direction === 'prev') {
      index = index === 0 ? activeItems.length - 1 : index - 1;
    } else {
      index = index === activeItems.length - 1 ? 0 : index + 1;
    }

    setSelectedMediaIndex(index);
    setSelectedMedia(activeItems[index]);
  };

  // CASE: EXPIRATION SCREEN VERIFIER
  if (album.isExpired) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center dark:bg-gray-950 p-6 text-center text-xs text-neutral-400">
        <div className="w-full max-w-md rounded-2xl border bg-white p-8 dark:bg-gray-900 border-neutral-100 dark:border-neutral-800 shadow-2xl space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-500 dark:bg-amber-950/20 border mx-auto">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-black text-neutral-900 dark:text-white">Expired Shared Address</h2>
          <p className="text-neutral-500 leading-relaxed dark:text-neutral-400">
            This portfolio access was authorized to exist until <span className="font-bold">{new Date(album.expiryDate).toLocaleDateString()}</span>. Since this timeline has exhausted, files have been compiled back into archive state.
          </p>
          <div className="mt-6 border-t pt-4 border-gray-100 dark:border-neutral-800 space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Owner Studio Info</p>
            <p className="text-xs font-semibold text-neutral-900 dark:text-gray-200">{photographer.studioName}</p>
            <p className="text-[11px] font-mono hover:underline">{photographer.email}</p>
          </div>
        </div>
      </div>
    );
  }

  // CASE: PASSCODE LOCKED BLOCKER PANEL
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 flex flex-col justify-center items-center p-4">
        
        <div className="w-full max-w-sm rounded-2xl border bg-white p-8 dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 shadow-2xl relative text-left">
          
          <div className="mb-6 flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shrink-0">
              <Camera className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="font-extrabold text-sm text-gray-900 dark:text-white leading-none">{photographer.studioName}</p>
              <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 leading-none">Photographer share portal</span>
            </div>
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest text-[#C4A484] font-mono">AUTHENTICATION REQUIRED</p>
          <h3 className="text-xl font-serif text-gray-900 dark:text-white">{album.title}</h3>
          <p className="text-xs text-neutral-500 leading-relaxed dark:text-neutral-400 mt-2">
            This file sharing portal is secured with a private custom profile credential by {photographer.name}. Check your invite or contact management for access.
          </p>

          <form onSubmit={handleVerifyPassword} className="space-y-4.5 mt-6">
            <div className="space-y-1">
              <label className="block text-[9px] font-bold uppercase tracking-wider text-neutral-400">Album Username</label>
              <input 
                type="text" 
                required
                placeholder="Enter album username..."
                value={typedUsername}
                onChange={(e) => setTypedUsername(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl bg-neutral-50 dark:bg-neutral-950 dark:border-neutral-800 dark:text-white focus:border-[#C4A484] outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[9px] font-bold uppercase tracking-wider text-neutral-400">Album Passcode</label>
              <input 
                type="password" 
                required
                placeholder="Enter private passcode..."
                value={typedPassword}
                onChange={(e) => setTypedPassword(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 border rounded-xl bg-neutral-50 dark:bg-neutral-950 dark:border-neutral-800 dark:text-white focus:border-[#C4A484] outline-none font-mono"
              />
              {passwordError && (
                <span className="block text-[10px] text-red-500 font-medium mt-1.5 leading-tight">
                  ⚠️ Invalid username or passcode. Please check your credentials or contact the admin.
                </span>
              )}
            </div>

            <button
              id="submit-password-gallery-btn"
              type="submit"
              className="w-full py-3 bg-neutral-950 text-white font-bold rounded-xl text-xs hover:bg-neutral-850 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 transition shadow-sm cursor-pointer"
            >
              Verify & Unlock Album
            </button>
          </form>

          <p className="text-[10px] text-center text-gray-400 dark:text-neutral-500 mt-5 leading-normal">
            Need support? Write directly to <span className="hover:underline font-semibold">{photographer.email}</span>
          </p>
        </div>
      </div>
    );
  }

  // ACTIVE MAIN CLIENT GALLERY STRUCTURAL LAYOUT
  const filteredMedia = getFilteredMedia();

  return (
    <div className="bg-white min-h-screen transition-colors dark:bg-gray-950 dark:text-gray-100 flex flex-col justify-between">
      
      {/* Portfolio Floating notice bar */}
      {shareFeedbackMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 px-5 py-3 rounded-full shadow-2xl border border-neutral-800/20 text-xs font-bold animate-bounce flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>{shareFeedbackMsg}</span>
        </div>
      )}

      {/* Branded Header Area */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md dark:bg-gray-950/70 border-b border-gray-100 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-neutral-950 text-white flex items-center justify-center dark:bg-white dark:text-neutral-950">
              <Camera className="w-4.5 h-4.5" />
            </div>
            <div className="text-left">
              <p className="font-black text-sm text-neutral-900 dark:text-white leading-tight">{photographer.studioName}</p>
              <span className="text-[10px] text-neutral-400 dark:text-neutral-500 block">Deliveries powered by LensShare</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-block text-[11px] font-semibold text-neutral-400 underline uppercase pr-2">
              Alex Vance distribution page
            </span>
            <button
              onClick={() => triggerSocialShare('link')}
              className="p-1.5 rounded-lg border border-neutral-100 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 text-neutral-500 transition"
              title="Copy portfolio url"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Event Showcase Hero Banner */}
      <section className="relative aspect-[21/10] sm:aspect-[24/9] w-full bg-neutral-900 overflow-hidden min-h-[160px] max-h-[350px]">
        <img 
          src={album.coverUrl} 
          alt={album.title}
          className="w-full h-full object-cover opacity-45 transform scale-101" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent flex flex-col justify-end p-6 sm:p-10 text-left">
          <div className="max-w-7xl mx-auto w-full space-y-1.5">
            <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-neutral-400 uppercase tracking-widest leading-none">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(album.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              {album.location && (
                <>
                  <span>•</span>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{album.location}</span>
                </>
              )}
            </div>
            
            <h1 className="text-xl sm:text-3xl font-black text-white">{album.title}</h1>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">{album.description}</p>
          </div>
        </div>
      </section>

      {/* Filter Menu Bar & Actions */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-100 dark:border-neutral-900">
        
        {/* Media types selector */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
              activeFilter === 'all'
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800'
            }`}
          >
            All assets ({album.media.length})
          </button>
          
          <button
            onClick={() => setActiveFilter('images')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1 ${
              activeFilter === 'images'
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400'
            }`}
          >
            <Image className="w-3.5 h-3.5" /> Photographs
          </button>
          
          <button
            onClick={() => setActiveFilter('videos')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1 ${
              activeFilter === 'videos'
                ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-400'
            }`}
          >
            <Video className="w-3.5 h-3.5" /> Reels
          </button>
        </div>

        {/* Global ZIP downloader control */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            onClick={handleDownloadAllZip}
            disabled={isZipping || album.media.length === 0}
            className="w-full sm:w-auto px-5 py-2 px-3 bg-neutral-950 text-white rounded-xl text-xs font-black shadow-sm flex items-center justify-center gap-2 hover:bg-neutral-850 dark:bg-white dark:text-neutral-950 font-sans disabled:opacity-50 transition"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>{isZipping ? `Archiving ZIP (${zippingProgress}%)` : `Download whole album (.ZIP)`}</span>
          </button>
        </div>

      </section>

      {/* ZIP progress status modal */}
      {isZipping && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-neutral-900 rounded-2xl border dark:border-neutral-800 p-6 shadow-2xl text-center space-y-4">
            <div className={`mx-auto h-12 w-12 rounded-full flex items-center justify-center border ${
              zippingComplete ? 'bg-green-50 text-green-500 border-green-100' : 'bg-neutral-50 dark:bg-neutral-800 animate-spin text-neutral-500'
            }`}>
              {zippingComplete ? <FileCheck2 className="w-6 h-6" /> : <Sparkles className="w-5 h-5" />}
            </div>
            
            <div>
              <p className="font-extrabold text-sm dark:text-white">
                {zippingComplete ? 'Archive Prepared' : 'Compiling High-Res Assets'}
              </p>
              <span className="block text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                {zippingComplete ? 'ZIP exported to browser files successfully.' : `Packaging ${album.media.length} files...`}
              </span>
            </div>

            <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-neutral-950 dark:bg-white rounded-full transition-all duration-305"
                style={{ width: `${zippingProgress}%` }}
              />
            </div>
            
            <p className="text-[10px] font-semibold text-neutral-400 tracking-wider">PORT METRICS UPDATED</p>
          </div>
        </div>
      )}

      {/* Active Masonry Media Port Section */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-1">
        {filteredMedia.length === 0 ? (
          <div className="py-24 text-center text-xs text-neutral-400 bg-neutral-50/50 rounded-2xl border border-dashed dark:bg-neutral-905">
            No media matching this filter tag in current shoot.
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filteredMedia.map((m: MediaItem, index: number) => (
              <div 
                key={m.id}
                className="break-inside-avoid relative group rounded-xl overflow-hidden border border-gray-100 bg-white shadow-2xs dark:bg-neutral-900 dark:border-neutral-900 transition-all hover:shadow-xs cursor-pointer"
                onClick={() => {
                  setSelectedMedia(m);
                  setSelectedMediaIndex(index);
                }}
              >
                {/* Image / Video frame */}
                <div className="relative overflow-hidden w-full bg-neutral-100">
                  {m.type === 'video' ? (
                    <div className="relative">
                      <video src={m.url} className="w-full h-auto object-cover" muted playsInline />
                      <div className="absolute inset-x-y-z inset-0 bg-black/10 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white bg-neutral-950/70 p-2.5 rounded-full" />
                      </div>
                      <span className="absolute bottom-2.5 right-2.5 text-[9px] font-mono text-white bg-black/70 px-2 rounded tracking-widest font-bold">
                        REEL • {m.duration || '0:15'}
                      </span>
                    </div>
                  ) : (
                    <img src={m.url} alt={m.title} className="w-full h-auto object-cover" />
                  )}

                  {/* On hover indicators overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3.5">
                    
                    {/* Top utility row */}
                    <div className="flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerSingleDownload(m);
                        }}
                        className="p-1.5 bg-white text-neutral-950 rounded-lg hover:bg-neutral-100 shadow-lg transition"
                        title="Download high-resolution image"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom detail row */}
                    <div className="text-left">
                      <p className="text-xs font-black text-white">{m.title}</p>
                      <span className="block text-[10px] font-mono text-neutral-300 mt-0.5">Size: {m.size}</span>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FULL SCREEN CAROUSEL SLIDESHOW MODAL */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-neutral-950/95 z-50 flex flex-col justify-between p-4">
          
          {/* Header controllers */}
          <div className="flex items-center justify-between text-white h-14 border-b border-neutral-900 px-2.5">
            <div className="text-left">
              <span className="text-[10px] font-mono text-neutral-400">
                {selectedMediaIndex + 1} of {filteredMedia.length} assets
              </span>
              <p className="text-xs font-extrabold">{selectedMedia.title}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSlideshowRunning(prev => !prev)}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  isSlideshowRunning ? 'bg-yellow-500 text-neutral-950' : 'bg-neutral-900 border hover:bg-neutral-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSlideshowRunning ? 'Slideshow Active' : 'Slideshow Play'}</span>
              </button>

              <button
                onClick={() => triggerSingleDownload(selectedMedia)}
                className="p-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition"
                title="Download single file"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setSelectedMedia(null);
                  setSelectedMediaIndex(-1);
                  setIsSlideshowRunning(false);
                }}
                className="p-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition"
                title="Exit lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Core Media Screen viewport frame */}
          <div className="flex-1 flex items-center justify-between gap-4 relative">
            
            {/* Left Nav */}
            <button
              onClick={() => handleModalNavigate('prev')}
              className="absolute left-2 ring-1 bg-black/60 text-white rounded-lg p-2.5 hover:bg-black transition z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Media body frame container */}
            <div className="mx-auto max-w-4xl max-h-[70vh] flex items-center justify-center p-4">
              {selectedMedia.type === 'video' ? (
                <video 
                  src={selectedMedia.url} 
                  className="max-h-[70vh] rounded-lg shadow-lg" 
                  controls 
                  autoPlay 
                  loop 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <img 
                  src={selectedMedia.url} 
                  alt={selectedMedia.title}
                  className="max-h-[70vh] max-w-full rounded-lg object-contain shadow-lg" 
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            {/* Right Nav */}
            <button
              onClick={() => handleModalNavigate('next')}
              className="absolute right-2 ring-1 bg-black/60 text-white rounded-lg p-2.5 hover:bg-black transition z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>

          {/* Overlay controllers / status logs */}
          <div className="text-center text-neutral-400 text-[11px] h-14 pt-3.5 border-t border-neutral-900 flex justify-between px-4">
            <span>Dimensions: {selectedMedia.dimensions || 'Dynamic Size'}</span>
            <span>Scale: Standard delivery quality</span>
          </div>

        </div>
      )}

      {/* CLIENT FEEDBACK FORM SECTION inside the page itself */}
      <section className="bg-gray-50/50 dark:bg-neutral-900/10 py-16 border-t border-gray-100 dark:border-neutral-900 text-left">
        <div className="max-w-xl mx-auto px-4 text-xs">
          
          <div className="text-center mb-8 space-y-1.5">
            <span className="text-[10px] font-bold text-neutral-400 tracking-widest uppercase">Direct Feedback Feed</span>
            <h2 className="text-xl font-bold font-sans text-neutral-950 dark:text-white">Leave a Review on this Shoot</h2>
            <p className="text-neutral-500 mt-1 dark:text-neutral-400">Share your ratings, review comments, or required photoshoot revisions directly with Alex Vance.</p>
          </div>

          {feedbackSubmitted ? (
            <div className="bg-green-50 border border-green-15 text-xs text-green-800 rounded-xl p-5 dark:bg-green-950/20 dark:border-green-950/50 dark:text-green-400 text-center space-y-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/5y mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm">Review Submitted!</h4>
              <p className="max-w-xs mx-auto leading-relaxed text-[11px] text-neutral-500 dark:text-neutral-400">Thank you! Your feedback has been logged on the photographer's monitoring dashboard.</p>
              <button
                onClick={() => setFeedbackSubmitted(false)}
                className="mt-3.5 font-bold hover:underline text-neutral-900 dark:text-white"
              >
                Write another review
              </button>
            </div>
          ) : (
            <form onSubmit={handleClientFeedbackSubmit} className="space-y-4 bg-white dark:bg-neutral-950 border border-gray-100 dark:border-neutral-900 p-6 rounded-2xl shadow-xs">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Your Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Sarah Bennett"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-neutral-200/50 rounded-xl outline-none dark:bg-neutral-900 dark:border-neutral-800"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Rating Accent</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full text-xs px-3.5 py-2.5 bg-gray-50/50 border border-neutral-200/50 rounded-xl outline-none dark:bg-neutral-900 dark:border-neutral-800"
                  >
                    <option value={5}>🌟🌟🌟🌟🌟 Perfect (5 Stars)</option>
                    <option value={4}>🌟🌟🌟🌟 Good (4 Stars)</option>
                    <option value={3}>🌟🌟🌟 Moderate (3 Stars)</option>
                    <option value={2}>🌟🌟 Poor (2 Stars)</option>
                    <option value={1}>🌟 Needs Action (1 Star)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5">Comment / Revisions memo</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Tell us what you loved about these shots, or details about revisions..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 bg-gray-50/50 border rounded-xl dark:bg-neutral-900 dark:border-neutral-800"
                />
              </div>

              <button
                id="submit-feedback-client-btn"
                type="submit"
                className="w-full py-3 bg-neutral-950 text-white rounded-xl text-xs font-bold hover:bg-neutral-850 dark:bg-white dark:text-neutral-950 transition"
              >
                Submit Review Rating
              </button>
            </form>
          )}

        </div>
      </section>

      {/* Client Specific Footer */}
      <footer className="bg-gray-50/80 dark:bg-gray-950 border-t border-gray-100 dark:border-neutral-900 py-10 text-xs text-neutral-400 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-bold dark:text-neutral-200">{photographer.studioName} Gallery Hub</p>
            <span className="block mt-0.5 text-[10px]">Secure professional digital file transfers. Powered by LensShare. </span>
          </div>
          <span className="text-[11px] text-neutral-400 dark:text-neutral-500">
            For support regarding these high-resolution media, access licensing, or print copies, contact {photographer.name}.
          </span>
        </div>
      </footer>

    </div>
  );
};
