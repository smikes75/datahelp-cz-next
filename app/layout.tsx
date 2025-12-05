import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieConsentWrapper } from '@/components/CookieConsentWrapper';
import { TranslationsProvider } from '@/contexts/TranslationsContext';
import { ToastProvider } from '@/contexts/ToastContext';
import './globals.css';

export const metadata = {
  title: 'DataHelp.cz - Profesionální záchrana dat',
  description: 'Profesionální služby záchrany dat s více než 25 lety zkušeností. Specializujeme se na obnovu HDD, SSD a RAID systémů.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body>
        <TranslationsProvider>
          <ToastProvider>
            <CookieConsentWrapper>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow pt-[72px]">{children}</main>
                <Footer />
              </div>
            </CookieConsentWrapper>
          </ToastProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
