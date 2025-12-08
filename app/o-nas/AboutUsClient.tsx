'use client';


import { useState } from 'react';
import { Calendar, ChevronDown, Building2, Wrench, Heart } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';

// Typy pro timeline položky
interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

// Typ pro členy týmu
interface TeamMember {
  name: string;
  role: string;
  specialization: string;
  description: string;
}

// Timeline sekce komponenta
function TimelineSection({ timelineItems }: { timelineItems: TimelineItem[] }) {
  const t = useTranslations();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="py-6 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-0 md:mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">
            {t('about.timeline.title')}
          </h2>
          <p className="text-gray-600">{t('about.timeline.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 max-w-6xl mx-auto">
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-50 rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="text-2xl font-bold text-accent">{item.year}</span>
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
              <div className={`transition-all duration-300 ${
                activeStep === index ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0'
              } overflow-hidden`}>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Galerie komponenta - zjednodušená verze
function AboutGallery() {
  const t = useTranslations('gallery');
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { url: "/images/about-gallery/team.webp", alt: t('aboutTeam') },
    { url: "/images/about-gallery/workspace.webp", alt: t('aboutWorkspace') },
    { url: "/images/about-gallery/technology.webp", alt: t('aboutTechnology') },
    { url: "/images/about-gallery/lab.webp", alt: t('aboutLab') },
    { url: "/images/about-gallery/expertise.webp", alt: t('aboutExpertise') }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">{t('aboutTitle')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('aboutDescription')}</p>
        </div>

        {/* Desktop slideshow */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-2xl">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-1.5 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-6 bg-primary'
                    : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Přejít na obrázek ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile swipe carousel */}
        <div className="md:hidden overflow-hidden">
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-[85vw] snap-center">
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="85vw"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-1.5 mt-4">
            {images.map((_, index) => (
              <div
                key={index}
                className="h-1.5 w-1.5 rounded-full bg-gray-300"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Accordion Item komponenta
interface AccordionItemData {
  key: string;
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string;
  linkText?: string;
}

function AccordionSection() {
  const t = useTranslations();
  const [openItem, setOpenItem] = useState<string | null>(null);

  const items: AccordionItemData[] = [
    {
      key: 'company',
      icon: <Building2 className="h-5 w-5" />,
      title: t('about.accordion.company.title'),
      content: t('about.accordion.company.content'),
    },
    {
      key: 'technology',
      icon: <Wrench className="h-5 w-5" />,
      title: t('about.accordion.technology.title'),
      content: t('about.accordion.technology.content'),
      link: '/technologie',
      linkText: t('about.accordion.technology.link'),
    },
    {
      key: 'values',
      icon: <Heart className="h-5 w-5" />,
      title: t('about.accordion.values.title'),
      content: t('about.accordion.values.content'),
    },
  ];

  const toggleItem = (key: string) => {
    setOpenItem(openItem === key ? null : key);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            {t('about.accordion.title')}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {items.map((item) => (
            <div
              key={item.key}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleItem(item.key)}
                className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-accent">{item.icon}</span>
                  <span className="text-lg font-semibold text-primary">{item.title}</span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                    openItem === item.key ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openItem === item.key ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 bg-white">
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                    {item.content}
                  </p>
                  {item.link && item.linkText && (
                    <div className="mt-6">
                      <Link
                        href={item.link}
                        className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-light transition"
                      >
                        <Wrench className="h-5 w-5" />
                        <span>{item.linkText}</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// PageHeader komponenta
function PageHeader({ title, subtitle, backgroundImage }: { title: string; subtitle?: string; backgroundImage: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-0">
        <Image
          src={`/images/backgrounds/${backgroundImage}`}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(27, 56, 122, 1) 50%, rgba(27, 56, 122, 0) 100%)'
          }}
        />
      </div>

      <div className="relative z-10 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && <p className="text-lg md:text-xl">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

// Hlavní stránka O nás
export function AboutUsClient() {
  const t = useTranslations();
  const timelineItems = t.raw('about.timeline.items') as TimelineItem[];
  const teamMembers = t.raw('about.teamSection.members') as TeamMember[];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        backgroundImage="about-bg.webp"
      />
      <Breadcrumbs />

      <TimelineSection timelineItems={timelineItems} />

      <div className="bg-white">
        <AboutGallery />
      </div>

      {/* Sekce týmu */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {t('about.teamSection.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('about.teamSection.subtitle')}
            </p>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group">
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                  <Image
                    src={`/images/team/member-${index + 1}.webp`}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">{member.name}</h3>
                  <p className="text-sm font-semibold text-gray-700 mb-2">{member.specialization}</p>
                  <p className="text-sm text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden overflow-hidden">
            <div
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {teamMembers.map((member, index) => (
                <div key={index} className="flex-shrink-0 w-[80vw] snap-center">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                      <Image
                        src={`/images/team/member-${index + 1}.webp`}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="80vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-primary mb-3">{member.name}</h3>
                      <p className="text-sm font-semibold text-gray-700 mb-2">{member.specialization}</p>
                      <p className="text-sm text-gray-600">{member.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-1.5 mt-4">
              {teamMembers.map((_, index) => (
                <div
                  key={index}
                  className="h-1.5 w-1.5 rounded-full bg-gray-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Accordion sekce s detaily o firmě - pod galerií odborníků */}
      <AccordionSection />
    </div>
  );
}
