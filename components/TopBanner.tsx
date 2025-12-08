'use client';

/**
 * Top Banner - Zobrazuje kontaktní banner a volitelně animovaný banner pod ním
 * Nastavení se načítá z Supabase (site_settings tabulka)
 */

import { useEffect, useState } from 'react';
import { ContactBanner } from './ContactBanner';
import { DynamicAnnouncementBanner } from './DynamicAnnouncementBanner';

interface BannerSettings {
  enabled: boolean;
  type: 'contact' | 'announcement';
  text: string;
  bgColor: string;
}

// Výchozí nastavení (fallback)
const DEFAULT_SETTINGS: BannerSettings = {
  enabled: false,
  type: 'contact',
  text: 'Svoz médií ZDARMA po celé ČR!',
  bgColor: 'blue-900',
};

export function TopBanner() {
  const [settings, setSettings] = useState<BannerSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Načtení nastavení z API
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/admin/settings?key=banner');
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch {
        // Použij výchozí nastavení při chybě
        console.warn('Failed to fetch banner settings, using defaults');
      } finally {
        setLoaded(true);
      }
    };

    fetchSettings();
  }, []);

  return (
    <>
      {/* Vždy zobrazit kontaktní banner nahoře */}
      <ContactBanner />

      {/* Pokud je animovaný banner zapnutý, zobraz ho pod kontaktním */}
      {loaded && settings.enabled && (
        <DynamicAnnouncementBanner text={settings.text} bgColor={settings.bgColor} />
      )}
    </>
  );
}
