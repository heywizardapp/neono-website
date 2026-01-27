import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from '@/components/SEO/SEOHead';

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="Page Not Found - 404 Error | NeonO"
        description="The page you're looking for doesn't exist. Explore our solutions, pricing, and support resources."
        path={location.pathname}
        noindex
      />
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle">
        <div className="container max-w-2xl">
          <Card className="text-center p-8 lg:p-12 shadow-xl">
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="text-8xl lg:text-9xl font-bold text-primary/20">404</div>
                <h1 className="text-3xl lg:text-4xl font-bold">Page not found</h1>
                <p className="text-xl text-muted-foreground">
                  Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Link>
                </Button>
                <Button size="lg" variant="outline" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>
                  Can't find what you need? <Link to="/contact" className="text-primary hover:underline">Contact support</Link> for help.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default NotFound;
