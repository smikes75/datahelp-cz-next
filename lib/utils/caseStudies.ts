import { caseStudiesCS, caseStudiesEN, type CaseStudy } from '@/lib/data/caseStudies';

/**
 * Vrací případové studie pro daný typ zařízení a lokalizaci
 * @param type - Typ zařízení (hdd/ssd/raid)
 * @param locale - Lokalizace (cs/en)
 */
export const getCaseStudies = (
  type: 'hdd' | 'ssd' | 'raid',
  locale: string
): CaseStudy[] => {
  const data = locale === 'en' ? caseStudiesEN : caseStudiesCS;
  return data[type] || [];
};
