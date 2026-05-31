import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSaaS } from '../context/SaaSContext';
import { 
  Plus, 
  Search, 
  Grid, 
  List, 
  Trash2, 
  Lock, 
  Clock, 
  Globe, 
  Eye, 
  Download, 
  Copy, 
  Check, 
  SlidersHorizontal,
  X,
  ExternalLink,
  Calendar,
  MapPin,
  Tag
} from 'lucide-react';
import { Album } from '../types';

export const AlbumsPage: React.FC = () => {
  const { albums, addAlbum, deleteAlbum } = useSaaS();
  const location = useLocation();
  const navigate = useNavigate();

  const [isGridView, setIsGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  
  // Create album form state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [locationStr, setLocationStr] = useState('');
  const [tags, setTags] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

  const [copiedAlbumId, setCopiedAlbumId] = useState<string | null>(null);
  const [albumToDelete, setAlbumToDelete] = useState<string | null>(null);

  // Auto show modal if query param is set
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('create') === 'true') {
      setShowCreateModal(true);
      // clean URL
      navigate('/albums', { replace: true });
    }
  }, [location, navigate]);

  // Distinct tags list
  const allTags = ['All', ...Array.from(new Set(albums.flatMap(a => a.tags)))];

  // Filtering
  const filteredAlbums = albums.filter(album => {
    const matchesSearch = album.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          album.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || album.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const copyShareLink = (albumId: string) => {
    const origin = window.location.origin;
    const shareLink = `${origin}/album/${albumId}`;
    navigator.clipboard.writeText(shareLink);
    setCopiedAlbumId(albumId);
    setTimeout(() => setCopiedAlbumId(null), 2000);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    // Parsed tags array
    const parsedTags = tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const defaultCovers = [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800'
    ];

    const chosenCover = coverUrl || defaultCovers[Math.floor(Math.random() * defaultCovers.length)];

    const finalUsername = username.trim() || title.toLowerCase().replace(/[^a-z0-9]/g, '') || 'client';
    const finalPasscode = passcode.trim() || password.trim() || '123456';

    addAlbum({
      title,
      description,
      date,
      location: locationStr || undefined,
      tags: parsedTags.length > 0 ? parsedTags : ['General'],
      isPasswordProtected,
      password: isPasswordProtected ? finalPasscode : undefined,
      username: isPasswordProtected ? finalUsername : undefined,
      passcode: isPasswordProtected ? finalPasscode : undefined,
      isPrivate,
      expiryDate: expiryDate || undefined,
      coverUrl: chosenCover
    });

    // Reset Form fields
    setTitle('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setLocationStr('');
    setTags('');
    setIsPrivate(false);
    setIsPasswordProtected(false);
    setPassword('');
    setUsername('');
    setPasscode('');
    setExpiryDate('');
    setCoverUrl('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-8 p-3 sm:p-6 lg:p-8 bg-editorial-dark min-h-screen text-white">
      
      {/* Header info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2A2E] pb-6">
        <div>
          <h1 className="text-3xl font-serif italic text-white leading-tight">My Shared Albums</h1>
          <p className="text-xs text-editorial-text-muted mt-1 uppercase tracking-wider">Manage client download ports, proof locks, and bespoke exhibition details.</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-1.5 rounded-full bg-white px-5 py-2 text-[10px] font-bold uppercase tracking-widest text-black hover:bg-editorial-tan transition shadow-sm self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Create Album
        </button>
      </div>

      {/* Control Filters Hub */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-editorial-card p-4 rounded-xl border border-editorial-border">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search albums..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-lg border border-editorial-border bg-editorial-dark text-white focus:outline-none focus:ring-1 focus:ring-editorial-tan transition"
          />
        </div>

        {/* Categories / Tags selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold text-editorial-tan uppercase tracking-widest mr-1">Filter Tags:</span>
          {allTags.slice(0, 6).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold rounded-full transition ${
                selectedTag === tag
                  ? 'bg-editorial-tan text-black'
                  : 'bg-[#121214] text-neutral-400 hover:bg-neutral-800 border border-editorial-border'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* View Toggle Icon */}
        <div className="hidden sm:flex items-center gap-1 border-l border-editorial-border pl-4">
          <button
            onClick={() => setIsGridView(true)}
            className={`p-1.5 rounded-lg transition ${isGridView ? 'bg-editorial-dark text-editorial-tan border border-editorial-border' : 'text-neutral-400'}`}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsGridView(false)}
            className={`p-1.5 rounded-lg transition ${!isGridView ? 'bg-editorial-dark text-editorial-tan border border-editorial-border' : 'text-neutral-400'}`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid or Table Display */}
      {filteredAlbums.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-editorial-border bg-editorial-card p-12 text-center">
          <p className="text-sm text-editorial-text-muted">No exhibition matches your filter preferences.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('All');
            }}
            className="mt-3 text-xs font-bold text-editorial-tan hover:underline uppercase tracking-widest"
          >
            Clear filters
          </button>
        </div>
      ) : isGridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlbums.map((album) => (
            <div 
              key={album.id}
              className="group rounded-xl border border-editorial-border bg-editorial-card overflow-hidden flex flex-col justify-between transition-all duration-350 hover:border-editorial-tan"
            >
              <div>
                {/* Visual Cover */}
                <div className="aspect-[16/10] w-full bg-neutral-900 relative overflow-hidden border-b border-editorial-border">
                  <img 
                    src={album.coverUrl} 
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" 
                  />
                  {/* Status Badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5 font-sans">
                    {album.isPasswordProtected && (
                      <span className="bg-neutral-950/85 border border-[#444] text-[8px] font-bold text-[#C4A484] px-2 py-0.5 rounded-md uppercase tracking-widest backdrop-blur-xs flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> SECURE
                      </span>
                    )}
                    {album.isPrivate ? (
                      <span className="bg-red-950/85 border border-red-900/55 text-[8px] font-bold text-red-300 px-2 py-0.5 rounded-md uppercase tracking-widest backdrop-blur-xs">
                        Private
                      </span>
                    ) : (
                      <span className="bg-[#121214]/90 border border-editorial-border text-[8px] font-bold text-neutral-300 px-2 py-0.5 rounded-md uppercase tracking-widest backdrop-blur-xs flex items-center gap-0.5">
                        <Globe className="w-2.5 h-2.5" /> Published
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Content */}
                <div className="p-5 text-left space-y-2">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#C4A484] uppercase tracking-widest">
                    <span>{album.date}</span>
                    <span>•</span>
                    <span>{album.media.length} items</span>
                  </div>

                  <Link to={`/album/${album.id}`}>
                    <h3 className="font-serif italic text-lg text-white group-hover:text-editorial-tan transition-colors truncate">
                      {album.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-editorial-text-muted line-clamp-2 leading-relaxed font-serif">
                    {album.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1.5 font-mono">
                    {album.tags.map(t => (
                      <span key={t} className="text-[9px] font-medium bg-editorial-dark text-neutral-400 px-2 py-0.5 rounded border border-editorial-border">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Utility Panel */}
              <div className="px-5 pb-5 border-t border-editorial-border pt-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1" title="Views">
                    <Eye className="w-3.5 h-3.5 text-editorial-tan" /> {album.viewCount}
                  </span>
                  <span className="flex items-center gap-1" title="Downloads">
                    <Download className="w-3.5 h-3.5 text-editorial-tan" /> {album.downloadCount}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => copyShareLink(album.id)}
                    className="inline-flex h-7 px-3 text-[9px] items-center gap-1 bg-white text-black rounded-lg hover:bg-editorial-tan font-bold uppercase tracking-wider transition"
                  >
                    {copiedAlbumId === album.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedAlbumId === album.id ? 'Copied' : 'Link'}</span>
                  </button>

                  <Link
                    to={`/album/${album.id}`}
                    className="p-1.5 rounded-lg border border-editorial-border text-neutral-400 hover:bg-[#121214] hover:text-white transition"
                    title="Control Share Settings"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => setAlbumToDelete(album.id)}
                    className="p-1.5 rounded-lg border border-red-950/40 text-red-400 hover:bg-red-950/20 transition"
                    title="Delete Album"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List / Table View representation */
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden dark:bg-gray-950 dark:border-gray-800">
          <div className="overflow-x-auto text-left">
            <table className="w-full min-w-[600px] text-xs">
              <thead className="bg-gray-50 border-b border-gray-100 dark:bg-neutral-900 dark:border-gray-800 font-bold text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="p-4">Album Name</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4">Status / Privacy</th>
                  <th className="p-4">Files</th>
                  <th className="p-4 text-center">Views</th>
                  <th className="p-4 text-center">Downloads</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-neutral-900">
                {filteredAlbums.map((album) => (
                  <tr key={album.id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-900/40">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={album.coverUrl} alt={album.title} className="h-9 w-12 rounded object-cover" />
                        <div>
                          <Link to={`/album/${album.id}`} className="font-extrabold text-neutral-950 dark:text-white hover:underline">
                            {album.title}
                          </Link>
                          <span className="block text-[10px] text-neutral-400 dark:text-neutral-500">{album.location || 'No Location'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-neutral-600 dark:text-neutral-400">{album.date}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {album.isPasswordProtected && (
                          <span className="bg-neutral-100 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 px-2 py-0.5 rounded text-[9px] font-bold">Passphrase</span>
                        )}
                        {album.isPrivate ? (
                          <span className="bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 px-2 py-0.5 rounded text-[9px] font-bold">Private</span>
                        ) : (
                          <span className="bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 px-2 py-0.5 rounded text-[9px] font-bold">Shared URL</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-semibold">{album.media.length} items</td>
                    <td className="p-4 text-center font-mono">{album.viewCount}</td>
                    <td className="p-4 text-center font-mono">{album.downloadCount}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => copyShareLink(album.id)}
                          className="h-7 px-2.5 bg-neutral-950 text-white rounded hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-100 text-[10px] font-bold transition"
                        >
                          {copiedAlbumId === album.id ? 'Copied' : 'Link'}
                        </button>
                        <Link
                          to={`/album/${album.id}`}
                          className="p-1.5 border border-gray-100 text-gray-500 hover:bg-gray-100 rounded dark:border-neutral-800 dark:hover:bg-neutral-850"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setAlbumToDelete(album.id)}
                          className="p-1.5 border border-red-100 text-red-500 hover:bg-red-50 rounded dark:border-red-950/30 dark:hover:bg-red-950/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {albumToDelete && (
        <div id="delete-confirm-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-[#121214] rounded-2xl shadow-2xl border border-red-900/30 overflow-hidden text-white p-6 space-y-5">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-950/40 border border-red-900/40">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="font-serif italic text-lg text-white">Delete Shared Album?</h3>
              <p className="text-[11px] text-neutral-400 leading-normal font-serif text-center">
                Are you sure you want to delete <strong className="text-white">"{albums.find(a => a.id === albumToDelete)?.title}"</strong> permanently? This action cannot be undone and will break existing client gallery links.
              </p>
            </div>

            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setAlbumToDelete(null)}
                className="flex-1 px-4 py-2 rounded-full border border-editorial-border text-[9px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition cursor-pointer"
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE MODAL DIALOG POPUP */}
      {showCreateModal && (
        <div id="create-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#121214] rounded-2xl shadow-2xl border border-editorial-border overflow-hidden relative max-h-[90vh] flex flex-col text-white">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-editorial-border bg-[#0f0f11]">
              <h3 className="font-serif italic text-xl text-white">Create exhibition gallery</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-gray-400 hover:text-white rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Scrollable */}
            <form onSubmit={handleCreateSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-left">
              
              <div>
                <label className="block text-[10px] font-bold text-editorial-tan uppercase tracking-widest mb-1.5">Album Title / Client Family</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. The Bennett Wedding or Summer Editorial"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs px-3.5 py-3 bg-[#18181B] border border-editorial-border rounded-xl focus:outline-none focus:ring-1 focus:ring-editorial-tan text-white transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-editorial-tan uppercase tracking-widest mb-1.5">Description / Client Memo</label>
                <textarea 
                  rows={3}
                  placeholder="Notes about location layout, ceremony moments, style descriptors, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs px-3.5 py-3 bg-[#18181B] border border-editorial-border rounded-xl focus:outline-none focus:ring-1 focus:ring-editorial-tan text-white transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-editorial-tan uppercase tracking-widest mb-1.5">Shoot Event Date</label>
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 bg-[#18181B] border border-editorial-border rounded-xl focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-editorial-tan uppercase tracking-widest mb-1.5">Shoot Location (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="Napa Valley, CA"
                    value={locationStr}
                    onChange={(e) => setLocationStr(e.target.value)}
                    className="w-full text-xs px-3.5 py-3 bg-[#18181B] border border-editorial-border rounded-xl focus:outline-none text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-editorial-tan uppercase tracking-widest mb-1.5">Portfolio Tags (separated by commas)</label>
                <input 
                  type="text" 
                  placeholder="Wedding, Outdoor, Sunset"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full text-xs px-3.5 py-3 bg-[#18181B] border border-editorial-border rounded-xl focus:outline-none text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-editorial-tan uppercase tracking-widest mb-1.5">Visual Cover Art URL</label>
                <input 
                  type="text" 
                  placeholder="Leave empty for beautiful default presets"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  className="w-full text-xs px-3.5 py-3 bg-[#18181B] border border-editorial-border rounded-xl focus:outline-none text-white"
                />
              </div>

              <div className="border-t border-editorial-border pt-4 space-y-4">
                {/* Security Flags */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-white">Password Authentication Lock</span>
                    <span className="text-[10px] text-editorial-text-muted">Require clients to type a passcode to load media</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={isPasswordProtected}
                    onChange={(e) => setIsPasswordProtected(e.target.checked)}
                    className="h-4.5 w-4.5 rounded border-[#C4A484]/40 text-black focus:ring-editorial-tan"
                  />
                </div>

                {isPasswordProtected && (
                  <div className="space-y-3.5 p-3 rounded-xl border border-dashed border-[#C4A484]/30 bg-neutral-900/50">
                    <div>
                      <label className="block text-[9px] font-bold text-[#C4A484] uppercase tracking-wider mb-1">Custom Album Username</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. bennett"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 bg-[#18181B] border border-editorial-border text-white rounded-lg focus:outline-none focus:border-editorial-tan font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-[#C4A484] uppercase tracking-wider mb-1">Custom Album Passcode</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. 123456"
                        value={passcode}
                        onChange={(e) => {
                          setPasscode(e.target.value);
                          setPassword(e.target.value); // Sync to older state
                        }}
                        className="w-full text-xs px-3.5 py-2.5 bg-[#18181B] border border-editorial-border text-white rounded-lg focus:outline-none focus:border-editorial-tan font-mono"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-white">Active Share Link Expiration</span>
                    <span className="text-[10px] text-editorial-text-muted">Client sharing link will automatically expire after date</span>
                  </div>
                  <input 
                    type="date" 
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="text-xs p-1.5 bg-[#18181B] border border-editorial-border text-white rounded-lg"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-[#2A2A2E] pt-5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2 rounded-full border border-editorial-border text-[10px] font-bold uppercase tracking-widest text-[#999] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  id="submit-create-album-btn"
                  type="submit"
                  className="px-5 py-2 bg-white text-black hover:bg-editorial-tan rounded-full text-[10px] font-bold uppercase tracking-widest transition"
                >
                  Create & Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
