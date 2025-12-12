import { Metadata } from 'next';
import { PacketaShipmentForm } from '@/components/PacketaShipmentForm';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PageHeader } from '@/components/PageHeader';
import { Package, Truck, CheckCircle, Clock, Shield, CreditCard } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Odeslat zásilku zdarma | DataHelp',
  description: 'Odešlete své poškozené médium k diagnostice zdarma přes Zásilkovnu. Přepravu hradí DataHelp.',
  openGraph: {
    title: 'Odeslat zásilku zdarma | DataHelp',
    description: 'Odešlete své poškozené médium k diagnostice zdarma přes Zásilkovnu.',
  },
};

export default function PacketaShipmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <PageHeader
        title="Odeslat zásilku zdarma"
        subtitle="Pošlete nám své médium k diagnostice přes Zásilkovnu"
        backgroundImage="contact-bg.webp"
      />
      <Breadcrumbs />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left column - Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* How it works */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <Package className="h-6 w-6 text-accent" />
                  Jak to funguje?
                </h2>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                    <div>
                      <p className="font-medium">Vyplňte formulář</p>
                      <p className="text-sm text-gray-600">Zadejte své kontaktní údaje a typ zařízení</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                    <div>
                      <p className="font-medium">Obdržíte podací heslo</p>
                      <p className="text-sm text-gray-600">Na email vám pošleme 8-místné heslo</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                    <div>
                      <p className="font-medium">Navštivte Zásilkovnu</p>
                      <p className="text-sm text-gray-600">Na podacím místě nahlaste heslo obsluze</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm">✓</span>
                    <div>
                      <p className="font-medium">Hotovo!</p>
                      <p className="text-sm text-gray-600">Zásilka míří k nám, vy nic neplatíte</p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6">
                <h3 className="font-bold text-primary mb-4">Výhody služby</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm">Přeprava <strong>zdarma</strong> – hradí DataHelp</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm">Podací heslo platí <strong>14 dní</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm">Přes <strong>10 000 podacích míst</strong> v ČR</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm">Zásilka je <strong>pojištěna</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-sm">Diagnostika <strong>zdarma a nezávazně</strong></span>
                  </li>
                </ul>
              </div>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-amber-800 text-sm">
                  <strong>⚠️ Důležité:</strong> Zásilku lze podat pouze na podacím místě s obsluhou.
                  Z-BOXy a výdejní automaty nejsou pro tento typ zásilky k dispozici.
                </p>
              </div>

              {/* Packeta logo */}
              <div className="flex items-center justify-center gap-4 py-4">
                <span className="text-sm text-gray-500">Přeprava zajištěna:</span>
                <Image
                  src="/images/packeta-logo.svg"
                  alt="Zásilkovna / Packeta"
                  width={120}
                  height={30}
                  className="h-8 w-auto"
                />
              </div>
            </div>

            {/* Right column - Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Objednat bezplatnou přepravu
                </h2>
                <PacketaShipmentForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
