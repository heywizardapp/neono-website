import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Suspense, lazy } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { InstallPrompt, registerServiceWorker } from "@/components/pwa/InstallPrompt";
import { LiveChat } from "@/components/chat/LiveChat";
import { PerformanceMonitor, PerformanceErrorBoundary } from '@/components/performance/PerformanceMonitor';
import { SmartPreloader } from '@/components/advanced/SmartPreloader';

// Lazy load pages for better performance
import Index from './pages/Index'; // Keep homepage immediate for best UX
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Roi = lazy(() => import('./pages/Roi'));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));
const Security = lazy(() => import('./pages/Security').then(m => ({ default: m.Security })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));

// Product pages
const ProductsIndex = lazy(() => import('./pages/products/Index'));

// Solutions pages  
const SolutionsIndex = lazy(() => import('./pages/solutions/Index'));
const Salons = lazy(() => import('./pages/solutions/Salons'));
const Spas = lazy(() => import('./pages/solutions/Spas'));
const Barbershops = lazy(() => import('./pages/solutions/Barbershops'));
const Aesthetics = lazy(() => import('./pages/solutions/Aesthetics'));

// Resources pages
const ResourcesIndex = lazy(() => import('./pages/resources/Index'));

// Blog pages
const BlogIndex = lazy(() => import('./pages/blog/Index'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost'));

const queryClient = new QueryClient();

// Initialize analytics and PWA features
if (typeof window !== 'undefined') {
  import('@/lib/analytics/heatmap');
  import('@/lib/analytics/scroll');
  import('@/lib/analytics/forms');
  registerServiceWorker();
}

// Loading fallback component with enhanced UX
const PageFallback = () => (
  <SmartPreloader variant="skeleton" />
);

export default function App() {
  return (
    <PerformanceErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-background text-foreground">
              <Header />
              <main className="flex-1">
                <Suspense fallback={<PageFallback />}>
                  <Routes>
                    <Route path="/" element={<Index />} />

                    {/* Auth */}
                    <Route path="/signup" element={<div className="p-8">Signup page - coming soon</div>} />
                    <Route path="/login" element={<div className="p-8">Login page - coming soon</div>} />
                    <Route path="/demo" element={<div className="p-8">Demo page - coming soon</div>} />

                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/roi" element={<Roi />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/security" element={<Security />} />

                    {/* Products */}
                    <Route path="/products" element={<ProductsIndex />} />
                    <Route path="/products/appointments" element={<div className="p-8">Appointments product page - coming soon</div>} />
                    <Route path="/products/pos" element={<div className="p-8">POS product page - coming soon</div>} />

                    {/* Solutions */}
                    <Route path="/solutions" element={<SolutionsIndex />} />
                    <Route path="/solutions/salons" element={<Salons />} />
                    <Route path="/solutions/barbershops" element={<Barbershops />} />
                    <Route path="/solutions/spas" element={<Spas />} />
                    <Route path="/solutions/aesthetics" element={<Aesthetics />} />

                    {/* Resources & Content */}
                    <Route path="/resources" element={<ResourcesIndex />} />
                    <Route path="/blog" element={<BlogIndex />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <CookieBanner />
              <InstallPrompt />
              <LiveChat />
              
              {/* Performance Monitor - Only shows in development */}
              <PerformanceMonitor position="bottom-right" />
            </div>
          </BrowserRouter>
          
        </QueryClientProvider>
      </HelmetProvider>
    </PerformanceErrorBoundary>
  );
}
