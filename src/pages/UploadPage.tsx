import React, { useState } from 'react';
import { useSaaS } from '../context/SaaSContext';
import { 
  UploadCloud, 
  CheckCircle, 
  AlertCircle, 
  Trash2, 
  Play, 
  ChevronRight,
  Sparkles,
  RefreshCw,
  FolderOpen
} from 'lucide-react';

interface SimulatedFile {
  id: string;
  name: string;
  size: string;
  type: 'image' | 'video';
  url: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'failed';
}

export const UploadPage: React.FC = () => {
  const { albums, addMediaToAlbum, photographer, t, currentLanguage } = useSaaS();

  const [selectedAlbumId, setSelectedAlbumId] = useState<string>(albums[0]?.id || '');
  const [dragActive, setDragActive] = useState(false);
  const [uploadsList, setUploadsList] = useState<SimulatedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Auto-sync selectedAlbumId with the first valid album if needed
  React.useEffect(() => {
    if (albums.length > 0) {
      const exists = albums.some(a => a.id === selectedAlbumId);
      if (!selectedAlbumId || !exists) {
        setSelectedAlbumId(albums[0].id);
      }
    } else {
      setSelectedAlbumId('');
    }
  }, [albums, selectedAlbumId]);

  // Curated lists of assets to mock-upload
  const mockImagesToUpload = [
    { name: 'Bridesmaids Portrait 01.jpg', size: '5.2 MB', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', type: 'image' as const },
    { name: 'Gold Ring Details HighRes.jpg', size: '4.8 MB', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400', type: 'image' as const },
    { name: 'Candlelight Reception Dinner.jpg', size: '6.1 MB', url: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&q=80&w=400', type: 'image' as const },
    { name: 'Vintage Boat Amalfi Scenic.jpg', size: '7.8 MB', url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=400', type: 'image' as const },
  ];

  const mockVideosToUpload = [
    { name: 'Wedding Kiss Cinemagraph.mp4', size: '28.4 MB', url: 'https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-walking-out-of-church-40011-large.mp4', type: 'video' as const },
    { name: 'Bridal Bouquet Cinematic.mp4', size: '14.2 MB', url: 'https://assets.mixkit.co/videos/preview/mixkit-bride-holding-a-bouquet-of-flowers-40012-large.mp4', type: 'video' as const },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Convert real FileList/File instances to web schema
  const handleRealFiles = (fileList: FileList) => {
    if (!selectedAlbumId) {
      alert(currentLanguage === 'en' ? 'Please select or create an album first!' : 'Banza uhitemo cyangwa ukore alubumu!');
      return;
    }

    const filesToUpload: Array<{ name: string; size: string; url: string; type: 'image' | 'video' }> = [];
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const displaySize = parseFloat(sizeMB) < 0.1 ? "0.1 MB" : `${sizeMB} MB`;
      const isVideo = file.type.startsWith('video/') || file.name.endsWith('.mp4') || file.name.endsWith('.mov') || file.name.endsWith('.avi');
      
      filesToUpload.push({
        name: file.name,
        size: displaySize,
        url: URL.createObjectURL(file), // instantiate full local runtime blob URL
        type: isVideo ? 'video' : 'image'
      });
    }

    if (filesToUpload.length > 0) {
      processFilesAndUpload(filesToUpload);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleRealFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleRealFiles(e.target.files);
    }
  };

  // Generic internal function executing transaction-safe file progress simulation loops
  const processFilesAndUpload = (filesToProcess: Array<{ name: string; size: string; url: string; type: 'image' | 'video' }>) => {
    if (!selectedAlbumId) {
      alert(currentLanguage === 'en' ? 'Please select or create an album first!' : 'Banza uhitemo cyangwa ukore alubumu!');
      return;
    }

    const newUploads = filesToProcess.map(f => ({
      id: 'up-' + Math.random().toString(36).substr(2, 9),
      name: f.name,
      size: f.size,
      type: f.type,
      url: f.url,
      progress: 0,
      status: 'pending' as const
    }));

    setUploadsList(prev => [...newUploads, ...prev]);
    setIsProcessing(true);

    let activeCount = newUploads.length;

    newUploads.forEach((fileItem) => {
      let progressVal = 0;
      
      const interval = setInterval(() => {
        progressVal += Math.floor(Math.random() * 20) + 15;
        
        if (progressVal >= 100) {
          progressVal = 100;
          clearInterval(interval);

          // Update this item's completion context
          setUploadsList(current => 
            current.map(u => 
              u.id === fileItem.id ? { ...u, progress: 100, status: 'completed' } : u
            )
          );

          // Add to contextual album
          addMediaToAlbum(selectedAlbumId, {
            type: fileItem.type,
            title: fileItem.name.replace(/\.[^/.]+$/, ""), // strip file extension
            size: fileItem.size,
            url: fileItem.url,
            dimensions: fileItem.type === 'image' ? '4500x3000' : undefined,
            duration: fileItem.type === 'video' ? '0:15' : undefined,
          });

          activeCount--;
          if (activeCount <= 0) {
            setIsProcessing(false);
          }
        } else {
          setUploadsList(current => 
            current.map(u => 
              u.id === fileItem.id ? { ...u, progress: progressVal, status: 'uploading' } : u
            )
          );
        }
      }, 300 + Math.random() * 300);
    });
  };

  // Run async simulation presets on click
  const triggerSimulatedUpload = () => {
    if (!selectedAlbumId) {
      alert(currentLanguage === 'en' ? 'Please select or create an album first!' : 'Banza uhitemo cyangwa ukore alubumu!');
      return;
    }

    const randomImgIdx = Math.floor(Math.random() * mockImagesToUpload.length);
    const randomVidIdx = Math.floor(Math.random() * mockVideosToUpload.length);

    const assetPair = [mockImagesToUpload[randomImgIdx], mockVideosToUpload[randomVidIdx]];
    processFilesAndUpload(assetPair);
  };

  const clearUploads = () => {
    setUploadsList([]);
  };

  return (
    <div className="space-y-8 p-3 sm:p-6 lg:p-8 bg-editorial-dark min-h-screen text-white text-left animate-fade-in font-sans">
      
      {/* Header Info */}
      <div className="border-b border-[#2A2A2E] pb-6">
        <h1 className="text-3xl font-serif italic text-white leading-tight">{t.uploadTitle}</h1>
        <p className="text-xs text-editorial-text-muted mt-1 uppercase tracking-wider">
          {t.uploadSub}
        </p>
      </div>

      {/* Grid Configuration and Dropzone layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column (2/3 size): Selector, dropzone, and mock queue controls */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Target collection dropdown */}
          <div className="rounded-xl border border-editorial-border bg-editorial-card p-5 shadow-sm space-y-3.5">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-editorial-tan">
              <FolderOpen className="w-4 h-4 text-editorial-tan" />
              {t.bindUploadLabel}
            </span>

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedAlbumId}
                onChange={(e) => setSelectedAlbumId(e.target.value)}
                className="flex-1 text-xs px-3.5 py-3.5 rounded-xl border border-editorial-border bg-editorial-dark text-white focus:outline-none focus:ring-1 focus:ring-editorial-tan"
              >
                <option value="" disabled>--- {currentLanguage === 'en' ? 'Choose Album Destination' : 'Hitamo Alubumu Igomba Koherezwamo'} ---</option>
                {albums.map((album) => (
                  <option key={album.id} value={album.id} className="bg-editorial-card text-white">
                    {album.title} ({album.media.length} {currentLanguage === 'en' ? 'items logged' : 'asanzwe arimo'})
                  </option>
                ))}
              </select>

              <button
                onClick={triggerSimulatedUpload}
                className="px-5 py-3.5 bg-white text-black font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-editorial-tan transition flex items-center justify-center gap-1.5 shadow cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-black" />
                {t.simulateDrop}
              </button>
            </div>
            {albums.length === 0 && (
              <p className="text-[11px] text-red-400 font-bold uppercase tracking-wide">
                ⚠️ {t.noAlbumWarning}
              </p>
            )}
          </div>

          {/* HTML5 Dropzone Box */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`cursor-pointer border-2 border-dashed rounded-2xl p-12 text-center transition-all min-h-[250px] flex flex-col justify-center items-center ${
              dragActive 
                ? 'border-editorial-tan bg-neutral-900' 
                : 'border-editorial-border bg-editorial-card hover:bg-neutral-900/60'
            }`}
          >
            <input 
              type="file" 
              multiple 
              onChange={handleFileSelect}
              className="hidden" 
              id="file-element-uploader" 
            />
            <label htmlFor="file-element-uploader" className="cursor-pointer flex flex-col items-center gap-4 w-full">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-editorial-dark text-white border border-editorial-border shadow-inner">
                <UploadCloud className="h-7.5 w-7.5 text-editorial-tan" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-tight text-white">
                  {currentLanguage === 'en' ? 'Drag and drop media files, or ' : 'Kurura ushyiremo amafoto, cyangwa '} <span className="text-editorial-tan hover:underline">{currentLanguage === 'en' ? 'browse files' : 'hitamo amadosiye'}</span>
                </p>
                <span className="block text-[10.5px] text-editorial-text-muted mt-2 font-serif italic">
                  {t.dragDropSub}
                </span>
              </div>
            </label>
          </div>

        </div>

        {/* Right column (1/3 size): Real-time progress upload lists */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-editorial-border bg-editorial-card p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-editorial-border pb-3">
              <span className="font-bold text-xs uppercase tracking-widest text-white flex items-center gap-1.5">
                <RefreshCw className={`w-3.5 h-3.5 text-editorial-tan ${isProcessing ? 'animate-spin' : ''}`} />
                {t.queueTitle}
              </span>
              
              {uploadsList.length > 0 && (
                <button
                  onClick={clearUploads}
                  className="text-[10px] uppercase tracking-widest font-bold text-red-400 hover:underline cursor-pointer"
                >
                  {t.clearQueue}
                </button>
              )}
            </div>

            {uploadsList.length === 0 ? (
              <div className="py-8 text-center text-xs text-editorial-text-muted font-serif italic">
                {t.emptyQueue}
              </div>
            ) : (
              <div className="space-y-3.5">
                {uploadsList.map((f, i) => (
                  <div key={i} className="text-left text-xs bg-[#121214] border border-editorial-border p-3 rounded-lg space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-white truncate max-w-40">{f.name}</p>
                        <span className="text-[9px] font-mono text-neutral-400">{f.size} • {f.type.toUpperCase()}</span>
                      </div>
                      
                      {f.status === 'completed' ? (
                        <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                      ) : f.status === 'failed' ? (
                        <AlertCircle className="w-4.5 h-4.5 text-red-400 shrink-0" />
                      ) : (
                        <span className="text-[10px] text-editorial-tan font-mono shrink-0 animate-pulse font-semibold">
                          {f.progress}%
                        </span>
                      )}
                    </div>

                    {/* Progress slider bar */}
                    {f.status === 'uploading' && (
                      <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-editorial-tan rounded-full transition-all duration-300"
                          style={{ width: `${f.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick billing warning */}
          {photographer.storageUsed > photographer.storageLimit - 1 && (
            <div className="rounded-xl border border-dashed border-red-950/40 bg-red-950/10 p-4 flex items-start gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-red-400">{currentLanguage === 'en' ? 'Storage limit warning' : 'Koga inyuma y-ububiko'}</p>
                <span className="block text-[11px] text-editorial-text-muted mt-1 leading-relaxed">
                  {currentLanguage === 'en' ? 'Your simulated SaaS limits are near capacity! Upgrade in the pricing section now.' : 'Ububiko bwawe hafi gushira! Hitamo guhindura gahunda mukure ububiko buhamye.'}
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
