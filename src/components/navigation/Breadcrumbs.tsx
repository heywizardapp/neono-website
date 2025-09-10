import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Crumb } from '@/types/roi';

interface BreadcrumbsProps {
  customCrumbs?: Crumb[];
  showOnPaths?: string[]; // Only show on these path patterns
}

export function Breadcrumbs({ customCrumbs, showOnPaths }: BreadcrumbsProps) {
  const location = useLocation();
  
  // Default path patterns where breadcrumbs should appear
  const defaultShowOnPaths = [
    '/products/',
    '/solutions/',
    '/customers/',
    '/blog/',
    '/guides/',
    '/help/'
  ];
  
  const pathsToCheck = showOnPaths || defaultShowOnPaths;
  const shouldShow = pathsToCheck.some(pattern => location.pathname.startsWith(pattern));
  
  if (!shouldShow && !customCrumbs) return null;

  // Generate breadcrumbs from current path
  const generateCrumbs = (): Crumb[] => {
    if (customCrumbs) return customCrumbs;
    
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const crumbs: Crumb[] = [{ label: 'Home', href: '/' }];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Convert segment to readable label
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // Handle specific routes
      switch (segment) {
        case 'products':
          label = 'Products';
          break;
        case 'solutions':
          label = 'Solutions';
          break;
        case 'salons':
          label = 'Hair Salons';
          break;
        case 'barbershops':
          label = 'Barbershops';
          break;
        case 'spas':
          label = 'Spas & Wellness';
          break;
        case 'aesthetics':
          label = 'Medical Aesthetics';
          break;
        case 'pos':
          label = 'Point of Sale';
          break;
        case 'appointments':
          label = 'Appointments';
          break;
        case 'roi':
          label = 'ROI Calculator';
          break;
        default:
          // Convert kebab-case to Title Case
          label = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }
      
      crumbs.push({
        label,
        href: currentPath
      });
    });
    
    return crumbs;
  };

  const crumbs = generateCrumbs();
  
  if (crumbs.length <= 1) return null;

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": `https://neono.app${crumb.href}`
    }))
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="py-4 border-b bg-muted/30">
        <div className="container">
          <ol className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;
              const isFirst = index === 0;
              
              return (
                <li key={crumb.href} className="flex items-center gap-2 min-w-0">
                  {!isFirst && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
                  )}
                  
                  {isLast ? (
                    <span 
                      className="text-sm font-medium text-foreground truncate"
                      aria-current="page"
                    >
                      {isFirst && <Home className="h-4 w-4 mr-1 inline" aria-hidden="true" />}
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      to={crumb.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-sm px-1 -mx-1 flex items-center gap-1 min-w-0"
                    >
                      {isFirst && <Home className="h-4 w-4 flex-shrink-0" aria-hidden="true" />}
                      <span className="truncate">{crumb.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}

export default Breadcrumbs;