'use client';

/**
 * Kontakt stránka
 * Podle originálu: desktop/mobile layout, "Bezplatný svoz" panel, fakturační údaje
 */

import { useState } from 'react';
import { Mail, Phone, MapPin, ChevronDown, ChevronUp, Truck, MessageSquare } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import { useToast } from '@/contexts/ToastContext';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { createClient } from '@/lib/supabase/client';
import { validateEmail, validatePhone, sanitizeInput } from '@/lib/utils/security';

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

const RATE_LIMIT_SECONDS = 60;

// Contact Form komponenta
function ContactForm() {
  const t = useTranslations();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_SECONDS * 1000) {
      toast.error(
        t('contact.form.rateLimit').replace('{seconds}', RATE_LIMIT_SECONDS.toString())
      );
      return;
    }

    // Validate at least one contact method
    const hasEmail = formData.email && formData.email.trim().length > 0;
    const hasPhone = formData.phone && formData.phone.trim().length > 0;

    if (!hasEmail && !hasPhone) {
      toast.error(t('contact.form.errors.emailOrPhone'));
      return;
    }

    // Validate email format if provided
    if (hasEmail && !validateEmail(formData.email)) {
      toast.error(t('contact.form.errors.emailFormat'));
      return;
    }

    // Validate phone format if provided
    if (hasPhone && !validatePhone(formData.phone)) {
      toast.error(t('contact.form.errors.phone'));
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        message: sanitizeInput(formData.message),
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
      };

      const { error } = await supabase
        .from('contact_forms')
        .insert([sanitizedData]);

      if (error) throw error;

      setLastSubmitTime(now);
      toast.success(t('contact.form.success'));
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('contact.form.name')} *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Jan Novák"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('contact.form.email')} *
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="vas@email.cz"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('contact.form.phone')}
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="+420 xxx xxx xxx"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('contact.form.message')} *
        </label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Popište váš problém..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
      </button>
    </form>
  );
}

// Contact Info Section komponenta
function ContactInfoSection() {
  const [showBilling, setShowBilling] = useState(false);

  return (
    <>
      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Kontaktní informace</h2>

        {/* Address */}
        <div className="flex items-start space-x-3 mb-4">
          <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-gray-800">Adresa provozovny</p>
            <p className="text-gray-600">Jirsíkova 541/1</p>
            <p className="text-gray-600">186 00 Praha 8 - Karlín</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start space-x-3 mb-4">
          <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-gray-800">Telefon</p>
            <a href="tel:+420775220440" className="text-gray-600 hover:text-primary transition-colors">
              +420 775 220 440
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-3 mb-6">
          <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-gray-800">E-mail</p>
            <a href="mailto:info@datahelp.cz" className="text-gray-600 hover:text-primary transition-colors">
              info@datahelp.cz
            </a>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="font-semibold text-gray-800 mb-2">Otevírací doba</p>
          <div className="text-gray-600 text-sm space-y-1">
            <p>Po - Čt: 9:00 - 17:00</p>
            <p>Pá: 8:00 - 15:30</p>
            <p className="mt-2 font-semibold text-primary">Express, po dohodě NONSTOP</p>
          </div>
        </div>

        {/* Billing Information Accordion */}
        <div className="border-t pt-4">
          <button
            onClick={() => setShowBilling(!showBilling)}
            className="flex items-center justify-between w-full text-left group"
          >
            <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
              Fakturační údaje
            </span>
            {showBilling ? (
              <ChevronUp className="h-5 w-5 text-accent" />
            ) : (
              <ChevronDown className="h-5 w-5 text-accent" />
            )}
          </button>

          {showBilling && (
            <div className="mt-4 space-y-2 text-gray-600 animate-in slide-in-from-top-2 duration-300">
              <p><strong>Název společnosti:</strong> DataHelp s.r.o.</p>
              <p><strong>IČO:</strong> 27 38 77 12</p>
              <p><strong>DIČ:</strong> CZ27387712</p>
              <p><strong>Sídlo:</strong> U třetí baterie 1056/5, 162 00 Praha 6</p>
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Kde nás najdete</h2>
        <div className="w-full h-[400px] rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.4899373947447!2d14.447864776769673!3d50.09404217152393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94a7f4f7e9bb%3A0x8c8a8d8e8f8e8f8f!2sJirs%C3%ADkova%20541%2F1%2C%20186%2000%20Karl%C3%ADn!5e0!3m2!1scs!2scz!4v1234567890123!5m2!1scs!2scz"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa - DataHelp.cz"
          />
        </div>
      </div>
    </>
  );
}

// Free Pickup Panel komponenta
function FreePickupPanel() {
  return (
    <div className="bg-gradient-to-br from-primary to-primary/90 rounded-lg shadow-lg p-8 text-white">
      <div className="flex items-start space-x-4 mb-4">
        <Truck className="h-8 w-8 flex-shrink-0 mt-1" />
        <div>
          <h2 className="text-2xl font-bold mb-2">Bezplatný svoz a diagnostika</h2>
          <p className="text-white/90 mb-4">
            Vyzvedneme vaše poškozené médium zdarma a provedeme bezplatnou diagnostiku.
            Po diagnostice vás budeme informovat o možnostech obnovy dat a ceně.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          href="/poptavka-zachrany-dat"
          className="inline-block bg-white text-accent px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md"
        >
          Objednat diagnostiku
        </Link>
      </div>
    </div>
  );
}

// Hlavní stránka kontaktu
export default function ContactPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        backgroundImage="contact-bg.webp"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-16">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {/* Left Column - Free Pickup + Contact Form */}
          <div className="space-y-6">
            <FreePickupPanel />

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-bold text-primary">{t('contact.form.title')}</h2>
              </div>
              <ContactForm />
            </div>
          </div>

          {/* Right Column - Contact Info & Map */}
          <div className="space-y-6">
            <ContactInfoSection />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {/* 1. Contact Info & Map */}
          <ContactInfoSection />

          {/* 2. Free Pickup Panel */}
          <FreePickupPanel />

          {/* 3. Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <MessageSquare className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-bold text-primary">{t('contact.form.title')}</h2>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
