'use client';

import { Menu, X, Phone } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/contexts/TranslationsContext';
import { Logo } from './Logo';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();
  const t = useTranslations();

  // Zavře menu při změně cesty
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Throttled scroll handler for better performance (INP optimization)
  const updateHeader = useCallback(() => {
    const currentScrollY = window.scrollY;

    setIsScrolled(currentScrollY > 0);

    // Skryje header při scrollu dolů, zobrazí při scrollu nahoru
    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, []);

  // Scroll handling - skrytí/zobrazení headeru s throttlingem
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateHeader);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateHeader]);

  const isActive = (path: string) => {
    // usePathname z next-intl vrací cestu bez locale prefixu
    return pathname === path
      ? "text-accent font-bold"
      : "text-gray-700 hover:text-accent font-bold";
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-white shadow-md'
    } ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <nav className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`${isActive("/")} header-nav-link`}>
              {t('nav.home')}
            </Link>
            <Link href="/zachrana-dat" className={`${isActive("/zachrana-dat")} header-nav-link`}>
              {t('nav.services')}
            </Link>
            <Link href="/cenik-zachrany-dat" className={`${isActive("/cenik-zachrany-dat")} header-nav-link`}>
              {t('nav.pricing')}
            </Link>
            <Link href="/clanky" className={`${isActive("/clanky")} header-nav-link`}>
              Blog
            </Link>
            <Link href="/o-nas" className={`${isActive("/o-nas")} header-nav-link`}>
              {t('nav.about')}
            </Link>
            <Link href="/reference" className={`${isActive("/reference")} header-nav-link`}>
              {t('nav.references')}
            </Link>
            <Link href="/caste-dotazy" className={`${isActive("/caste-dotazy")} header-nav-link`}>
              FAQ
            </Link>
            <Link href="/kontakt" className={`${isActive("/kontakt")} header-nav-link`}>
              {t('nav.contact')}
            </Link>
          </div>

          {/* Mobile: Phone icon + Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <a
              href="tel:+420775220440"
              aria-label={t('accessibility.callHotline')}
              className="text-primary hover:text-accent transition-colors flex items-center justify-center"
            >
              <Phone className="h-6 w-6" />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('accessibility.toggleMenu')}
              className="text-primary hover:text-accent transition-colors flex items-center justify-center"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <Link href="/" className={`block font-bold ${isActive("/")} header-nav-link`}>
              {t('nav.home')}
            </Link>
            <Link href="/cenik-zachrany-dat" className={`block font-bold ${isActive("/cenik-zachrany-dat")} header-nav-link`}>
              {t('nav.pricing')}
            </Link>
            <Link href="/o-nas" className={`block font-bold ${isActive("/o-nas")} header-nav-link`}>
              {t('nav.about')}
            </Link>
            <Link href="/caste-dotazy" className={`block font-bold ${isActive("/caste-dotazy")} header-nav-link`}>
              FAQ
            </Link>
            <Link href="/kontakt" className={`block font-bold ${isActive("/kontakt")} header-nav-link`}>
              {t('nav.contact')}
            </Link>
            <Link href="/poptavka-zachrany-dat" className="block font-bold text-primary hover:text-accent text-[17px]">
              Diagnostika
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
