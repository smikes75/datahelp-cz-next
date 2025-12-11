// Timeline Component - Responsive with compact mobile version
// Usage: Import and use with your translation function and timeline data

'use client';

import { useTranslations } from 'next-intl';

interface TimelineProps {
  years: string[]; // e.g., ['1998', '2005', '2015', '2024']
  translationNamespace?: string; // e.g., 'about' - translations should be at `${namespace}.timeline.${year}.title` and `.description`
}

export function Timeline({ years, translationNamespace = 'about' }: TimelineProps) {
  const t = useTranslations(translationNamespace);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">
          {t('timeline.title')}
        </h2>
        <p className="text-gray-600 text-center mb-8 md:mb-12">
          {t('timeline.subtitle')}
        </p>

        {/* Mobile: Compact horizontal timeline */}
        <div className="md:hidden">
          <div className="relative">
            {/* Horizontal line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />

            {/* Timeline items - year dots */}
            <div className="flex justify-between relative">
              {years.map((year) => (
                <div key={year} className="flex flex-col items-center flex-1">
                  {/* Year dot */}
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center z-10 mb-3">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  {/* Year label */}
                  <span className="text-sm font-bold text-accent">{year}</span>
                </div>
              ))}
            </div>

            {/* Mobile cards - stacked */}
            <div className="mt-6 space-y-3">
              {years.map((year) => (
                <div key={year} className="bg-gray-50 rounded-lg p-4 flex gap-4 items-start">
                  <div className="text-2xl font-bold text-accent shrink-0 w-14">{year}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-primary mb-1">
                      {t(`timeline.${year}.title`)}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {t(`timeline.${year}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Zigzag timeline */}
        <div className="hidden md:block max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2" />

            {years.map((year, index) => (
              <div
                key={year}
                className={`relative flex items-center mb-8 last:mb-0 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Year circle */}
                <div className="absolute left-1/2 w-8 h-8 bg-accent rounded-full flex items-center justify-center transform -translate-x-1/2 z-10">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>

                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="text-2xl font-bold text-accent mb-2">{year}</div>
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {t(`timeline.${year}.title`)}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t(`timeline.${year}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// STANDALONE VERSION (without next-intl, pass data directly)
// =============================================================================

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineStandaloneProps {
  title: string;
  subtitle: string;
  items: TimelineItem[];
}

export function TimelineStandalone({ title, subtitle, items }: TimelineStandaloneProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">
          {title}
        </h2>
        <p className="text-gray-600 text-center mb-8 md:mb-12">
          {subtitle}
        </p>

        {/* Mobile: Compact horizontal timeline */}
        <div className="md:hidden">
          <div className="relative">
            {/* Horizontal line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />

            {/* Timeline items - year dots */}
            <div className="flex justify-between relative">
              {items.map((item) => (
                <div key={item.year} className="flex flex-col items-center flex-1">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center z-10 mb-3">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  <span className="text-sm font-bold text-accent">{item.year}</span>
                </div>
              ))}
            </div>

            {/* Mobile cards - stacked */}
            <div className="mt-6 space-y-3">
              {items.map((item) => (
                <div key={item.year} className="bg-gray-50 rounded-lg p-4 flex gap-4 items-start">
                  <div className="text-2xl font-bold text-accent shrink-0 w-14">{item.year}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-primary mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Zigzag timeline */}
        <div className="hidden md:block max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2" />

            {items.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex items-center mb-8 last:mb-0 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="absolute left-1/2 w-8 h-8 bg-accent rounded-full flex items-center justify-center transform -translate-x-1/2 z-10">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>

                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="text-2xl font-bold text-accent mb-2">{item.year}</div>
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// EXAMPLE USAGE
// =============================================================================

/*
// With next-intl:
const timeline = ['1998', '2005', '2015', '2024'];
<Timeline years={timeline} translationNamespace="about" />

// Standalone (no i18n):
const timelineData = [
  { year: '1998', title: 'Company Founded', description: 'Started our journey...' },
  { year: '2005', title: 'Major Milestone', description: 'Achieved...' },
  { year: '2015', title: 'Expansion', description: 'Expanded to...' },
  { year: '2024', title: 'Today', description: 'Now serving...' },
];
<TimelineStandalone
  title="Our History"
  subtitle="Key milestones in our journey"
  items={timelineData}
/>

// Required Tailwind colors (add to tailwind.config):
// primary: '#1B387A' (or your brand color)
// accent: '#F49E00' (or your accent color)
*/
