export type MediaType = 'image' | 'video';

export interface MediaItem {
  id: string;
  albumId: string;
  type: MediaType;
  url: string;
  title: string;
  size: string; // e.g. "4.2 MB"
  dimensions?: string; // e.g. "4000x3000"
  duration?: string; // e.g. "0:45"
  createdAt: string;
  downloadCount: number;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  isPasswordProtected: boolean;
  password?: string;
  username?: string;
  passcode?: string;
  isExpired: boolean;
  expiryDate?: string; // ISO date string
  isPrivate: boolean;
  viewCount: number;
  downloadCount: number;
  coverUrl: string;
  media: MediaItem[];
  clientId?: string;
  clientEmail?: string;
  location?: string;
}

export interface Photographer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  studioName: string;
  tier: 'Free' | 'Pro' | 'Studio';
  storageUsed: number; // in GB
  storageLimit: number; // in GB
  joinedAt: string;
  whatsappNumber?: string;
  instagramLink?: string;
  phoneContact?: string;
  websiteURL?: string;
}

export interface SystemStats {
  totalViews: number;
  totalDownloads: number;
  totalAlbums: number;
  storageUsed: number; // in GB
}

export interface ClientFeedback {
  id: string;
  albumId: string;
  clientName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  albumId: string;
  albumTitle: string;
  type: 'view' | 'download' | 'share';
  details: string;
  ipAddress: string;
  timestamp: string;
}
