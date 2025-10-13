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
const Demo = lazy(() => import('./pages/Demo'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Roi = lazy(() => import('./pages/Roi'));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));
const TermsOfService = lazy(() => import('./pages/TermsOfService').then(m => ({ default: m.TermsOfService })));
const Security = lazy(() => import('./pages/Security').then(m => ({ default: m.Security })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const Compare = lazy(() => import('./pages/Compare'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));

// Product pages
const ProductsIndex = lazy(() => import('./pages/products/Index'));
const StaffManagement = lazy(() => import('./pages/products/StaffManagement'));
const Appointments = lazy(() => import('./pages/products/Appointments'));
const OnlineBooking = lazy(() => import('./pages/products/OnlineBooking'));
const Marketing = lazy(() => import('./pages/products/Marketing'));
const AI = lazy(() => import('./pages/products/AI'));
const LandingPageBuilder = lazy(() => import('./pages/products/LandingPageBuilder'));
const Analytics = lazy(() => import('./pages/products/Analytics'));
const Pos = lazy(() => import('./pages/products/Pos'));

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
const BlogLogin = lazy(() => import('./pages/admin/BlogLogin'));
const BlogAdmin = lazy(() => import('./pages/admin/BlogAdmin'));
const BlogEditor = lazy(() => import('./pages/admin/BlogEditor'));

// Resources Hub (unified)
const ResourcesHub = lazy(() => import('./pages/ResourcesHub'));

// Company pages
const CompanyIndex = lazy(() => import('./pages/company/Index'));
const CompanyAbout = lazy(() => import('./pages/company/About'));
const CompanyCareers = lazy(() => import('./pages/company/Careers'));

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
                    <Route path="/demo" element={<Demo />} />

                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/roi" element={<Roi />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/case-studies" element={<CaseStudies />} />

                    {/* Products */}
                    <Route path="/products" element={<ProductsIndex />} />
                    <Route path="/products/staff-management" element={<StaffManagement />} />
                    <Route path="/products/appointments" element={<Appointments />} />
                    <Route path="/products/online-booking" element={<OnlineBooking />} />
                    <Route path="/products/marketing" element={<Marketing />} />
                    <Route path="/products/ai" element={<AI />} />
                    <Route path="/products/landing-page-builder" element={<LandingPageBuilder />} />
                    <Route path="/products/analytics" element={<Analytics />} />
                    <Route path="/products/pos" element={<Pos />} />

                    {/* Solutions */}
                    <Route path="/solutions" element={<SolutionsIndex />} />
                    <Route path="/solutions/salons" element={<Salons />} />
                    <Route path="/solutions/barbershops" element={<Barbershops />} />
                    <Route path="/solutions/spas" element={<Spas />} />
                    <Route path="/solutions/aesthetics" element={<Aesthetics />} />

                    {/* Resources Hub (Unified) */}
                    <Route path="/resources" element={<ResourcesHub />} />
                    <Route path="/resources/:slug" element={<BlogPost />} />
                    
                    {/* Legacy blog routes - redirect to resources */}
                    <Route path="/blog" element={<ResourcesHub />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />

                    {/* Admin Routes */}
                    <Route path="/admin/login" element={<BlogLogin />} />
                    <Route path="/admin/blog" element={<BlogAdmin />} />
                    <Route path="/admin/blog/new" element={<BlogEditor />} />
                    <Route path="/admin/blog/edit/:id" element={<BlogEditor />} />

                    {/* Company */}
                    <Route path="/company" element={<CompanyIndex />} />
                    <Route path="/company/about" element={<CompanyAbout />} />
                    <Route path="/company/careers" element={<CompanyCareers />} />

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
