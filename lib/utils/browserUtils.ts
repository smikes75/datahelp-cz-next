'use client';

/**
 * Potlačí ResizeObserver chyby v konzoli
 * Používá se v client components pro odstranění nerušících error hlášek
 */
export const suppressResizeObserverErrors = () => {
  const resizeObserverError = "ResizeObserver loop completed with undelivered notifications.";

  // Handle error events
  window.addEventListener('error', (e) => {
    if (e.message === resizeObserverError) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return false;
    }
  });

  // Handle unhandled rejections
  window.addEventListener('unhandledrejection', (e) => {
    if (e.reason?.message === resizeObserverError) {
      e.preventDefault();
      return false;
    }
  });

  // Patch the console to filter out ResizeObserver warnings
  const originalError = console.error;
  console.error = (...args) => {
    if (args[0]?.toString().includes(resizeObserverError)) {
      return;
    }
    originalError.apply(console, args);
  };
};
