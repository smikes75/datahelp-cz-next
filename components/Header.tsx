'use client';

import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from '@/contexts/TranslationsContext';
import { Logo } from './Logo';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const t = useTranslations();

  // Zavře menu při změně cesty
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Scroll handling - skrytí/zobrazení headeru
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 0);

      // Skryje header při scrollu dolů, zobrazí při scrollu nahoru
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('accessibility.toggleMenu')}
              className="text-primary hover:text-accent transition-colors"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <Link href="/" className={`block font-bold ${isActive("/")} header-nav-link`}>
              {t('nav.home')}
            </Link>
            <Link href="/zachrana-dat" className={`block font-bold ${isActive("/zachrana-dat")} header-nav-link`}>
              {t('nav.services')}
            </Link>
            <Link href="/cenik-zachrany-dat" className={`block font-bold ${isActive("/cenik-zachrany-dat")} header-nav-link`}>
              {t('nav.pricing')}
            </Link>
            <Link href="/clanky" className={`block font-bold ${isActive("/clanky")} header-nav-link`}>
              Blog
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
