'use client';

import { useTranslations } from '@/contexts/TranslationsContext';
import { Cookie, Shield, TrendingUp, Target, User } from 'lucide-react';
import Image from 'next/image';

// PageHeader komponenta
function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="relative bg-primary">
      <div className="relative z-10 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

// Cookies stránka - statický obsah
export default function CookiesPage() {
  const t = useTranslations();

  const sectionIcons: { [key: string]: React.ReactNode } = {
    functional: <Shield className="h-8 w-8 text-accent" />,
    analytical: <TrendingUp className="h-8 w-8 text-accent" />,
    marketing: <Target className="h-8 w-8 text-accent" />,
    personalization: <User className="h-8 w-8 text-accent" />
  };

  const sections = ['functional', 'analytical', 'marketing', 'personalization'];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('cookies.title')}
        subtitle={t('cookies.subtitle')}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">

          {/* Úvodní sekce */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start space-x-4">
              <Cookie className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('cookies.intro.paragraph1')}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {t('cookies.intro.paragraph2')}
                </p>
              </div>
            </div>
          </div>

          {/* Sekce cookies s tabulkami */}
          {sections.map((section) => {
            const sectionData = t.raw(`cookies.sections.${section}`) as {
              title?: string;
              description?: string;
              cookies?: Array<{
                name: string;
                source: string;
                service?: string;
                description: string
              }>
            };
            const cookies = sectionData?.cookies || [];

            return (
              <div key={section} className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="flex-shrink-0 mt-1">
                    {sectionIcons[section]}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-primary mb-4">
                      {sectionData?.title}
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {sectionData?.description}
                    </p>

                    {/* Tabulka cookies */}
                    {cookies.length > 0 && (
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200">
                          <thead className="bg-primary/5">
                            <tr>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-primary border-b border-gray-200">
                                Název
                              </th>
                              <th className="px-4 py-3 text-left text-sm font-semibold text-primary border-b border-gray-200">
                                Zdroj
                              </th>
                              {section === 'marketing' && (
                                <th className="px-4 py-3 text-left text-sm font-semibold text-primary border-b border-gray-200">
                                  Služba
                                </th>
                              )}
                              <th className="px-4 py-3 text-left text-sm font-semibold text-primary border-b border-gray-200">
                                Popis
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {cookies.map((cookie, index: number) => (
                              <tr key={index} className="border-b border-gray-200 last:border-b-0">
                                <td className="px-4 py-3 text-sm text-gray-900 font-mono">
                                  {cookie.name}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {cookie.source}
                                </td>
                                {section === 'marketing' && (
                                  <td className="px-4 py-3 text-sm text-gray-700">
                                    {cookie.service || '-'}
                                  </td>
                                )}
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {cookie.description}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
