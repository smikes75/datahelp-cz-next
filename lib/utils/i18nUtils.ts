/**
 * i18n utility funkce pro práci s lokalizací
 * Next.js s next-intl řeší většinu automaticky, toto jsou jen pomocné funkce
 */

// Podporované jazyky
export const SUPPORTED_LANGUAGES = ['cs', 'en'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

/**
 * Kontroluje, zda je jazyk podporovaný
 */
export const isSupportedLanguage = (lang: string): lang is SupportedLanguage => {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
};

/**
 * Vrací výchozí jazyk
 */
export const getDefaultLanguage = (): SupportedLanguage => {
  return 'cs';
};
