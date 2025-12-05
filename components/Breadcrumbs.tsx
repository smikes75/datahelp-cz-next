'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  children?: React.ReactNode;
  customItems?: BreadcrumbItem[];
}

export function Breadcrumbs({ children, customItems }: BreadcrumbsProps) {
  const pathname = usePathname();
  const t = useTranslations();

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean);

    const breadcrumbs: BreadcrumbItem[] = [
      { name: t('nav.home'), path: '/' }
    ];

    let currentPath = '';

    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;

      // Map segments to readable names
      let name = segment;
      switch (segment) {
        case 'sluzby':
          name = t('nav.services');
          break;
        case 'o-nas':
          name = t('nav.about');
          break;
        case 'kontakt':
          name = t('nav.contact');
          break;
        case 'cenik':
          name = t('nav.pricing');
          break;
        case 'faq':
          name = 'FAQ';
          break;
        case 'hdd':
          name = t('services.hdd.title');
          break;
        case 'ssd':
          name = t('services.ssd.title');
          break;
        case 'raid':
          name = t('services.raid.title');
          break;
        case 'firmy':
          name = t('services.business.title');
          break;
        case 'case-studies':
        case 'pripady':
          name = t('caseStudies.title');
          break;
        case 'kalkulacka':
          name = t('nav.priceCalculator');
          break;
        case 'objednat-diagnostiku':
          name = t('orderDiagnostics.title');
          break;
        case 'blog':
        case 'clanky':
          name = 'Magazín';
          break;
        case 'technologie':
          name = t('nav.technology');
          break;
        case 'gdpr':
          name = 'GDPR';
          break;
        case 'cookies':
          name = 'Cookies';
          break;
        case 'obchodni-podminky':
          name = t('footer.terms');
          break;
        default:
          name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      }

      breadcrumbs.push({ name, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = customItems || generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 py-3">
      <div className="container mx-auto px-4">
        <div className={children ? "flex items-center justify-between" : ""}>
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((item, idx) => (
              <li key={item.path} className="flex items-center">
                {idx > 0 && <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />}
                {idx === 0 && <Home className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0 mt-0.5" />}
                {idx === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium flex items-center leading-none" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="text-primary hover:text-accent transition-colors flex items-center leading-none"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
          {children}
        </div>
      </div>
    </nav>
  );
}
