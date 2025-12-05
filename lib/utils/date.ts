/**
 * Formátuje datum do lokalizovaného řetězce
 * @param dateString - ISO datum string
 * @param locale - Lokalizace (cs/en)
 */
export const formatDate = (dateString: string, locale = 'cs'): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
