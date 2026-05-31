import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SaaSProvider, useSaaS } from './context/SaaSContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { AlbumsPage } from './pages/AlbumsPage';
import { UploadPage } from './pages/UploadPage';
import { AlbumDetailPage } from './pages/AlbumDetailPage';
import { ClientGallery } from './pages/ClientGallery';
import { PricingPage } from './pages/PricingPage';
import { AdminPage } from './pages/AdminPage';

// Additional Public Pages
import { GalleryPage } from './pages/GalleryPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { BookingPage } from './pages/BookingPage';

// Route Guards
import { ProtectedRoute } from './components/ProtectedRoute';

// Layout Bridge to decide which outer scaffolding to render
const ScaffoldingBridge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useSaaS();

  const isSharedPage = location.pathname.startsWith('/album') || location.pathname.startsWith('/gallery');
  
  const isDashboardPage = [
    '/dashboard', 
    '/albums', 
    '/upload', 
    '/pricing', 
    '/admin'
  ].some(p => location.pathname.startsWith(p));

  // Auto redirect to authentication panel if not logged in
  if (isDashboardPage && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Case: Shared gallery viewing has its own complete workspace (no outer navigation overlays)
  if (isSharedPage) {
    return <>{children}</>;
  }

  // Case: Dashboard layout has top navbar, side panel, and scrollable container
  if (isDashboardPage && isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen bg-white text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
        <Navbar />
        <div className="flex flex-1 flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-950 transition-colors">
            {children}
          </main>
        </div>
      </div>
    );
  }

  // Case: Landing pages and Auth splits have top nav without side rails
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <SaaSProvider>
      <Router>
        <ScaffoldingBridge>
          <Routes>
            {/* Global public pages */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/booking" element={<BookingPage />} />

            {/* Private Photographer panels */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><UploadPage /></ProtectedRoute>} />
            <Route path="/albums" element={<ProtectedRoute><AlbumsPage /></ProtectedRoute>} />
            
            {/* Split management and direct client galleries */}
            <Route path="/album/:id" element={<AlbumDetailPage />} />
            <Route path="/gallery/:id" element={<ClientGallery />} />
            
            {/* Optional advance administration workspace */}
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />

            {/* Fallback routing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ScaffoldingBridge>
      </Router>
    </SaaSProvider>
  );
}
