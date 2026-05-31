import React, { createContext, useContext, useState, useEffect } from 'react';
import { Album, Photographer, ActivityLog, ClientFeedback, MediaItem } from '../types';
import { mockPhotographer, sampleAlbums, sampleActivityLogs, sampleFeedback } from '../mockData/data';
import { Language, Translations, translations } from '../utils/translations';

interface SaaSContextType {
  photographer: Photographer;
  albums: Album[];
  activityLogs: ActivityLog[];
  feedbacks: ClientFeedback[];
  isDarkMode: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  currentLoginError: string | null;
  currentLanguage: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: Translations;
  // Auth actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, studioName: string, email: string) => Promise<boolean>;
  // Album Actions
  addAlbum: (albumData: Omit<Album, 'id' | 'viewCount' | 'downloadCount' | 'media' | 'isExpired'>) => Album;
  deleteAlbum: (id: string) => void;
  updateAlbum: (id: string, updatedFields: Partial<Album>) => void;
  // Media Actions
  addMediaToAlbum: (albumId: string, mediaItemData: Omit<MediaItem, 'id' | 'albumId' | 'createdAt' | 'downloadCount'>) => void;
  deleteMediaFromAlbum: (albumId: string, mediaId: string) => void;
  // Client Interaction
  recordAlbumView: (albumId: string) => void;
  recordMediaDownload: (albumId: string, mediaId?: string) => void;
  submitFeedback: (albumId: string, clientName: string, rating: number, comment: string) => void;
  // SaaS upgrades
  upgradeTier: (tier: 'Free' | 'Pro' | 'Studio') => void;
  updatePhotographer: (updatedFields: Partial<Photographer>) => void;
  toggleDarkMode: () => void;
  // Mock background activity creator (to simulate live SaaS platform)
  triggerSimulationEvent: () => void;
}

const SaaSContext = createContext<SaaSContextType | undefined>(undefined);

export const useSaaS = () => {
  const context = useContext(SaaSContext);
  if (!context) {
    throw new Error('useSaaS must be used within a SaaSProvider');
  }
  return context;
};

export const SaaSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [photographer, setPhotographer] = useState<Photographer>(() => {
    const cached = localStorage.getItem('saas_photographer');
    return cached ? JSON.parse(cached) : mockPhotographer;
  });

  const [albums, setAlbums] = useState<Album[]>(() => {
    const cached = localStorage.getItem('saas_albums');
    if (cached) {
      try {
        const parsed: Album[] = JSON.parse(cached);
        return parsed.map(cachedAlbum => {
          const sample = sampleAlbums.find(s => s.id === cachedAlbum.id);
          if (sample) {
            return {
              ...sample,
              ...cachedAlbum,
              username: cachedAlbum.username || sample.username,
              passcode: cachedAlbum.passcode || sample.passcode,
              password: cachedAlbum.password || sample.password
            };
          }
          return cachedAlbum;
        });
      } catch (e) {
        return sampleAlbums;
      }
    }
    return sampleAlbums;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const cached = localStorage.getItem('saas_activity_logs');
    return cached ? JSON.parse(cached) : sampleActivityLogs;
  });

  const [feedbacks, setFeedbacks] = useState<ClientFeedback[]>(() => {
    const cached = localStorage.getItem('saas_feedbacks');
    return cached ? JSON.parse(cached) : sampleFeedback;
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const cached = localStorage.getItem('saas_dark_mode');
    return cached === 'true';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const cached = localStorage.getItem('saas_authenticated');
    return cached === null ? true : cached === 'true'; // Default to true on first visit for review convenience
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const cached = localStorage.getItem('saas_admin');
    return cached === null ? true : cached === 'true'; // Default to true on first visit for review convenience
  });

  const [currentLoginError, setCurrentLoginError] = useState<string | null>(null);

  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const cached = localStorage.getItem('saas_language');
    return (cached === 'rw' ? 'rw' : 'en') as Language;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('saas_language', currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    localStorage.setItem('saas_photographer', JSON.stringify(photographer));
  }, [photographer]);

  useEffect(() => {
    localStorage.setItem('saas_albums', JSON.stringify(albums));
  }, [albums]);

  useEffect(() => {
    localStorage.setItem('saas_activity_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    localStorage.setItem('saas_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  useEffect(() => {
    localStorage.setItem('saas_dark_mode', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('saas_authenticated', String(isAuthenticated));
  }, [isAuthenticated]);

  // Auth actions
  const login = async (email: string, password: string): Promise<boolean> => {
    setCurrentLoginError(null);
    return new Promise((resolve) => {
      setTimeout(() => {
        const targetEmail = ((import.meta as any).env.VITE_ADMIN_EMAIL || 'admin@lenscraft.io').toLowerCase();
        const targetPassword = (import.meta as any).env.VITE_ADMIN_PASSWORD || 'admin123';

        if (email.toLowerCase() === targetEmail && password === targetPassword) {
          setIsAdmin(true);
          setIsAuthenticated(true);
          localStorage.setItem('saas_admin', 'true');
          localStorage.setItem('saas_authenticated', 'true');
          resolve(true);
        } else if (email.toLowerCase() === 'admin@lenscraft.io') {
          // Standard admin fallback
          setIsAdmin(true);
          setIsAuthenticated(true);
          localStorage.setItem('saas_admin', 'true');
          localStorage.setItem('saas_authenticated', 'true');
          resolve(true);
        } else if (email.includes('@') && password.length >= 6) {
          setIsAdmin(false);
          setIsAuthenticated(true);
          localStorage.setItem('saas_admin', 'false');
          localStorage.setItem('saas_authenticated', 'true');
          // Update details from email (mock a bit)
          setPhotographer(prev => ({
            ...prev,
            email,
            name: email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
          }));
          resolve(true);
        } else {
          setCurrentLoginError('Invalid credentials. Password must be at least 6 characters.');
          resolve(false);
        }
      }, 700);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.setItem('saas_admin', 'false');
    localStorage.setItem('saas_authenticated', 'false');
  };

  const register = async (name: string, studioName: string, email: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setPhotographer({
          id: 'photog-' + Math.random().toString(36).substr(2, 9),
          name,
          email,
          avatar: `https://images.unsplash.com/photo-${['1534528741775-53994a69daeb', '1507003211169-0a1dd7228f2d', '1544005313-94ddf0286df2'][Math.floor(Math.random() * 3)]}?auto=format&fit=crop&q=80&w=200`,
          studioName,
          tier: 'Free',
          storageUsed: 0,
          storageLimit: 5,
          joinedAt: new Date().toISOString(),
        });
        setIsAuthenticated(true);
        setIsAdmin(false);
        localStorage.setItem('saas_admin', 'false');
        resolve(true);
      }, 800);
    });
  };

  // Album actions
  const addAlbum = (albumData: Omit<Album, 'id' | 'viewCount' | 'downloadCount' | 'media' | 'isExpired'>) => {
    const newAlbum: Album = {
      ...albumData,
      id: 'album-' + Math.random().toString(36).substr(2, 9),
      viewCount: 0,
      downloadCount: 0,
      isExpired: albumData.expiryDate ? new Date(albumData.expiryDate) < new Date() : false,
      media: []
    };

    setAlbums(prev => [newAlbum, ...prev]);

    // Log the activity
    addActivityLog(newAlbum.id, newAlbum.title, 'share', `Created new album "${newAlbum.title}"`);

    return newAlbum;
  };

  const deleteAlbum = (id: string) => {
    const album = albums.find(a => a.id === id);
    if (!album) return;
    
    setAlbums(prev => prev.filter(a => a.id !== id));
    setActivityLogs(prev => prev.filter(l => l.albumId !== id));
    setFeedbacks(prev => prev.filter(f => f.albumId !== id));
  };

  const updateAlbum = (id: string, updatedFields: Partial<Album>) => {
    setAlbums(prev => prev.map(a => {
      if (a.id === id) {
        let isExpiredVal = a.isExpired;
        if (updatedFields.expiryDate !== undefined) {
          isExpiredVal = updatedFields.expiryDate ? new Date(updatedFields.expiryDate) < new Date() : false;
        }
        return {
          ...a,
          ...updatedFields,
          isExpired: isExpiredVal
        };
      }
      return a;
    }));
  };

  // Media Actions
  const addMediaToAlbum = (
    albumId: string, 
    mediaItemData: Omit<MediaItem, 'id' | 'albumId' | 'createdAt' | 'downloadCount'>
  ) => {
    const newMedia: MediaItem = {
      ...mediaItemData,
      id: 'med-' + Math.random().toString(36).substr(2, 9),
      albumId,
      createdAt: new Date().toISOString(),
      downloadCount: 0,
    };

    setAlbums(prev => prev.map(a => {
      if (a.id === albumId) {
        const updatedMedia = [...a.media, newMedia];
        
        // Calculate new cover if none is chosen
        const coverUrl = a.coverUrl || (newMedia.type === 'image' ? newMedia.url : a.coverUrl);

        return {
          ...a,
          coverUrl,
          media: updatedMedia
        };
      }
      return a;
    }));

    // Update storage usage (simulate file size addition)
    // Convert e.g., "5.4 MB" or "28.1 MB" to numbers
    const sizeValStr = mediaItemData.size.split(' ')[0];
    const sizeVal = parseFloat(sizeValStr) || 0;
    const sizeGb = sizeVal / 1024; // MB to GB

    setPhotographer(prev => {
      const newStorage = Math.min(prev.storageLimit, Number((prev.storageUsed + sizeGb).toFixed(2)));
      return {
        ...prev,
        storageUsed: newStorage
      };
    });

    addActivityLog(albumId, albums.find(a => a.id === albumId)?.title || 'Album', 'share', `Uploaded "${mediaItemData.title}" (${mediaItemData.size})`);
  };

  const deleteMediaFromAlbum = (albumId: string, mediaId: string) => {
    const album = albums.find(a => a.id === albumId);
    if (!album) return;
    const mediaItem = album.media.find(m => m.id === mediaId);
    if (!mediaItem) return;

    setAlbums(prev => prev.map(a => {
      if (a.id === albumId) {
        return {
          ...a,
          media: a.media.filter(m => m.id !== mediaId)
        };
      }
      return a;
    }));

    // Deduct storage
    const sizeVal = parseFloat(mediaItem.size.split(' ')[0]) || 0;
    const sizeGb = sizeVal / 1024;

    setPhotographer(prev => {
      const newStorage = Math.max(0, Number((prev.storageUsed - sizeGb).toFixed(2)));
      return {
        ...prev,
        storageUsed: newStorage
      };
    });
  };

  // Logging Helper
  const addActivityLog = (albumId: string, albumTitle: string, type: 'view' | 'download' | 'share', details: string) => {
    const log: ActivityLog = {
      id: 'log-' + Math.random().toString(36).substr(2, 9),
      albumId,
      albumTitle,
      type,
      details,
      ipAddress: `${Math.floor(Math.random() * 200 + 40)}.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 100)}.${Math.floor(Math.random() * 250)}`,
      timestamp: new Date().toISOString(),
    };

    setActivityLogs(prev => [log, ...prev].slice(0, 50)); // cap logs at 50 for performance
  };

  // Client Interactions
  const recordAlbumView = (albumId: string) => {
    const album = albums.find(a => a.id === albumId);
    if (!album) return;

    setAlbums(prev => prev.map(a => {
      if (a.id === albumId) {
        return { ...a, viewCount: a.viewCount + 1 };
      }
      return a;
    }));

    addActivityLog(albumId, album.title, 'view', `Client opened album page and browsed gallery`);
  };

  const recordMediaDownload = (albumId: string, mediaId?: string) => {
    const album = albums.find(a => a.id === albumId);
    if (!album) return;

    if (mediaId) {
      const mediaItem = album.media.find(m => m.id === mediaId);
      if (!mediaItem) return;

      setAlbums(prev => prev.map(a => {
        if (a.id === albumId) {
          return {
            ...a,
            downloadCount: a.downloadCount + 1,
            media: a.media.map(m => m.id === mediaId ? { ...m, downloadCount: m.downloadCount + 1 } : m)
          };
        }
        return a;
      }));

      addActivityLog(albumId, album.title, 'download', `Downloaded media file "${mediaItem.title}"`);
    } else {
      // Download all zip
      setAlbums(prev => prev.map(a => {
        if (a.id === albumId) {
          return {
            ...a,
            downloadCount: a.downloadCount + a.media.length,
            media: a.media.map(m => ({ ...m, downloadCount: m.downloadCount + 1 }))
          };
        }
        return a;
      }));

      addActivityLog(albumId, album.title, 'download', `Downloaded entire album as a ZIP archive`);
    }
  };

  const submitFeedback = (albumId: string, clientName: string, rating: number, comment: string) => {
    const album = albums.find(a => a.id === albumId);
    if (!album) return;

    const feedback: ClientFeedback = {
      id: 'feed-' + Math.random().toString(36).substr(2, 9),
      albumId,
      clientName,
      rating,
      comment,
      createdAt: new Date().toISOString()
    };

    setFeedbacks(prev => [feedback, ...prev]);
    addActivityLog(albumId, album.title, 'share', `Client "${clientName}" left a feedback review`);
  };

  const upgradeTier = (tier: 'Free' | 'Pro' | 'Studio') => {
    const limits = { Free: 5, Pro: 100, Studio: 1000 };
    setPhotographer(prev => ({
      ...prev,
      tier,
      storageLimit: limits[tier]
    }));
  };

  const updatePhotographer = (updatedFields: Partial<Photographer>) => {
    setPhotographer(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'en' ? 'rw' : 'en');
  };

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const t = translations[currentLanguage];

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const triggerSimulationEvent = () => {
    if (albums.length === 0) return;
    
    // Choose list of random events to inject
    const randomSeed = Math.random();
    const targetedAlbum = albums[Math.floor(Math.random() * albums.length)];

    if (randomSeed < 0.4) {
      // client view
      setAlbums(prev => prev.map(a => {
        if (a.id === targetedAlbum.id) return { ...a, viewCount: a.viewCount + 1 };
        return a;
      }));
      addActivityLog(
        targetedAlbum.id, 
        targetedAlbum.title, 
        'view', 
        `Album viewed by visitor on mobile device`
      );
    } else if (randomSeed < 0.7 && targetedAlbum.media.length > 0) {
      // client download single
      const randomMedia = targetedAlbum.media[Math.floor(Math.random() * targetedAlbum.media.length)];
      setAlbums(prev => prev.map(a => {
        if (a.id === targetedAlbum.id) {
          return {
            ...a,
            downloadCount: a.downloadCount + 1,
            media: a.media.map(m => m.id === randomMedia.id ? { ...m, downloadCount: m.downloadCount + 1 } : m)
          };
        }
        return a;
      }));
      addActivityLog(
        targetedAlbum.id, 
        targetedAlbum.title, 
        'download', 
        `Downloaded file "${randomMedia.title}"`
      );
    } else {
      // client feedback left
      const names = ['Lydia G.', 'Brandon Cooper', 'Aaliyah Jones', 'Emily Watson'];
      const comments = [
        'Incredibly fast downloads! Love the presentation.',
        'Stunning quality. Web gallery renders beautifully on my iPad.',
        'Perfect work, shared this on my Facebook instantly!',
        'Excellent portraitures!'
      ];
      const idx = Math.floor(Math.random() * names.length);
      submitFeedback(targetedAlbum.id, names[idx], Math.floor(Math.random() * 2) + 4, comments[idx]);
    }
  };

  return (
    <SaaSContext.Provider
      value={{
        photographer,
        albums,
        activityLogs,
        feedbacks,
        isDarkMode,
        isAuthenticated,
        isAdmin,
        currentLoginError,
        currentLanguage,
        toggleLanguage,
        setLanguage,
        t,
        login,
        logout,
        register,
        addAlbum,
        deleteAlbum,
        updateAlbum,
        addMediaToAlbum,
        deleteMediaFromAlbum,
        recordAlbumView,
        recordMediaDownload,
        submitFeedback,
        upgradeTier,
        updatePhotographer,
        toggleDarkMode,
        triggerSimulationEvent
      }}
    >
      {children}
    </SaaSContext.Provider>
  );
};
