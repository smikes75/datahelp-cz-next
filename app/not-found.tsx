import Link from 'next/link';
import { Home, Search, Phone, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="text-center px-4 py-16 max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="mb-8">
          <span className="text-9xl font-bold text-primary/10">404</span>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Stránka nenalezena
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla přesunuta.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Home className="h-5 w-5" />
            Zpět na hlavní stránku
          </Link>
          <Link
            href="/zachrana-dat"
            className="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            <Search className="h-5 w-5" />
            Naše služby
          </Link>
        </div>

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-md p-6 text-left">
          <h2 className="text-lg font-semibold text-primary mb-4">
            Potřebujete pomoc?
          </h2>
          <p className="text-gray-600 mb-4">
            Pokud hledáte konkrétní informaci nebo potřebujete záchranit data,
            kontaktujte nás přímo:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+420775220440"
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
            >
              <Phone className="h-5 w-5" />
              +420 775 220 440
            </a>
            <Link
              href="/poptavka-zachrany-dat"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <ArrowLeft className="h-5 w-5 rotate-180" />
              Objednat diagnostiku
            </Link>
          </div>
        </div>

        {/* Popular Links */}
        <div className="mt-8 text-sm text-gray-500">
          <p className="mb-2">Často hledané stránky:</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link href="/zachrana-dat/hdd" className="hover:text-primary hover:underline">
              Záchrana HDD
            </Link>
            <Link href="/zachrana-dat/ssd" className="hover:text-primary hover:underline">
              Záchrana SSD
            </Link>
            <Link href="/zachrana-dat/raid" className="hover:text-primary hover:underline">
              Záchrana RAID
            </Link>
            <Link href="/cenik-zachrany-dat" className="hover:text-primary hover:underline">
              Ceník
            </Link>
            <Link href="/kontakt" className="hover:text-primary hover:underline">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
