'use client';

import { Star, ArrowRight, Quote } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface FeaturedStory {
  title: string;
  slug: string;
  image: string;
}

export function ReferenceClient() {
  const t = useTranslations('reference');

  const featuredStories: FeaturedStory[] = [
    {
      title: t('featuredStories.ondrejPycha.title'),
      slug: t('featuredStories.ondrejPycha.slug'),
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
    },
    {
      title: t('featuredStories.checkCzechFashion.title'),
      slug: t('featuredStories.checkCzechFashion.slug'),
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    },
    {
      title: t('featuredStories.michalPavlicek.title'),
      slug: t('featuredStories.michalPavlicek.slug'),
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              {t('subtitle')}
            </p>
            <p className="text-lg text-gray-500">
              {t('intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h2 className="text-3xl font-bold text-primary mb-2">
                {t('googleReviews.title')}
              </h2>
              <p className="text-gray-600">
                {t('googleReviews.subtitle')}
              </p>
            </div>

            {/* Google Reviews Placeholder */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Quote className="h-12 w-12 text-accent mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Google recenze se zobrazují dynamicky z profilu firmy
              </p>
              <a
                href="https://www.google.com/search?q=DataHelp+s.r.o.+recenze"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-dark transition-colors"
              >
                Zobrazit všechny recenze na Google
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Success Stories */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">
                {t('featuredStories.title')}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredStories.map((story, index) => (
                <Link
                  key={index}
                  href={`/clanky/${story.slug}`}
                  className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-primary mb-4 line-clamp-3">
                      {story.title}
                    </h3>
                    <div className="flex items-center gap-2 text-accent group-hover:gap-3 transition-all">
                      <span className="font-medium">{t('featuredStories.readMore')}</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-xl mb-8 text-white/90">
                {t('cta.description')}
              </p>
              <Link
                href="/poptavka-zachrany-dat"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                {t('cta.button')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
