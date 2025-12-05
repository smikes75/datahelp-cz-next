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
    const keys = key.split('.');
    let value: any = namespace ? (t as any)[namespace] : t;
    for (const k of keys) {
      value = value?.[k];
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
