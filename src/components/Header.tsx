import * as React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, X, Search, ChevronDown } from 'lucide-react'
import { GlobalSearch } from '@/components/search/GlobalSearch'
import { useScrollHeader } from '@/hooks/useScrollHeader'
import { cn } from '@/lib/utils'
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher'
import { useI18n } from '@/hooks/useI18n'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const getProductLinks = (t: (key: string) => string) => [
  { name: t('nav.products.staff'), href: '/products/staff-management', description: t('nav.products.staff.desc') },
  { name: t('nav.products.appointments'), href: '/products/appointments', description: t('nav.products.appointments.desc') },
  { name: t('nav.products.booking'), href: '/products/online-booking', description: t('nav.products.booking.desc') },
  { name: t('nav.products.marketing'), href: '/products/marketing', description: t('nav.products.marketing.desc') },
  { name: t('nav.products.ai'), href: '/products/ai', description: t('nav.products.ai.desc') },
  { name: t('nav.products.landing'), href: '/products/landing-page-builder', description: t('nav.products.landing.desc') },
  { name: t('nav.products.analytics'), href: '/products/analytics', description: t('nav.products.analytics.desc') },
  { name: t('nav.products.pos'), href: '/products/pos', description: t('nav.products.pos.desc') },
];

const getSolutionLinks = (t: (key: string) => string) => [
  { name: t('nav.solutions.salons'), href: '/solutions/salons' },
  { name: t('nav.solutions.barbershops'), href: '/solutions/barbershops' },
  { name: t('nav.solutions.spas'), href: '/solutions/spas' },
  { name: t('nav.solutions.aesthetics'), href: '/solutions/aesthetics' },
  { name: t('nav.solutions.nails'), href: '/solutions/nails' },
];

export function Header() {
  const [open, setOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const { isScrolled, isVisible, scrollDirection } = useScrollHeader(20, 150)
  const { t } = useI18n();
  
  const productLinks = getProductLinks(t);
  const solutionLinks = getSolutionLinks(t);
  
  React.useEffect(() => {
    function onEsc(e: KeyboardEvent) { 
      if (e.key === 'Escape') setOpen(false) 
    }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [])

  // Lock scroll when mobile menu is open
  React.useEffect(() => { 
    document.documentElement.style.overflow = open ? 'hidden' : '' 
  }, [open])

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300 will-change-transform",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md shadow-lg border-border/50" 
          : "bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-transparent",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className={cn(
            "flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-all duration-300",
            isScrolled && "scale-95"
          )}
        >
          <div className={cn(
            "h-8 w-8 rounded-xl bg-gradient-hero text-white grid place-items-center font-bold transition-all duration-300",
            isScrolled && "shadow-glow"
          )}>
            N
          </div>
          <span className="font-display font-bold text-foreground">NeonO</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm sm:text-base" aria-label="Primary">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors text-sm font-medium">
                    {t('header.products')}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-64">
                  {productLinks.map((product) => (
                    <DropdownMenuItem key={product.href} asChild>
                      <Link to={product.href} className="flex flex-col items-start py-2">
                        <div className="font-medium">{product.name}</div>
                        {product.description && (
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {product.description}
                          </div>
                        )}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:text-foreground transition-colors min-h-[44px] px-3 py-2 inline-flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring text-muted-foreground">
              {t('header.solutions')}
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[200px]">
              {solutionLinks.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link to={item.href} className="w-full cursor-pointer">
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <TopNav to="/pricing">Pricing</TopNav>
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:text-foreground transition-colors min-h-[44px] px-3 py-2 inline-flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring text-muted-foreground">
              Company
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[200px]">
              <DropdownMenuItem asChild>
                <Link to="/company/about" className="w-full cursor-pointer">
                  About
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/company/careers" className="w-full cursor-pointer">
                  Careers
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contact" className="w-full cursor-pointer">
                  Contact
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <TopNav to="/resources">Resources</TopNav>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className={cn(
              "text-sm sm:text-base text-muted-foreground hover:text-foreground transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring min-h-[44px] min-w-[44px] px-3 py-2 inline-flex items-center justify-center rounded-lg border border-transparent hover:border-border hover:bg-accent/50 active:scale-95",
              isScrolled && "hover:shadow-md"
            )}
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
          </button>
          <LanguageSwitcher className="hidden sm:flex" />
          <Link 
            to="/login" 
            className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring min-h-[44px] px-4 py-3 inline-flex items-center hover:bg-accent/50 rounded-lg"
          >
            {t('header.signin')}
          </Link>
          <Button asChild size="default" className="min-h-[44px] min-w-[44px] hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
            <Link to="/signup">{t('header.trial')}</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={cn(
            "md:hidden inline-flex items-center justify-center rounded-lg border min-h-[44px] min-w-[44px] p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-all duration-200 hover:bg-accent/50 active:scale-95",
            open && "bg-accent"
          )}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="relative h-5 w-5">
            <span 
              className={cn(
                "absolute h-0.5 w-5 bg-current transition-all duration-300 transform origin-center",
                open ? "rotate-45 translate-y-0" : "-translate-y-1.5"
              )}
            />
            <span 
              className={cn(
                "absolute h-0.5 w-5 bg-current transition-all duration-300",
                open ? "opacity-0" : "opacity-100"
              )}
            />
            <span 
              className={cn(
                "absolute h-0.5 w-5 bg-current transition-all duration-300 transform origin-center",
                open ? "-rotate-45 translate-y-0" : "translate-y-1.5"
              )}
            />
          </div>
        </button>
      </div>

      <MobileDrawer 
        open={open} 
        onClose={() => setOpen(false)} 
        productLinks={productLinks}
        solutionLinks={solutionLinks}
        t={t}
      />
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}

function TopNav({ to, children }: React.PropsWithChildren<{ to: string }>) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `hover:text-foreground transition-colors min-h-[44px] px-3 py-2 inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${isActive ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
    >
      {children}
    </NavLink>
  )
}

function MobileDrawer({ 
  open, 
  onClose, 
  productLinks, 
  solutionLinks,
  t
}: { 
  open: boolean; 
  onClose: () => void;
  productLinks: Array<{ name: string; href: string; description: string }>;
  solutionLinks: Array<{ name: string; href: string }>;
  t: (key: string) => string;
}) {
  return (
    <div
      className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      aria-hidden={!open}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel */}
      <div
        className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-background shadow-xl border-l p-4 flex flex-col gap-2 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center gap-2 mb-4 pb-4 border-b">
          <div className="h-8 w-8 rounded-xl bg-gradient-hero text-white grid place-items-center font-bold">N</div>
          <span className="font-display font-bold">NeonO</span>
        </div>
        
        <div className="space-y-1">
          <h3 className="font-semibold text-sm text-muted-foreground px-3 mb-2">{t('header.products')}</h3>
          {productLinks.map((item) => (
            <MobileLink key={item.name} to={item.href} onClose={onClose}>
              {item.name}
            </MobileLink>
          ))}
        </div>
        
        <div className="space-y-1">
          <h3 className="font-semibold text-sm text-muted-foreground px-3 mb-2">{t('header.solutions')}</h3>
          {solutionLinks.map((item) => (
            <MobileLink key={item.name} to={item.href} onClose={onClose}>
              {item.name}
            </MobileLink>
          ))}
        </div>

        <div className="space-y-1">
          <MobileLink to="/pricing" onClose={onClose}>Pricing</MobileLink>
        </div>

        <div className="space-y-1">
          <h3 className="font-semibold text-sm text-muted-foreground px-3 mb-2">COMPANY</h3>
          <MobileLink to="/company/about" onClose={onClose}>About</MobileLink>
          <MobileLink to="/company/careers" onClose={onClose}>Careers</MobileLink>
          <MobileLink to="/contact" onClose={onClose}>Contact</MobileLink>
        </div>

        <div className="space-y-1">
          <MobileLink to="/resources" onClose={onClose}>Resources</MobileLink>
        </div>

        <div className="flex flex-col gap-3 pt-4 mt-auto border-t">
          <Link 
            to="/login" 
            onClick={onClose} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] px-4 py-3 inline-flex items-center justify-center"
          >
            {t('header.signin')}
          </Link>
          <Link 
            to="/signup" 
            onClick={onClose} 
            className="inline-flex items-center justify-center rounded-lg min-h-[44px] px-4 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            {t('header.trial')}
          </Link>
        </div>
      </div>
    </div>
  )
}

function MobileLink({ to, children, onClose }: React.PropsWithChildren<{ to: string; onClose: () => void }>) {
  return (
    <NavLink
      to={to}
      onClick={onClose}
      className={({ isActive }) => `block rounded-lg px-3 py-3 min-h-[44px] text-sm transition-colors ${isActive ? 'bg-accent text-accent-foreground font-medium' : 'text-foreground hover:bg-accent/50'}`}
    >
      {children}
    </NavLink>
  )
}