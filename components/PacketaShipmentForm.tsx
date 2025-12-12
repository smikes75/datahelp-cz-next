'use client';

import { useState } from 'react';
import { useTranslations } from '@/contexts/TranslationsContext';
import { Package, MapPin, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  customerName: string;
  customerSurname: string;
  customerEmail: string;
  customerPhone: string;
  customerStreet: string;
  customerCity: string;
  customerZip: string;
  deviceType: string;
  problemDescription: string;
  consent: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface SubmitResult {
  success: boolean;
  password?: string;
  barcode?: string;
  error?: string;
}

export function PacketaShipmentForm() {
  const t = useTranslations('packeta');

  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    customerSurname: '',
    customerEmail: '',
    customerPhone: '',
    customerStreet: '',
    customerCity: '',
    customerZip: '',
    deviceType: 'hdd',
    problemDescription: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = t('errors.nameRequired');
    }
    if (!formData.customerSurname.trim()) {
      newErrors.customerSurname = t('errors.surnameRequired');
    }
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = t('errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = t('errors.emailInvalid');
    }
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = t('errors.phoneRequired');
    } else if (!/^[+]?[\d\s-]{9,}$/.test(formData.customerPhone.replace(/\s/g, ''))) {
      newErrors.customerPhone = t('errors.phoneInvalid');
    }
    if (!formData.customerStreet.trim()) {
      newErrors.customerStreet = t('errors.streetRequired');
    }
    if (!formData.customerCity.trim()) {
      newErrors.customerCity = t('errors.cityRequired');
    }
    if (!formData.customerZip.trim()) {
      newErrors.customerZip = t('errors.zipRequired');
    } else if (!/^\d{3}\s?\d{2}$/.test(formData.customerZip)) {
      newErrors.customerZip = t('errors.zipInvalid');
    }
    if (!formData.consent) {
      newErrors.consent = t('errors.consentRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({ ...prev, [name]: newValue }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch('/api/packeta/create-shipment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          success: true,
          password: data.password,
          barcode: data.barcode,
        });
      } else {
        setResult({
          success: false,
          error: data.error || t('errors.submitFailed'),
        });
      }
    } catch {
      setResult({
        success: false,
        error: t('errors.networkError'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (result?.success) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
          <h3 className="text-xl md:text-2xl font-bold text-green-800">
            {t('success.title')}
          </h3>
        </div>

        <p className="text-gray-700 mb-6">{t('success.description')}</p>

        <div className="bg-white rounded-xl p-6 text-center mb-6 border-2 border-accent">
          <p className="text-sm text-gray-600 mb-2">{t('success.passwordLabel')}</p>
          <p className="text-4xl md:text-5xl font-mono font-bold text-primary tracking-wider">
            {result.password}
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-amber-800 mb-2">{t('success.instructionsTitle')}</h4>
          <ol className="list-decimal list-inside space-y-2 text-amber-900 text-sm">
            <li>{t('success.step1')}</li>
            <li>{t('success.step2')}</li>
            <li>{t('success.step3')}</li>
            <li>{t('success.step4')}</li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://www.zasilkovna.cz/pobocky"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-primary text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <MapPin className="h-5 w-5" />
            {t('success.findLocation')}
          </a>
          {result.barcode && (
            <a
              href={`https://tracking.packeta.com/cs/?id=${result.barcode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold text-center hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <Package className="h-5 w-5" />
              {t('success.trackShipment')}
            </a>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          {t('success.emailSent')}
        </p>
      </div>
    );
  }

  // Error state
  if (result && !result.success) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <h3 className="text-xl font-bold text-red-800">{t('error.title')}</h3>
        </div>
        <p className="text-red-700 mb-6">{result.error}</p>
        <button
          onClick={() => setResult(null)}
          className="bg-red-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          {t('error.tryAgain')}
        </button>
      </div>
    );
  }

  // Form
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.name')} *
          </label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors ${
              errors.customerName ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder={t('form.namePlaceholder')}
          />
          {errors.customerName && (
            <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.surname')} *
          </label>
          <input
            type="text"
            name="customerSurname"
            value={formData.customerSurname}
            onChange={handleChange}
            className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors ${
              errors.customerSurname ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder={t('form.surnamePlaceholder')}
          />
          {errors.customerSurname && (
            <p className="text-red-500 text-sm mt-1">{errors.customerSurname}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.email')} *
          </label>
          <input
            type="email"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors ${
              errors.customerEmail ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder={t('form.emailPlaceholder')}
          />
          {errors.customerEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.phone')} *
          </label>
          <input
            type="tel"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleChange}
            className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors ${
              errors.customerPhone ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder={t('form.phonePlaceholder')}
          />
          {errors.customerPhone && (
            <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.street')} *
        </label>
        <input
          type="text"
          name="customerStreet"
          value={formData.customerStreet}
          onChange={handleChange}
          className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors ${
            errors.customerStreet ? 'border-red-500' : 'border-gray-200'
          }`}
          placeholder={t('form.streetPlaceholder')}
        />
        {errors.customerStreet && (
          <p className="text-red-500 text-sm mt-1">{errors.customerStreet}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.city')} *
          </label>
          <input
            type="text"
            name="customerCity"
            value={formData.customerCity}
            onChange={handleChange}
            className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors ${
              errors.customerCity ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder={t('form.cityPlaceholder')}
          />
          {errors.customerCity && (
            <p className="text-red-500 text-sm mt-1">{errors.customerCity}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('form.zip')} *
          </label>
          <input
            type="text"
            name="customerZip"
            value={formData.customerZip}
            onChange={handleChange}
            className={`w-full border-2 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors ${
              errors.customerZip ? 'border-red-500' : 'border-gray-200'
            }`}
            placeholder="123 45"
          />
          {errors.customerZip && (
            <p className="text-red-500 text-sm mt-1">{errors.customerZip}</p>
          )}
        </div>
      </div>

      {/* Device Info */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.deviceType')} *
        </label>
        <select
          name="deviceType"
          value={formData.deviceType}
          onChange={handleChange}
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors bg-white"
        >
          <option value="hdd">{t('form.deviceHdd')}</option>
          <option value="ssd">{t('form.deviceSsd')}</option>
          <option value="raid">{t('form.deviceRaid')}</option>
          <option value="flash">{t('form.deviceFlash')}</option>
          <option value="other">{t('form.deviceOther')}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('form.problemDescription')}
        </label>
        <textarea
          name="problemDescription"
          value={formData.problemDescription}
          onChange={handleChange}
          rows={3}
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
          placeholder={t('form.problemPlaceholder')}
        />
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          id="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="consent" className="text-sm text-gray-600">
          {t('form.consentText')}{' '}
          <Link href="/gdpr" className="text-accent hover:underline">
            {t('form.privacyLink')}
          </Link>{' '}
          {t('form.and')}{' '}
          <Link href="/obchodni-podminky" className="text-accent hover:underline">
            {t('form.termsLink')}
          </Link>
          . *
        </label>
      </div>
      {errors.consent && (
        <p className="text-red-500 text-sm -mt-4">{errors.consent}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-white py-4 rounded-lg font-bold text-lg hover:bg-accent/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            {t('form.submitting')}
          </>
        ) : (
          <>
            <Package className="h-5 w-5" />
            {t('form.submit')}
          </>
        )}
      </button>

      <p className="text-sm text-gray-500 text-center">
        {t('form.freeShipping')}
      </p>
    </form>
  );
}
