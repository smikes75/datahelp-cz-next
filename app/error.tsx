'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, Phone } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Application error:', error);

    // TODO: In production, send to error tracking service (e.g., Sentry)
    // if (process.env.NODE_ENV === 'production') {
    //   captureException(error);
    // }
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="text-center px-4 py-16 max-w-2xl mx-auto">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="bg-red-100 rounded-full p-6">
            <AlertTriangle className="h-16 w-16 text-red-500" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Nastala neočekávaná chyba
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Omlouváme se, něco se pokazilo. Zkuste prosím akci opakovat nebo se vraťte na hlavní stránku.
        </p>

        {/* Error Details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
            <p className="text-sm font-mono text-red-700 break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-500 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="h-5 w-5" />
            Zkusit znovu
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            <Home className="h-5 w-5" />
            Hlavní stránka
          </Link>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-primary mb-4">
            Problém přetrvává?
          </h2>
          <p className="text-gray-600 mb-4">
            Pokud problém přetrvává, kontaktujte nás prosím:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+420775220440"
              className="inline-flex items-center justify-center gap-2 text-accent hover:underline font-medium"
            >
              <Phone className="h-5 w-5" />
              +420 775 220 440
            </a>
            <a
              href="mailto:info@datahelp.cz"
              className="text-primary hover:underline font-medium"
            >
              info@datahelp.cz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
