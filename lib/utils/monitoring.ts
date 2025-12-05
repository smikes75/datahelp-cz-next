'use client';

/**
 * Monitoring a analytics utility funkce
 * Placeholder pro Plausible analytics a Web Vitals
 */

// Kontrola produkčního prostředí
const isProduction = process.env.NODE_ENV === 'production';

// Inicializace Plausible (placeholder)
export const plausible = {
  trackPageview: (_options: { url: string }) => {
    if (isProduction) {
      console.log('Track pageview:', _options.url);
    }
  },
  trackEvent: (_eventName: string, _props?: Record<string, unknown>) => {
    if (isProduction) {
      console.log('Track event:', _eventName, _props);
    }
  }
};

/**
 * Sleduje page views
 */
export const trackPageview = (url: string) => {
  plausible.trackPageview({
    url: `https://datahelp.cz${url}`,
  });
};

/**
 * Sleduje vlastní eventy
 */
export const trackEvent = (eventName: string, props?: Record<string, unknown>) => {
  plausible.trackEvent(eventName, props);
};

/**
 * Inicializuje performance monitoring
 */
export const initPerformanceMonitoring = () => {
  // Core Web Vitals monitoring (placeholder)
  if (isProduction) {
    console.log('Performance monitoring initialized');
  }
};

/**
 * Sleduje chování uživatelů (placeholder)
 */
export const trackUserBehavior = () => {
  if (isProduction) {
    console.log('User behavior tracking initialized');
  }
};

/**
 * Sleduje formuláře
 */
export const trackFormSubmit = (formName: string) => {
  trackEvent('form_submit', { form: formName });
};

/**
 * Sleduje kliknutí na tlačítka
 */
export const trackButtonClick = (buttonName: string) => {
  trackEvent('button_click', { button: buttonName });
};

/**
 * Sleduje download
 */
export const trackDownload = (fileName: string) => {
  trackEvent('file_download', { file: fileName });
};
