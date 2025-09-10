import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import Index from "@/pages/Index";
import Pricing from "@/pages/Pricing";
import ProductsIndex from "@/pages/products/Index";
import SalonsPage from "@/pages/solutions/Salons";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
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

                {/* Products */}
                <Route path="/products" element={<ProductsIndex />} />
                <Route path="/products/appointments" element={<div className="p-8">Appointments product page - coming soon</div>} />
                <Route path="/products/pos" element={<div className="p-8">POS product page - coming soon</div>} />

                {/* Solutions */}
                <Route path="/solutions/salons" element={<SalonsPage />} />

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
