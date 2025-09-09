import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const productLinks = [
  { name: 'Appointments & Calendar', href: '/products/appointments', description: 'Smart scheduling for busy teams' },
  { name: 'POS & Payments', href: '/products/pos', description: 'Tap, split tips, instant payouts' },
  { name: 'Marketing', href: '/products/marketing', description: 'SMS and email campaigns' },
  { name: 'Online Booking', href: '/products/booking', description: 'Marketplace and bookings' },
  { name: 'Website & Link-in-Bio', href: '/products/website', description: 'Launch a clean site' },
  { name: 'Analytics & AI', href: '/products/analytics', description: 'Role-based insights' },
];

const solutionLinks = [
  { name: 'Salons', href: '/solutions/salons' },
  { name: 'Barbershops', href: '/solutions/barbershops' },
  { name: 'Spas', href: '/solutions/spas' },
  { name: 'Aesthetics', href: '/solutions/aesthetics' },
  { name: 'Nails', href: '/solutions/nails' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
            <span className="text-lg font-bold text-white">N</span>
          </div>
          <span className="text-xl font-display font-bold text-foreground">NeonO</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[600px] gap-3 p-6 md:grid-cols-2">
                  {productLinks.map((item) => (
                    <NavigationMenuLink key={item.name} asChild>
                      <Link
                        to={item.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">{item.name}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[300px] gap-3 p-6">
                  {solutionLinks.map((item) => (
                    <NavigationMenuLink key={item.name} asChild>
                      <Link
                        to={item.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">{item.name}</div>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/pricing" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Pricing
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/customers" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Customers
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/blog" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                  Resources
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
          <Button variant="default" asChild>
            <Link to="/signup">Start Free Trial</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col space-y-4 mt-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Products</h3>
                {productLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">Solutions</h3>
                {solutionLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="space-y-2">
                <Link to="/pricing" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Pricing
                </Link>
                <Link to="/customers" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Customers
                </Link>
                <Link to="/blog" className="block px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                  Resources
                </Link>
              </div>

              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="ghost" asChild>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>Start Free Trial</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}