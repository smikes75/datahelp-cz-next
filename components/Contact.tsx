'use client';

import React, { useState } from 'react';
import { useTranslations } from '@/contexts/TranslationsContext';
import { useToast } from '@/contexts/ToastContext';
import { FormInput } from './ui/FormInput';
import { FormTextarea } from './ui/FormTextarea';
import { FormButton } from './ui/FormButton';
import { validateEmail, validatePhone, sanitizeInput } from '@/lib/utils/security';
import { createClient } from '@/lib/supabase/client';

const RATE_LIMIT_SECONDS = 60;

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export function Contact() {
  const t = useTranslations('contact.form');
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const name = formData.get('name') as string;
    const message = formData.get('message') as string;

    if (!name || name.length < 2) {
      errors.name = t('errors.name');
    }

    // At least one of email or phone must be provided
    const hasEmail = email && email.trim().length > 0;
    const hasPhone = phone && phone.trim().length > 0;

    if (!hasEmail && !hasPhone) {
      errors.email = t('errors.emailOrPhone');
      errors.phone = t('errors.emailOrPhone');
    } else {
      // Validate email if provided
      if (hasEmail && !validateEmail(email)) {
        errors.email = t('errors.emailFormat');
      }

      // Validate phone if provided
      if (hasPhone && !validatePhone(phone)) {
        errors.phone = t('errors.phone');
      }
    }

    if (!message || message.length < 10) {
      errors.message = t('errors.message');
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_SECONDS * 1000) {
      toast.error(
        t('rateLimit').replace('{seconds}', RATE_LIMIT_SECONDS.toString())
      );
      return;
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();
      const sanitizedData = {
        name: sanitizeInput(formData.get('name') as string),
        email: sanitizeInput(formData.get('email') as string),
        phone: sanitizeInput(formData.get('phone') as string),
        message: sanitizeInput(formData.get('message') as string),
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
      };

      const { error } = await supabase
        .from('contact_forms')
        .insert([sanitizedData]);

      if (error) throw error;

      setLastSubmitTime(now);
      toast.success(t('success'));
      form.reset();
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        type="text"
        name="name"
        label={t('name')}
        required
        error={errors.name}
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? "name-error" : undefined}
      />
      <FormInput
        type="email"
        name="email"
        label={t('email')}
        error={errors.email}
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? "email-error" : undefined}
      />
      <FormInput
        type="tel"
        name="phone"
        label={t('phone')}
        error={errors.phone}
        aria-invalid={!!errors.phone}
        aria-describedby={errors.phone ? "phone-error" : undefined}
      />
      <FormTextarea
        name="message"
        rows={4}
        label={t('message')}
        required
        error={errors.message}
        aria-invalid={!!errors.message}
        aria-describedby={errors.message ? "message-error" : undefined}
      />
      <FormButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? t('sending') : t('send')}
      </FormButton>
    </form>
  );
}
