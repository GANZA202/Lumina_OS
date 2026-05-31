import React, { useState, useMemo } from 'react';
import { useSaaS } from '../context/SaaSContext';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Eye, Maximize2, X, Image as ImageIcon, Video, Layers, Search, Calendar, ChevronRight } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { albums, t, currentLanguage } = useSaaS();
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'albums'>('all');
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Lightbox preview State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flattened media items with parent album reference
  const allMediaItems = useMemo(() => {
    const list: Array<{
      id: string;
      albumId: string;
      albumTitle: string;
      type: 'image' | 'video';
      url: string;
      title: string;
      size: string;
      dimensions?: string;
      duration?: string;
    }> = [];

    albums.forEach(album => {
      // Show only if not expired and not private for general gallery
      if (!album.isExpired && !album.isPrivate) {
        album.media.forEach(m => {
          list.push({
            ...m,
            albumTitle: album.title
          });
        });
      }
    });
    return list;
  }, [albums]);

  // Filtered Media List
  const filteredMedia = useMemo(() => {
    return allMediaItems.filter(item => {
      // Album Match
      const matchesAlbum = selectedAlbumId === 'all' || item.albumId === selectedAlbumId;
      
      // Type Match
      const matchesType = 
        filter === 'all' || 
        (filter === 'image' && item.type === 'image') || 
        (filter === 'video' && item.type === 'video');

      // Search query Match
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.albumTitle.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesAlbum && matchesType && matchesSearch;
    });
  }, [allMediaItems, selectedAlbumId, filter, searchQuery]);

  // Publicly visible albums for Albums specific filter block
  const visibleAlbums = useMemo(() => {
    return albums.filter(a => !a.isExpired && !a.isPrivate);
  }, [albums]);

  // Handle image download
  const handleDownload = (url: string, title: string, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/\s+/g, '_')}_download`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      // Fallback
      window.open(url, '_blank');
    }
  };

  const currentMediaItem = lightboxIndex !== null ? filteredMedia[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto space-y-8 text-left animate-fade-in font-sans">
        
        {/* Gallery Title & Introduction Header */}
        <div className="border-b border-gray-200 dark:border-neutral-800 pb-6">
          <h1 className="text-3xl font-serif italic text-gray-950 dark:text-white leading-tight">
            {currentLanguage === 'en' ? 'Bespoke Public Gallery' : 'Imurikagurisha Ryamamaye'}
          </h1>
          <p className="text-xs text-neutral-505 uppercase tracking-wider mt-1 text-neutral-400">
            {currentLanguage === 'en' 
              ? 'Browse the master collection of wedding captures, high-fidelity portraits, and corporate event archives.'
              : 'Shakisha amafoto y’ubukwe, film migufi n’amakuru y’ibirori byose byafashwe neza.'}
          </p>
        </div>

        {/* Dynamic Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-editorial-card p-4 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm text-xs">
          
          {/* Tag filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setFilter('all'); setSelectedAlbumId('all'); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full cursor-pointer font-bold uppercase tracking-wider text-[10px] transition-all ${
                filter === 'all' && selectedAlbumId === 'all'
                  ? 'bg-editorial-tan text-editorial-dark'
                  : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-400'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {currentLanguage === 'en' ? 'Show All' : 'Byose'}
            </button>

            <button
              onClick={() => { setFilter('image'); setSelectedAlbumId('all'); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full cursor-pointer font-bold uppercase tracking-wider text-[10px] transition-all ${
                filter === 'image'
                  ? 'bg-editorial-tan text-editorial-dark'
                  : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-400'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              {currentLanguage === 'en' ? 'Images Only' : 'Amafoto Gusa'}
            </button>

            <button
              onClick={() => { setFilter('video'); setSelectedAlbumId('all'); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full cursor-pointer font-bold uppercase tracking-wider text-[10px] transition-all ${
                filter === 'video'
                  ? 'bg-editorial-tan text-editorial-dark'
                  : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-400'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              {currentLanguage === 'en' ? 'Videos Only' : 'Amavidewo'}
            </button>

            <button
              onClick={() => { setFilter('albums'); setSelectedAlbumId('all'); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full cursor-pointer font-bold uppercase tracking-wider text-[10px] transition-all ${
                filter === 'albums'
                  ? 'bg-editorial-tan text-editorial-dark'
                  : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-400'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {currentLanguage === 'en' ? 'Albums Mode' : 'Gushakisha Alubumu'}
            </button>
          </div>

          {/* Album specific filter dropdown & Search Input */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {filter !== 'albums' && (
              <select
                value={selectedAlbumId}
                onChange={(e) => setSelectedAlbumId(e.target.value)}
                className="w-full sm:w-44 px-3.5 py-2 rounded-xl bg-gray-50 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 text-xs text-gray-700 dark:text-neutral-200 focus:outline-none"
              >
                <option value="all">{currentLanguage === 'en' ? 'Filter by Album' : 'Hitamo Alubumu'}</option>
                {visibleAlbums.map(album => (
                  <option key={album.id} value={album.id}>{album.title}</option>
                ))}
              </select>
            )}

            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder={currentLanguage === 'en' ? 'Search captures...' : 'Shakisha hano...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-48 pl-9 pr-4 py-2 bg-gray-50 border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800 rounded-xl text-xs text-gray-700 dark:text-white focus:outline-none focus:ring-1 focus:ring-editorial-tan"
              />
            </div>
          </div>
        </div>

        {/* GALLERY GRID */}
        {filter === 'albums' ? (
          /* ALBUM GRID DISPLAY OVERVIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {visibleAlbums.filter(album => 
              album.title.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((album) => (
              <div 
                key={album.id}
                className="group rounded-2xl border border-gray-100 bg-white p-4 flex flex-col justify-between hover:border-editorial-tan dark:border-neutral-850 dark:bg-editorial-card transition-all duration-300"
              >
                <div>
                  <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-neutral-900 relative mb-4">
                    <img 
                      src={album.coverUrl} 
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103 opacity-90"
                    />
                    <span className="absolute bottom-2.5 right-2 px-2.5 py-1 text-[8px] tracking-wider font-extrabold bg-black/80 backdrop-blur-xs text-editorial-tan rounded-full uppercase">
                      {album.media.length} items
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold block">{album.date}</span>
                    <h3 className="text-lg font-serif italic text-gray-900 dark:text-white mt-1">{album.title}</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed mt-1.5 clamp-2 line-clamp-2">
                      {album.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 dark:border-neutral-800 flex justify-between items-center text-xs">
                  <span className="text-[10px] text-neutral-400 font-mono">
                    👁️ {album.viewCount} • 📥 {album.downloadCount}
                  </span>
                  <a
                    href={`#/album/${album.id}`}
                    className="flex items-center gap-1 text-editorial-tan font-bold hover:underline"
                  >
                    {currentLanguage === 'en' ? 'Open Gallery' : 'Kuvungura'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* MASONRY SELECTION IMAGE / VIDEO LIST */
          filteredMedia.length === 0 ? (
            <div className="py-20 text-center text-xs text-neutral-400 font-serif italic border border-dashed border-gray-200 dark:border-neutral-800 rounded-3xl">
              {currentLanguage === 'en' ? 'No media matched your current filters.' : 'Nta mafoto ahuye n-ibyo wasatuye.'}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {filteredMedia.map((item, index) => (
                <div 
                  key={item.id}
                  onClick={() => setLightboxIndex(index)}
                  className="break-inside-avoid group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-100 dark:border-neutral-850 cursor-zoom-in transition-all duration-300"
                >
                  {/* Media Content */}
                  {item.type === 'image' ? (
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-auto object-cover opacity-90 transition-transform duration-500 group-hover:scale-103"
                      loading="lazy"
                    />
                  ) : (
                    <div className="relative aspect-video bg-black flex items-center justify-center">
                      <video 
                        src={item.url} 
                        className="w-full h-full object-cover opacity-85"
                        preload="metadata"
                        muted
                        playsInline
                      />
                      <div className="absolute top-2 right-2 bg-neutral-950/80 px-2 py-0.5 rounded text-[8px] font-bold text-editorial-tan tracking-wider uppercase">
                        {item.duration || 'VIDEO'}
                      </div>
                    </div>
                  )}

                  {/* Gradient Hover Cover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                    <p className="text-white font-bold text-sm truncate">{item.title}</p>
                    <span className="text-[9px] text-[#C4A484] uppercase tracking-wider mt-0.5">{item.albumTitle}</span>
                    
                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-neutral-800/60">
                      <span className="text-[9px] font-mono text-neutral-400 font-bold">{item.size}</span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={(e) => handleDownload(item.url, item.title, e)}
                          className="p-1 px-2.5 rounded-md bg-white hover:bg-editorial-tan text-black text-[9px] font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                          title="Instant Download File"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{currentLanguage === 'en' ? 'Get' : 'Gukura'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

      </div>

      {/* LIGHTBOX SLIDESHOW MODAL SYSTEM */}
      <AnimatePresence>
        {lightboxIndex !== null && currentMediaItem && (
          <div 
            id="gallery-lightbox"
            className="fixed inset-0 z-50 flex flex-col justify-between p-4 bg-black/95 backdrop-blur-md animate-fade-in text-white select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between py-2 border-b border-neutral-800 text-xs">
              <div>
                <p className="font-serif italic text-base text-editorial-tan">{currentMediaItem.title}</p>
                <span className="text-[10px] text-neutral-400 block mt-0.5 font-sans">
                  Part of album: <strong className="text-white">{currentMediaItem.albumTitle}</strong>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => handleDownload(currentMediaItem.url, currentMediaItem.title, e)}
                  className="flex items-center gap-1 bg-white hover:bg-editorial-tan text-black px-4 py-2 rounded-xl text-xs font-bold transition uppercase cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{currentLanguage === 'en' ? 'Download Raw FullRes' : 'Gukuraho Amakuru'}</span>
                </button>
                <button 
                  onClick={() => setLightboxIndex(null)}
                  className="bg-neutral-800 hover:bg-neutral-700 p-2 rounded-full cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Central Media Viewer */}
            <div 
              className="flex-1 flex items-center justify-center p-4 max-h-[75vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {currentMediaItem.type === 'image' ? (
                <img 
                  src={currentMediaItem.url} 
                  alt={currentMediaItem.title} 
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-neutral-800"
                />
              ) : (
                <div className="h-full w-full max-w-4xl max-h-full aspect-video bg-black rounded-xl overflow-hidden border border-neutral-800">
                  <video 
                    src={currentMediaItem.url} 
                    className="w-full h-full object-contain"
                    controls
                    autoPlay
                    playsInline
                  />
                </div>
              )}
            </div>

            {/* Bottom Controls / Stats */}
            <div className="py-3 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-neutral-400 font-sans">
              <div className="flex items-center gap-4">
                <span>File Size: <strong className="text-white">{currentMediaItem.size}</strong></span>
                {currentMediaItem.dimensions && (
                  <span>Resolution: <strong className="text-white">{currentMediaItem.dimensions}</strong></span>
                )}
                {currentMediaItem.duration && (
                  <span>Duration: <strong className="text-white">{currentMediaItem.duration}</strong></span>
                )}
              </div>

              <span>
                Item {lightboxIndex + 1} of {filteredMedia.length} matched files
              </span>
            </div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
