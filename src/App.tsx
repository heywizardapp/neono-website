import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { InstallPrompt, registerServiceWorker } from "@/components/pwa/InstallPrompt";
import { LiveChat } from "@/components/chat/LiveChat";

import Index from "@/pages/Index";
import Pricing from "@/pages/Pricing";
import ProductsIndex from "@/pages/products/Index";
import SalonsPage from "@/pages/solutions/Salons";
import SolutionsIndex from "@/pages/solutions/Index";
import BarbershopsPage from "@/pages/solutions/Barbershops";
import SpasPage from "@/pages/solutions/Spas";
import AestheticsPage from "@/pages/solutions/Aesthetics";
import RoiPage from "@/pages/Roi";
import ResourcesIndex from "@/pages/resources/Index";
import BlogIndex from "@/pages/blog/Index";
import BlogPost from "@/pages/blog/BlogPost";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

// Initialize analytics and PWA features
if (typeof window !== 'undefined') {
  import('@/lib/analytics/heatmap');
  import('@/lib/analytics/scroll');
  import('@/lib/analytics/forms');
  registerServiceWorker();
}

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />

                {/* Auth */}
                <Route path="/signup" element={<div className="p-8">Signup page - coming soon</div>} />
                <Route path="/login" element={<div className="p-8">Login page - coming soon</div>} />
                <Route path="/demo" element={<div className="p-8">Demo page - coming soon</div>} />

                {/* Pricing */}
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/roi" element={<RoiPage />} />

                {/* Products */}
                <Route path="/products" element={<ProductsIndex />} />
                <Route path="/products/appointments" element={<div className="p-8">Appointments product page - coming soon</div>} />
                <Route path="/products/pos" element={<div className="p-8">POS product page - coming soon</div>} />

                {/* Solutions */}
                <Route path="/solutions" element={<SolutionsIndex />} />
                <Route path="/solutions/salons" element={<SalonsPage />} />
                <Route path="/solutions/barbershops" element={<BarbershopsPage />} />
                <Route path="/solutions/spas" element={<SpasPage />} />
                <Route path="/solutions/aesthetics" element={<AestheticsPage />} />

                {/* Resources & Content */}
                <Route path="/resources" element={<ResourcesIndex />} />
                <Route path="/blog" element={<BlogIndex />} />
                <Route path="/blog/:slug" element={<BlogPost />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <CookieBanner />
            <InstallPrompt />
            <LiveChat />
          </div>
        </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
