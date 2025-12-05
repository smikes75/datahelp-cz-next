'use client';

/**
 * HDD Case Studies stránka
 * Zobrazuje případové studie úspěšné záchrany dat z HDD
 */

import { useState, useEffect } from 'react';
import { HardDrive, CheckCircle, Clock, Banknote } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';

// PageHeader component
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

// Loading skeleton
function CaseStudySkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="md:flex">
        <div className="md:w-1/3 bg-gray-200 h-64"></div>
        <div className="md:w-2/3 p-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CaseStudy {
  title: string;
  problem: string;
  solution: string;
  result: string;
  duration: string;
  recoveryRate: string;
  price: string;
  image: string;
}

export function HDDCaseStudiesClient() {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  // Get case studies from translations
  const hddCases = t.raw('caseStudies.hdd') as CaseStudy[];

  const labels = {
    title: t('caseStudies.title'),
    subtitle: t('caseStudies.description'),
    problem: t('caseStudies.problem'),
    solution: t('caseStudies.solution'),
    result: t('caseStudies.result'),
    duration: t('caseStudies.duration'),
    recoveryRate: t('caseStudies.recoveryRate'),
    price: t('caseStudies.price'),
    contactUs: t('caseStudies.contactUs')
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={labels.title}
        subtitle={labels.subtitle}
        backgroundImage="hdd-recovery.webp"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-16">
        {isLoading ? (
          <div className="grid gap-8">
            {[...Array(3)].map((_, i) => (
              <CaseStudySkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-8">
            {hddCases.map((study, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 relative h-64 md:h-auto">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h2 className="text-2xl font-bold text-primary mb-4">{study.title}</h2>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-accent" />
                        <span>{labels.duration} {study.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span>{labels.recoveryRate} {study.recoveryRate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Banknote className="h-5 w-5 text-accent" />
                        <span>{labels.price} {study.price}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg text-primary">{labels.problem}</h3>
                        <p className="text-gray-600">{study.problem}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-primary">{labels.solution}</h3>
                        <p className="text-gray-600">{study.solution}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-primary">{labels.result}</h3>
                        <p className="text-gray-600">{study.result}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/kontakt"
            className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            <HardDrive className="h-5 w-5" />
            <span>{labels.contactUs}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
