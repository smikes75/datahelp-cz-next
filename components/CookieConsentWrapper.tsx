'use client';

import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import { CookieConsent } from './CookieConsent';
import { CookieSettings } from './CookieSettings';

export function CookieConsentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CookieConsentProvider>
      {children}
      <CookieConsent />
      <CookieSettings />
    </CookieConsentProvider>
  );
}
