'use client';

import { createContext, useContext } from 'react';
import translations from '@/messages/cs.json';

type Translations = typeof translations;

const TranslationsContext = createContext<Translations>(translations);

export function TranslationsProvider({ children }: { children: React.ReactNode }) {
  return (
    <TranslationsContext.Provider value={translations}>
      {children}
    </TranslationsContext.Provider>
  );
}

type TranslationFunction = {
  (key: string, options?: { returnObjects?: boolean }): any;
  raw: (key: string) => any;
};

export function useTranslations(namespace?: string): TranslationFunction {
  const t = useContext(TranslationsContext);

  const getValue = (key: string) => {
    let value: any = t;

    // First, navigate through the namespace
    if (namespace) {
      const namespaceParts = namespace.split('.');
      for (const part of namespaceParts) {
        value = value?.[part];
      }
    }

    // Then navigate through the key
    const keyParts = key.split('.');
    for (const part of keyParts) {
      value = value?.[part];
    }

    return value;
  };

  const fn: any = (key: string, options?: { returnObjects?: boolean }) => {
    const value = getValue(key);
    if (options?.returnObjects) {
      return value;
    }
    return value || key;
  };

  fn.raw = (key: string) => getValue(key);

  return fn as TranslationFunction;
}

export function useLocale() {
  return 'cs';
}
