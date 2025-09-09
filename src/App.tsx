import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import ProductsIndex from "./pages/products/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/products" element={<ProductsIndex />} />
              {/* Products */}
              <Route path="/products/appointments" element={<div className="p-8">Appointments product page - coming soon</div>} />
              <Route path="/products/pos" element={<div className="p-8">POS product page - coming soon</div>} />
              <Route path="/products/marketing" element={<div className="p-8">Marketing product page - coming soon</div>} />
              <Route path="/products/booking" element={<div className="p-8">Online Booking product page - coming soon</div>} />
              <Route path="/products/website" element={<div className="p-8">Website product page - coming soon</div>} />
              <Route path="/products/analytics" element={<div className="p-8">Analytics product page - coming soon</div>} />
              {/* Solutions */}
              <Route path="/solutions/salons" element={<div className="p-8">Salons solution page - coming soon</div>} />
              <Route path="/solutions/barbershops" element={<div className="p-8">Barbershops solution page - coming soon</div>} />
              <Route path="/solutions/spas" element={<div className="p-8">Spas solution page - coming soon</div>} />
              <Route path="/solutions/aesthetics" element={<div className="p-8">Aesthetics solution page - coming soon</div>} />
              <Route path="/solutions/nails" element={<div className="p-8">Nails solution page - coming soon</div>} />
              {/* Other pages */}
              <Route path="/customers" element={<div className="p-8">Customers page - coming soon</div>} />
              <Route path="/blog" element={<div className="p-8">Blog page - coming soon</div>} />
              <Route path="/signup" element={<div className="p-8">Signup page - coming soon</div>} />
              <Route path="/login" element={<div className="p-8">Login page - coming soon</div>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
