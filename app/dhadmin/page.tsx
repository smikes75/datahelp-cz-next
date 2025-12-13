'use client';

/**
 * Admin Dashboard s jednotnym prihlasenim
 * Pristup k nastaveni banneru, galerie a dalsim nastrojum
 */

import { useState, useEffect } from 'react';
import { Lock, Megaphone, Image, Home, AlertCircle, FileText } from 'lucide-react';
import Link from 'next/link';

const ADMIN_PASSWORD = '123datahelpadmin';

const adminTools = [
  {
    href: '/dhadmin/clanky',
    label: 'Sprava clanku',
    description: 'Vytvareni a editace blog clanku',
    icon: FileText,
    color: 'bg-green-500',
  },
  {
    href: '/dhadmin/banner',
    label: 'Nastaveni banneru',
    description: 'Animovany banner na homepage - text, barva, odkaz',
    icon: Megaphone,
    color: 'bg-orange-500',
  },
  {
    href: '/dhadmin/galleries',
    label: 'Sprava galerii',
    description: 'Nahravani a sprava obrazku v galeriich',
    icon: Image,
    color: 'bg-blue-500',
  },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Check auth on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('dhadmin_auth');
    if (saved === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD || password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('dhadmin_auth', 'true');
    } else {
      setError('Nespravne heslo');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Lock className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            DH Admin
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heslo
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Zadejte admin heslo"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Prihlasit se
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-600 hover:text-primary">
              Zpet na web
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">DH Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-white/80 hover:text-white text-sm flex items-center gap-1">
                <Home className="h-4 w-4" />
                Zpet na web
              </Link>
              <button
                onClick={() => {
                  sessionStorage.removeItem('dhadmin_auth');
                  setIsAuthenticated(false);
                }}
                className="text-white/80 hover:text-white text-sm"
              >
                Odhlasit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Nastroje</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className={`${tool.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{tool.label}</h3>
                    <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
          <h3 className="font-semibold mb-2">Napoveda:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Prihlaseni plati po dobu session (zavreni prohlizece = odhlaseni)</li>
            <li>Zmeny v nastaveni banneru se projevi okamzite</li>
            <li>Galerie pouziva Cloudinary pro ukladani obrazku</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
