'use client';


import { useState, useEffect } from 'react';
import { ChevronDown, Building2, Wrench, Heart } from 'lucide-react';
import { useTranslations, useLocale } from '@/contexts/TranslationsContext';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';

// Typ pro obrázky z Cloudinary
interface GalleryImage {
  id: string;
  cloudinary_url: string;
  alt_cs: string | null;
  alt_en: string | null;
  width: number | null;
  height: number | null;
}

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

// Timeline sekce komponenta - zigzag design (matching screenshot)
function TimelineSection({ timelineItems }: { timelineItems: TimelineItem[] }) {
  const t = useTranslations();

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-2">
          {t('about.timeline.title')}
        </h2>
        <p className="text-gray-600 text-center mb-8 md:mb-12">
          {t('about.timeline.subtitle')}
        </p>

        {/* Mobile: Horizontal dots + stacked cards below */}
        <div className="md:hidden">
          {/* Horizontal timeline with dots */}
          <div className="relative mb-6">
            {/* Horizontal line */}
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200" />

            {/* Year dots */}
            <div className="flex justify-between relative px-2">
              {timelineItems.map((item) => (
                <div key={item.year} className="flex flex-col items-center">
                  {/* Donut circle */}
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center z-10">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  {/* Year label */}
                  <span className="text-sm font-bold text-accent mt-2">{item.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile cards - stacked below */}
          <div className="space-y-4">
            {timelineItems.map((item) => (
              <div key={item.year} className="bg-[#F8FAFC] rounded-lg p-5 border border-gray-100">
                <div className="text-2xl font-bold text-accent mb-1">{item.year}</div>
                <h3 className="text-base font-bold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Zigzag timeline with vertical line */}
        <div className="hidden md:block max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2" />

            {timelineItems.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`relative flex items-start mb-16 last:mb-0 ${
                    isLeft ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Donut circle on timeline */}
                  <div className="absolute left-1/2 w-6 h-6 bg-accent rounded-full flex items-center justify-center transform -translate-x-1/2 z-10 mt-6">
                    <div className="w-2.5 h-2.5 bg-white rounded-full" />
                  </div>

                  {/* Content card */}
                  <div className={`w-[45%] ${isLeft ? 'pr-8' : 'pl-8'}`}>
                    <div className={`bg-[#F8FAFC] rounded-xl p-6 shadow-sm ${isLeft ? 'text-right' : 'text-left'}`}>
                      <div className="text-2xl font-bold text-accent mb-1">{item.year}</div>
                      <h3 className="text-xl font-bold text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Fallback statické obrázky pro AboutGallery
const ABOUT_GALLERY_FALLBACK = [
  { url: "/images/about-gallery/team.webp", altKey: 'aboutTeam' },
  { url: "/images/about-gallery/workspace.webp", altKey: 'aboutWorkspace' },
  { url: "/images/about-gallery/technology.webp", altKey: 'aboutTechnology' },
  { url: "/images/about-gallery/lab.webp", altKey: 'aboutLab' },
  { url: "/images/about-gallery/expertise.webp", altKey: 'aboutExpertise' }
];

// Galerie komponenta - s Cloudinary podporou
function AboutGallery() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  // Načtení obrázků z API
  useEffect(() => {
    async function loadImages() {
      try {
        const response = await fetch('/api/galleries/images?gallery=o-nas-galerie');

        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const data = await response.json();

        if (data.images && data.images.length > 0) {
          setImages(data.images);
        } else {
          setUseFallback(true);
        }
      } catch (error) {
        console.warn('AboutGallery: Using fallback images', error);
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  // Helper pro alt text podle jazyka
  const getAlt = (image: GalleryImage) => {
    return locale === 'en' ? (image.alt_en || image.alt_cs || '') : (image.alt_cs || '');
  };

  // Zobrazované obrázky (dynamické nebo fallback)
  const displayImages = useFallback
    ? ABOUT_GALLERY_FALLBACK.map(img => ({ url: img.url, alt: t(img.altKey) }))
    : images.map(img => ({ url: img.cloudinary_url, alt: getAlt(img) }));

  // Loading stav
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">{t('aboutTitle')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('aboutDescription')}</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">{t('aboutTitle')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('aboutDescription')}</p>
        </div>

        {/* Desktop slideshow */}
        <div className="hidden md:block relative max-w-3xl mx-auto">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl">
            {displayImages.map((image, index) => (
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
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-1.5 mt-4">
            {displayImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-6 bg-primary'
                    : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to image ${index + 1}`}
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
            {displayImages.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-[85vw] snap-center">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
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
            {displayImages.map((_, index) => (
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

// Fallback statické obrázky pro TeamMembers
const TEAM_FALLBACK_IMAGES = [
  '/images/team/member-1.webp',
  '/images/team/member-2.webp',
  '/images/team/member-3.webp'
];

// TeamMembers sekce s Cloudinary podporou
function TeamMembersSection({ teamMembers }: { teamMembers: TeamMember[] }) {
  const t = useTranslations();
  const [teamImages, setTeamImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  // Načtení obrázků týmu z API
  useEffect(() => {
    async function loadTeamImages() {
      try {
        const response = await fetch('/api/galleries/images?gallery=tym');

        if (!response.ok) {
          throw new Error('Failed to fetch team images');
        }

        const data = await response.json();

        if (data.images && data.images.length > 0) {
          setTeamImages(data.images);
        } else {
          setUseFallback(true);
        }
      } catch (error) {
        console.warn('TeamMembers: Using fallback images', error);
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    }

    loadTeamImages();
  }, []);

  // Helper pro získání URL obrázku pro člena týmu
  const getTeamMemberImage = (index: number): string => {
    if (useFallback || loading) {
      return TEAM_FALLBACK_IMAGES[index] || TEAM_FALLBACK_IMAGES[0];
    }
    // Pokud máme obrázky z Cloudinary, použij je podle indexu
    if (teamImages[index]) {
      return teamImages[index].cloudinary_url;
    }
    // Fallback pokud není dostatek obrázků
    return TEAM_FALLBACK_IMAGES[index] || TEAM_FALLBACK_IMAGES[0];
  };

  return (
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
                  src={getTeamMemberImage(index)}
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
                      src={getTeamMemberImage(index)}
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

      {/* Sekce týmu s Cloudinary podporou */}
      <TeamMembersSection teamMembers={teamMembers} />

      {/* Accordion sekce s detaily o firmě - pod galerií odborníků */}
      <AccordionSection />
    </div>
  );
}
