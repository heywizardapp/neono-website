import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Suspense, lazy } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { InstallPrompt, registerServiceWorker } from "@/components/pwa/InstallPrompt";
import { LiveChat } from "@/components/chat/LiveChat";
import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor';
import { PerformanceErrorBoundary } from '@/components/performance/PerformanceMonitor';
import { SmartPreloader } from '@/components/advanced/SmartPreloader';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

<<<<<<< Updated upstream
// Lazy load pages for better performance
import Index from './pages/Index'; // Keep homepage immediate for best UX
const Pricing = lazy(() => import('./pages/Pricing'));
=======
// Direct imports for frequently used pages to avoid React context issues
import Index from './pages/Index';
import ResourcesHub from './pages/ResourcesHub';
import Pricing from './pages/Pricing';
import Salons from './pages/solutions/Salons';
import Barbershops from './pages/solutions/Barbershops';
import Spas from './pages/solutions/Spas';
import Aesthetics from './pages/solutions/Aesthetics';

// Auth pages - direct imports
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Onboarding from './pages/auth/Onboarding';

// Lazy load less frequently accessed pages
>>>>>>> Stashed changes
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
const Developers = lazy(() => import('./pages/Developers'));
const Help = lazy(() => import('./pages/Help'));
const Status = lazy(() => import('./pages/Status'));

// Academy pages
const Academy = lazy(() => import('./pages/academy/Academy'));
const AcademyCategory = lazy(() => import('./pages/academy/Category'));
const AcademyArticle = lazy(() => import('./pages/academy/Article'));
const AcademySearch = lazy(() => import('./pages/academy/Search'));

// Product pages - direct imports to avoid React context issues
import ProductsIndex from './pages/products/Index';
import StaffManagement from './pages/products/StaffManagement';
import Appointments from './pages/products/Appointments';
import OnlineBooking from './pages/products/OnlineBooking';
import Marketing from './pages/products/Marketing';
import Loyalty from './pages/products/Loyalty';
import AI from './pages/products/AI';
import LandingPageBuilder from './pages/products/LandingPageBuilder';
import Analytics from './pages/products/Analytics';
import Pos from './pages/products/Pos';

// POS Hardware pages
const PosHardware = lazy(() => import('./pages/products/pos/Hardware'));
const S700 = lazy(() => import('./pages/products/pos/S700'));
const Wisepos = lazy(() => import('./pages/products/pos/Wisepos'));
const ContactlessReader = lazy(() => import('./pages/products/pos/ContactlessReader'));

// Solutions pages  
const SolutionsIndex = lazy(() => import('./pages/solutions/Index'));
const Salons = lazy(() => import('./pages/solutions/Salons'));
const Spas = lazy(() => import('./pages/solutions/Spas'));
const Barbershops = lazy(() => import('./pages/solutions/Barbershops'));
const Aesthetics = lazy(() => import('./pages/solutions/Aesthetics'));

// Blog pages
const BlogIndex = lazy(() => import('./pages/blog/Index'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost'));
const BlogLogin = lazy(() => import('./pages/admin/BlogLogin'));
const BlogAdmin = lazy(() => import('./pages/admin/BlogAdmin'));
const BlogEditor = lazy(() => import('./pages/admin/BlogEditor'));

<<<<<<< Updated upstream
// Resources Hub (unified)
const ResourcesHub = lazy(() => import('./pages/ResourcesHub'));
=======
// Case study pages
const MetroBeauty = lazy(() => import('./pages/case-studies/MetroBeauty'));

// Comparison pages
const ComparisonsHub = lazy(() => import('./pages/comparisons/Index'));
const FreshaComparison = lazy(() => import('./pages/comparisons/Fresha'));
const VagaroComparison = lazy(() => import('./pages/comparisons/Vagaro'));
const SalonMonsterComparison = lazy(() => import('./pages/comparisons/SalonMonster'));
const SquireComparison = lazy(() => import('./pages/comparisons/Squire'));
const PhorestComparison = lazy(() => import('./pages/comparisons/Phorest'));
>>>>>>> Stashed changes

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
    <ErrorBoundary>
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
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/demo" element={<Demo />} />

                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/developers" element={<Developers />} />
                    <Route path="/roi" element={<Roi />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/case-studies" element={<CaseStudies />} />
                    <Route path="/case-studies/metro-beauty" element={<MetroBeauty />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/status" element={<Status />} />
                    <Route path="/academy" element={<Academy />} />
                    <Route path="/academy/search" element={<AcademySearch />} />
                    <Route path="/academy/:slug" element={<AcademyCategory />} />
                    <Route path="/academy/:categorySlug/:articleSlug" element={<AcademyArticle />} />

                    {/* Competitor Comparisons */}
                    <Route path="/comparisons" element={<ComparisonsHub />} />
                    <Route path="/vs/fresha" element={<FreshaComparison />} />
                    <Route path="/vs/vagaro" element={<VagaroComparison />} />
                    <Route path="/vs/salon-monster" element={<SalonMonsterComparison />} />
                    <Route path="/vs/squire" element={<SquireComparison />} />
                    <Route path="/vs/phorest" element={<PhorestComparison />} />

                    {/* Products */}
                    <Route path="/products" element={<ProductsIndex />} />
                    <Route path="/products/staff-management" element={<StaffManagement />} />
                    <Route path="/products/appointments" element={<Appointments />} />
                    <Route path="/products/online-booking" element={<OnlineBooking />} />
                    <Route path="/products/marketing" element={<Marketing />} />
                    <Route path="/products/loyalty" element={<Loyalty />} />
                    <Route path="/products/ai" element={<AI />} />
                    <Route path="/products/landing-page-builder" element={<LandingPageBuilder />} />
                    <Route path="/products/analytics" element={<Analytics />} />
                    <Route path="/products/pos" element={<Pos />} />
                    
                    {/* POS Hardware */}
                    <Route path="/products/pos/hardware" element={<PosHardware />} />
                    <Route path="/products/pos/hardware/s700" element={<S700 />} />
                    <Route path="/products/pos/hardware/wisepos" element={<Wisepos />} />
                    <Route path="/products/pos/hardware/contactless-reader" element={<ContactlessReader />} />

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
              <PerformanceErrorBoundary>
                <PerformanceMonitor position="bottom-right" />
              </PerformanceErrorBoundary>
              
              {/* Vercel Speed Insights - Production only */}
              {import.meta.env.PROD && <SpeedInsights />}
            </div>
          </BrowserRouter>
          
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
