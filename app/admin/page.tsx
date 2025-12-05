'use client';

/**
 * Admin Login stránka (placeholder)
 */

import { useState } from 'react';
import { Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - implementace autentizace
    if (credentials.username && credentials.password) {
      router.push('/cs/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Lock className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">Admin přihlášení</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Uživatelské jméno
            </label>
            <input
              type="text"
              required
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Heslo
            </label>
            <input
              type="password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Přihlásit se
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Tato stránka je určena pouze pro autorizované uživatele
        </p>
      </div>
    </div>
  );
}
