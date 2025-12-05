'use client';

import { useState } from 'react';
import { useTranslations } from '@/contexts/TranslationsContext';
import { ChevronDown, ChevronUp, HelpCircle, Clock, MapPin, Shield, CheckCircle, FileQuestion, AlertCircle, TrendingUp, Award, PackageCheck } from 'lucide-react';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQPageSchema } from '@/components/schema/FAQPageSchema';

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

// FAQ Item komponenta
interface FAQItemProps {
  icon: React.ReactNode;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ icon, question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <button
        className="faq-button w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="flex-shrink-0">{icon}</div>
          <h3 className="text-lg font-semibold text-primary text-left">{question}</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="h-6 w-6 text-primary flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="h-6 w-6 text-primary flex-shrink-0 ml-4" />
        )}
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

// Hlavní FAQ Client komponenta
export function FAQClient() {
  const t = useTranslations();
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const faqs = [
    {
      icon: <HelpCircle className="h-6 w-6 text-accent" />,
      question: t('faq.questions.q1'),
      answer: t('faq.questions.a1')
    },
    {
      icon: <FileQuestion className="h-6 w-6 text-accent" />,
      question: t('faq.questions.q2'),
      answer: t('faq.questions.a2')
    },
    {
      icon: <Clock className="h-6 w-6 text-accent" />,
      question: t('faq.questions.q3'),
      answer: t('faq.questions.a3')
    },
    {
      icon: <PackageCheck className="h-6 w-6 text-accent" />,
      question: t('faq.questions.q4'),
      answer: t('faq.questions.a4')
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-accent" />,
      question: t('faq.questions.q5'),
      answer: t('faq.questions.a5')
    },
    {
      icon: <MapPin className="h-6 w-6 text-accent" />,
      question: t('faq.questions.q6'),
      answer: t('faq.questions.a6')
    },
    {
      icon: <Shield className="h-6 w-6 text-accent" />,
      question: t('faq.questions.q7'),
      answer: t('faq.questions.a7')
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-accent" />,
      question: t('faq.questions.q8'),
      answer: t('faq.questions.a8')
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-accent" />,
      question: t('faq.questions.q9'),
      answer: t('faq.questions.a9')
    },
    {
      icon: <Award className="h-6 w-6 text-accent" />,
      question: t('faq.questions.q10'),
      answer: t('faq.questions.a10')
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndexes(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FAQPageSchema
        faqs={faqs.map(f => ({
          question: f.question,
          answer: f.answer
        }))}
      />
      <PageHeader
        title={t('faq.title')}
        subtitle={t('faq.subtitle')}
        backgroundImage="faq-bg.webp"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                icon={faq.icon}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndexes.includes(index)}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
