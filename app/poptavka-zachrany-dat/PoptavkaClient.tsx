'use client';

import { useState } from 'react';
import { useTranslations } from '@/contexts/TranslationsContext';
import { useToast } from '@/contexts/ToastContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Truck, Package, Phone, Box, MapPin, Check, ExternalLink } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

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

// Personal Visit Appointment Form Component
function PersonalVisitForm() {
  const t = useTranslations('orderDiagnostics.delivery.personal.appointmentForm');
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    phone: '',
    message: '',
    website: '' // Honeypot field
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppointmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, silently reject (bot detected)
    if (appointmentData.website) {
      console.warn('Honeypot triggered - spam submission blocked');
      toast.success(t('success')); // Fake success to not alert bot
      return;
    }

    if (!appointmentData.name || !appointmentData.phone) {
      toast.error('Vyplňte prosím jméno a telefon.');
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('contact_forms')
        .insert([
          {
            name: appointmentData.name,
            phone: appointmentData.phone,
            email: null,
            message: `[Osobní návštěva - domluvení termínu] ${appointmentData.message || 'Zákazník chce domluvit termín osobní návštěvy.'}`,
            user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
          }
        ]);

      if (error) throw error;

      toast.success(t('success'));

      setAppointmentData({
        name: '',
        phone: '',
        message: '',
        website: ''
      });
    } catch (error) {
      console.error('Error submitting appointment request:', error);
      toast.error(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h4 className="text-xl font-semibold text-primary mb-2">{t('title')}</h4>
      <p className="text-gray-600 mb-6">{t('subtitle')}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field - hidden from users, visible to bots */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="appointment-website">Website</label>
          <input
            type="text"
            id="appointment-website"
            name="website"
            value={appointmentData.website}
            onChange={handleInputChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="appointment-name" className="block text-sm font-medium text-gray-700 mb-2">
            {t('name')} *
          </label>
          <input
            type="text"
            id="appointment-name"
            name="name"
            value={appointmentData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="appointment-phone" className="block text-sm font-medium text-gray-700 mb-2">
            {t('phone')} *
          </label>
          <input
            type="tel"
            id="appointment-phone"
            name="phone"
            value={appointmentData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="appointment-message" className="block text-sm font-medium text-gray-700 mb-2">
            {t('message')}
          </label>
          <textarea
            id="appointment-message"
            name="message"
            value={appointmentData.message}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Například: Preferuji středu odpoledne"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-primary border-2 border-primary py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('submitting') : t('submit')}
        </button>
      </form>
    </div>
  );
}

// Main Page Component
export default function OrderDiagnosticsPage() {
  const t = useTranslations('orderDiagnostics');
  const toast = useToast();
  const [termsLinkClicked, setTermsLinkClicked] = useState(false);
  const [formData, setFormData] = useState({
    customerType: 'individual' as 'individual' | 'company',
    companyName: '',
    contactPerson: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    description: '',
    deliveryMethod: '' as '' | 'personal' | 'shipping' | 'courier' | 'ppl',
    deviceType: '' as '' | 'hdd' | 'ssd' | 'flash' | 'raid' | 'other',
    pickupAddress: '',
    pickupCity: '',
    pickupZip: '',
    website: '' // Honeypot field - should remain empty
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleTermsLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (termsLinkClicked) {
      // Druhé kliknutí - otevřít odkaz
      window.open('/obchodni-podminky', '_blank');
      setTermsLinkClicked(false);
    } else {
      // První kliknutí - jen označit a pulzovat
      setTermsLinkClicked(true);
      // Reset po 3 sekundách
      setTimeout(() => setTermsLinkClicked(false), 3000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDeliveryChange = (method: '' | 'personal' | 'shipping' | 'courier' | 'ppl') => {
    setFormData(prev => ({
      ...prev,
      deliveryMethod: method
    }));

    if (method) {
      setTimeout(() => {
        const element = document.getElementById(`delivery-${method}`);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - 120;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check - if filled, silently reject (bot detected)
    if (formData.website) {
      console.warn('Honeypot triggered - spam submission blocked');
      toast.success(t('form.success')); // Fake success to not alert bot
      return;
    }

    if (!formData.deliveryMethod) {
      toast.error(t('form.errors.deliveryMethod'));
      return;
    }

    if (!agreedToTerms) {
      toast.error(t('form.errors.terms'));
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('diagnostic_orders')
        .insert([
          {
            customer_type: formData.customerType,
            company_name: formData.customerType === 'company' ? formData.companyName : null,
            contact_person: formData.customerType === 'company' ? formData.contactPerson : null,
            first_name: formData.customerType === 'individual' ? formData.firstName : null,
            last_name: formData.customerType === 'individual' ? formData.lastName : null,
            phone: formData.phone,
            email: formData.email,
            description: formData.description,
            is_partner: false,
            delivery_method: formData.deliveryMethod,
            device_type: formData.deliveryMethod === 'ppl' ? formData.deviceType : null,
            pickup_address: formData.deliveryMethod === 'shipping' ? formData.pickupAddress : null,
            pickup_city: formData.deliveryMethod === 'shipping' ? formData.pickupCity : null,
            pickup_zip: formData.deliveryMethod === 'shipping' ? formData.pickupZip : null,
            language: 'cs'
          }
        ]);

      if (error) throw error;

      toast.success(t('form.success'));

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setFormData({
        customerType: 'individual',
        companyName: '',
        contactPerson: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        description: '',
        deliveryMethod: '',
        deviceType: '',
        pickupAddress: '',
        pickupCity: '',
        pickupZip: '',
        website: ''
      });
      setAgreedToTerms(false);
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error(t('form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCustomerTypeSelector = () => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {t('form.customerType')}
      </label>
      <div className="flex gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="customerType"
            value="individual"
            checked={formData.customerType === 'individual'}
            onChange={handleInputChange}
            className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
          />
          <span className="ml-2 text-gray-700">
            {t('form.individual')}
          </span>
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="customerType"
            value="company"
            checked={formData.customerType === 'company'}
            onChange={handleInputChange}
            className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
          />
          <span className="ml-2 text-gray-700">
            {t('form.company')}
          </span>
        </label>
      </div>
    </div>
  );

  const renderNameFields = () => {
    return (
      <>
        {formData.customerType === 'company' && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                {t('form.companyName')}
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
                {t('form.contactPerson')}
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}

        {formData.customerType === 'individual' && (
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                {t('form.firstName')}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                {t('form.lastName')}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}
      </>
    );
  };

  const renderContactForm = () => (
    <div className="space-y-6">
      {/* Honeypot field - hidden from users, visible to bots */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.phone')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {t('form.email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          {t('form.description')}
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder={t('form.descriptionPlaceholder')}
          required
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none placeholder:text-gray-400"
        />
      </div>

      <div>
        <Link
          href="/ochrana-osobnich-udaju"
          className="text-accent hover:text-accent/80 text-sm"
        >
          {t('form.privacyLink')}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={t('title')}
        subtitle={t('subtitle')}
        backgroundImage="services-bg.webp"
      />

      <Breadcrumbs />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">
              {t('sections.delivery')}
            </h2>

            <div className="space-y-4 mt-4">
              {/* PPL Parcelbox Option - First */}
              <div id="delivery-ppl" className={`border-2 rounded-lg transition-all relative ${
                formData.deliveryMethod === 'ppl'
                  ? 'border-primary bg-gray-50'
                  : 'border-gray-200'
              }`}>
                {/* Novinka badge */}
                <div className="absolute -top-3 left-4 bg-[#c00f0f] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {t('delivery.ppl.badge')}
                </div>

                <button
                  type="button"
                  onClick={() => handleDeliveryChange(formData.deliveryMethod === 'ppl' ? '' : 'ppl')}
                  className="w-full flex items-start p-6 text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Image
                        src="/images/ppl-logo.svg"
                        alt="PPL"
                        width={48}
                        height={24}
                        className="h-6 w-auto"
                      />
                      <h3 className="text-lg font-semibold text-primary">
                        {t('delivery.ppl.title')}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                        {t('delivery.ppl.subtitle')}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {t('delivery.ppl.description')}
                    </p>
                  </div>
                </button>

                {formData.deliveryMethod === 'ppl' && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-6">
                      {/* How it works - 3 steps */}
                      <div className="mb-8">
                        <h4 className="font-semibold text-primary mb-2 flex items-center">
                          <Box className="h-5 w-5 mr-2 text-accent" />
                          {t('delivery.ppl.howItWorks.title')}
                        </h4>
                        <p className="font-semibold text-gray-800 mb-4">
                          {t('delivery.ppl.howItWorks.warning')}
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                          {[1, 2, 3].map((step) => (
                            <div key={step} className="text-center">
                              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                                {step}
                              </div>
                              <h5 className="font-medium text-sm text-gray-900 mb-1">
                                {t(`delivery.ppl.howItWorks.steps.step${step}.title`)}
                              </h5>
                              <p className="text-xs text-gray-600">
                                {t(`delivery.ppl.howItWorks.steps.step${step}.description`)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h4 className="font-semibold text-primary mb-3">
                          {t('delivery.ppl.benefits.title')}
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t('delivery.ppl.benefits.noPrinter')}</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t('delivery.ppl.benefits.available247')}</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t('delivery.ppl.benefits.free')}</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t('delivery.ppl.benefits.tracking')}</span>
                          </li>
                          <li className="flex items-start text-sm">
                            <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{t('delivery.ppl.benefits.insurance')}</span>
                          </li>
                        </ul>
                      </div>

                      {/* Find Parcelbox link */}
                      <div className="mb-6">
                        <a
                          href="https://www.ppl.cz/mapa-vydejnich-mist"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-accent hover:text-accent/80 font-medium"
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          {t('delivery.ppl.findParcelbox')}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {renderCustomerTypeSelector()}
                        {renderNameFields()}

                        {/* Device Type Selector for PPL */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            {t('delivery.ppl.form.deviceType')}
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                            {(['hdd', 'ssd', 'flash', 'raid', 'other'] as const).map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, deviceType: type }))}
                                className={`px-3 py-2 text-sm rounded-lg border-2 transition-all ${
                                  formData.deviceType === type
                                    ? 'border-primary bg-blue-50 text-primary'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                {t(`delivery.ppl.form.deviceTypes.${type}`)}
                              </button>
                            ))}
                          </div>
                        </div>

                        {renderContactForm()}

                        {/* Terms and Submit */}
                        <div className="border-t border-gray-200 pt-6">
                          <label className="flex items-start mb-6 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={agreedToTerms}
                              onChange={(e) => setAgreedToTerms(e.target.checked)}
                              className="w-6 h-6 text-primary focus:ring-primary border-gray-300 rounded mt-0.5 flex-shrink-0 cursor-pointer"
                              required
                            />
                            <span className="ml-3 text-gray-700 text-base">
                              {t('form.terms.text')}{' '}
                              <a
                                href="/obchodni-podminky"
                                onClick={handleTermsLinkClick}
                                className={`text-accent hover:text-accent/80 font-semibold underline ${termsLinkClicked ? 'animate-pulse' : ''}`}
                              >
                                {t('form.terms.link')}
                              </a>
                            </span>
                          </label>

                          <button
                            type="submit"
                            disabled={isSubmitting || !agreedToTerms}
                            className="w-full bg-primary text-white py-4 px-8 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? t('form.submitting') : t('form.submit')}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping Option */}
              <div id="delivery-shipping" className={`border-2 rounded-lg transition-all ${
                formData.deliveryMethod === 'shipping'
                  ? 'border-primary bg-gray-50'
                  : 'border-gray-200'
              }`}>
                <button
                  type="button"
                  onClick={() => handleDeliveryChange(formData.deliveryMethod === 'shipping' ? '' : 'shipping')}
                  className="w-full flex items-start p-6 text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Image
                        src="/images/dpd-logo.svg"
                        alt="DPD"
                        width={48}
                        height={24}
                        className="h-6 w-auto"
                      />
                      <h3 className="text-lg font-semibold text-primary">
                        {t('delivery.shipping.title')}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                        Zdarma
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {t('delivery.shipping.description')}
                    </p>
                  </div>
                </button>

                {formData.deliveryMethod === 'shipping' && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-6">
                      {/* Warning */}
                      <p className="font-semibold text-gray-800 mb-6">
                        {t('delivery.shipping.warning')}
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {renderCustomerTypeSelector()}
                        {renderNameFields()}

                        {/* Pickup Address Fields */}
                        <h4 className="font-semibold text-primary mb-4">
                          {t('form.pickupAddress')}
                        </h4>
                        <div className="space-y-4 mb-6">
                          <div>
                            <label htmlFor="pickupAddress" className="block text-sm font-medium text-gray-700 mb-2">
                              {t('form.street')}
                            </label>
                            <input
                              type="text"
                              id="pickupAddress"
                              name="pickupAddress"
                              value={formData.pickupAddress}
                              onChange={handleInputChange}
                              required
                              placeholder="Např. Vinohradská 123"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="pickupCity" className="block text-sm font-medium text-gray-700 mb-2">
                                {t('form.city')}
                              </label>
                              <input
                                type="text"
                                id="pickupCity"
                                name="pickupCity"
                                value={formData.pickupCity}
                                onChange={handleInputChange}
                                required
                                placeholder="Např. Praha"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label htmlFor="pickupZip" className="block text-sm font-medium text-gray-700 mb-2">
                                {t('form.zip')}
                              </label>
                              <input
                                type="text"
                                id="pickupZip"
                                name="pickupZip"
                                value={formData.pickupZip}
                                onChange={handleInputChange}
                                required
                                placeholder="Např. 120 00"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>

                        {renderContactForm()}

                        {/* Terms and Submit inside card */}
                        <div className="border-t border-gray-200 pt-6">
                          <label className="flex items-start mb-6 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={agreedToTerms}
                              onChange={(e) => setAgreedToTerms(e.target.checked)}
                              className="w-6 h-6 text-primary focus:ring-primary border-gray-300 rounded mt-0.5 flex-shrink-0 cursor-pointer"
                              required
                            />
                            <span className="ml-3 text-gray-700 text-base">
                              {t('form.terms.text')}{' '}
                              <a
                                href="/obchodni-podminky"
                                onClick={handleTermsLinkClick}
                                className={`text-accent hover:text-accent/80 font-semibold underline ${termsLinkClicked ? 'animate-pulse' : ''}`}
                              >
                                {t('form.terms.link')}
                              </a>
                            </span>
                          </label>

                          <button
                            type="submit"
                            disabled={isSubmitting || !agreedToTerms}
                            className="w-full bg-primary text-white py-4 px-8 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? t('form.submitting') : t('form.submit')}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              {/* Courier Option */}
              <div id="delivery-courier" className={`border-2 rounded-lg transition-all ${
                formData.deliveryMethod === 'courier'
                  ? 'border-primary bg-gray-50'
                  : 'border-gray-200'
              }`}>
                <button
                  type="button"
                  onClick={() => handleDeliveryChange(formData.deliveryMethod === 'courier' ? '' : 'courier')}
                  className="w-full flex items-start p-6 text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Package className="h-6 w-6 text-accent" />
                      <h3 className="text-lg font-semibold text-primary">
                        {t('delivery.courier.title')}
                      </h3>
                    </div>
                    <p
                      className="text-gray-600 text-sm"
                      dangerouslySetInnerHTML={{ __html: t('delivery.courier.description') }}
                    />
                  </div>
                </button>

                {formData.deliveryMethod === 'courier' && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-6">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {renderCustomerTypeSelector()}
                        {renderNameFields()}
                        {renderContactForm()}

                        {/* Terms and Submit inside card */}
                        <div className="border-t border-gray-200 pt-6">
                          <label className="flex items-start mb-6 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={agreedToTerms}
                              onChange={(e) => setAgreedToTerms(e.target.checked)}
                              className="w-6 h-6 text-primary focus:ring-primary border-gray-300 rounded mt-0.5 flex-shrink-0 cursor-pointer"
                              required
                            />
                            <span className="ml-3 text-gray-700 text-base">
                              {t('form.terms.text')}{' '}
                              <a
                                href="/obchodni-podminky"
                                onClick={handleTermsLinkClick}
                                className={`text-accent hover:text-accent/80 font-semibold underline ${termsLinkClicked ? 'animate-pulse' : ''}`}
                              >
                                {t('form.terms.link')}
                              </a>
                            </span>
                          </label>

                          <button
                            type="submit"
                            disabled={isSubmitting || !agreedToTerms}
                            className="w-full bg-primary text-white py-4 px-8 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? t('form.submitting') : t('form.submit')}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              {/* Personal Option */}
              <div id="delivery-personal" className={`border-2 rounded-lg transition-all ${
                formData.deliveryMethod === 'personal'
                  ? 'border-gray-200 bg-gray-50'
                  : 'border-gray-200'
              }`}>
                <button
                  type="button"
                  onClick={() => handleDeliveryChange(formData.deliveryMethod === 'personal' ? '' : 'personal')}
                  className="w-full flex items-start p-6 text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Home className="h-6 w-6 text-accent" />
                      <h3 className="text-lg font-semibold text-primary">
                        {t('delivery.personal.title')}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {t('delivery.personal.description')}
                    </p>
                  </div>
                </button>

                {formData.deliveryMethod === 'personal' && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-6 space-y-6">
                      {/* Address and Contact Info */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-primary">DataHelp s.r.o.</h4>
                          <p className="text-gray-700 whitespace-pre-line">{t('delivery.personal.address')}</p>

                          <h4 className="font-semibold text-primary mt-4">Otevírací doba</h4>
                          <p className="text-gray-700">{t('delivery.personal.hours')}</p>
                        </div>

                        {/* Map */}
                        <div>
                          <h4 className="font-semibold text-primary mb-3">Kde nás najdete</h4>
                          <div className="w-full h-[300px] rounded-lg overflow-hidden border-2 border-gray-200">
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
                      </div>

                      {/* Optional Appointment Form */}
                      <div className="border-t border-gray-200 pt-6">
                        <PersonalVisitForm />
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
