'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CookiePreferences {
  functional: boolean;
  analytical: boolean;
  marketing: boolean;
  personalization: boolean;
}

interface CookieConsentContextType {
  preferences: CookiePreferences;
  consentGiven: boolean;
  showBanner: boolean;
  showSettings: boolean;
  updatePreferences: (prefs: Partial<CookiePreferences>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  closeBanner: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const STORAGE_KEY = 'owcc'; // Same as datahelp.cz
const DEFAULT_PREFERENCES: CookiePreferences = {
  functional: true, // Always required
  analytical: false,
  marketing: false,
  personalization: false,
};

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [consentGiven, setConsentGiven] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
        setConsentGiven(true);
        setShowBanner(false);
      } catch {
        // Invalid storage, show banner
        setShowBanner(true);
      }
    } else {
      // No consent given yet, show banner
      setShowBanner(true);
    }
  }, []);

  const updatePreferences = (prefs: Partial<CookiePreferences>) => {
    setPreferences((prev) => ({
      ...prev,
      ...prefs,
      functional: true, // Functional always enabled
    }));
  };

  const saveToStorage = (prefs: CookiePreferences) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setConsentGiven(true);
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      functional: true,
      analytical: true,
      marketing: true,
      personalization: true,
    };
    setPreferences(allAccepted);
    saveToStorage(allAccepted);
    setShowBanner(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    const allRejected: CookiePreferences = {
      functional: true, // Functional cannot be rejected
      analytical: false,
      marketing: false,
      personalization: false,
    };
    setPreferences(allRejected);
    saveToStorage(allRejected);
    setShowBanner(false);
    setShowSettings(false);
  };

  const savePreferences = () => {
    saveToStorage(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const closeBanner = () => {
    setShowBanner(false);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        consentGiven,
        // Only show banner/settings after mount to prevent hydration mismatch
        showBanner: mounted ? showBanner : false,
        showSettings: mounted ? showSettings : false,
        updatePreferences,
        acceptAll,
        rejectAll,
        savePreferences,
        openSettings,
        closeSettings,
        closeBanner,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }
  return context;
}
