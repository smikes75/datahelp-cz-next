'use client';

/**
 * Admin stránka pro nastavení banneru
 * Používá sdílené přihlášení z dashboardu (dhadmin_auth)
 */

import { useState, useEffect } from 'react';
import { Save, AlertCircle, Check, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BannerSettings {
  enabled: boolean;
  type: 'contact' | 'announcement';
  text: string;
  bgColor: string;
}

const COLOR_OPTIONS = [
  { value: 'blue-900', label: 'Tmavě modrá', preview: 'bg-blue-900' },
  { value: 'primary', label: 'Primární (modrá)', preview: 'bg-primary' },
  { value: 'accent', label: 'Akcentová (oranžová)', preview: 'bg-accent' },
  { value: 'green-700', label: 'Zelená', preview: 'bg-green-700' },
  { value: 'red-700', label: 'Červená', preview: 'bg-red-700' },
  { value: 'purple-700', label: 'Fialová', preview: 'bg-purple-700' },
];

export default function AdminBannerPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [settings, setSettings] = useState<BannerSettings>({
    enabled: false,
    type: 'contact',
    text: 'Svoz médií ZDARMA po celé ČR!',
    bgColor: 'blue-900',
  });
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(true);

  // Check shared auth on mount
  useEffect(() => {
    const auth = sessionStorage.getItem('dhadmin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchSettings();
    } else {
      // Redirect to dashboard for login
      router.push('/dhadmin');
    }
    setCheckingAuth(false);
  }, [router]);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings?key=banner');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus('idle');

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: '123datahelpadmin', // Use stored password
          key: 'banner',
          value: settings,
        }),
      });

      if (res.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch {
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  // Show loading while checking auth
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // Not authenticated - will redirect
  if (!isAuthenticated) {
    return null;
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dhadmin" className="text-white/80 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold">Nastavení banneru</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">Načítání...</div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Preview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Náhled banneru</h2>
              <div className={`py-3 px-4 rounded-lg text-white text-center font-medium ${
                settings.bgColor === 'primary' ? 'bg-primary' :
                settings.bgColor === 'accent' ? 'bg-accent' :
                `bg-${settings.bgColor}`
              }`}>
                {settings.type === 'announcement' ? settings.text : 'Kontaktní banner (fixní)'}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {settings.enabled ? 'Banner je AKTIVNÍ' : 'Banner je VYPNUTÝ'}
              </p>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
              <h2 className="text-lg font-semibold text-gray-900">Nastavení</h2>

              {/* Enabled toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-900">Zobrazit animovaný banner</label>
                  <p className="text-sm text-gray-500">Animovaný banner se zobrazí pod kontaktním bannerem</p>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, enabled: !settings.enabled })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.enabled ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Text input - only for announcement */}
              {settings.enabled && (
                <>
                  <div>
                    <label className="block font-medium text-gray-900 mb-2">
                      Text banneru
                    </label>
                    <input
                      type="text"
                      value={settings.text}
                      onChange={(e) => setSettings({ ...settings, text: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Text, který se bude scrollovat..."
                    />
                  </div>

                  {/* Color picker */}
                  <div>
                    <label className="block font-medium text-gray-900 mb-2">
                      Barva pozadí
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {COLOR_OPTIONS.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setSettings({ ...settings, bgColor: color.value })}
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                            settings.bgColor === color.value
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded ${color.preview}`} />
                          <span className="text-sm">{color.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Save button */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <>Ukládám...</>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      Uložit změny
                    </>
                  )}
                </button>

                {saveStatus === 'success' && (
                  <span className="flex items-center gap-1 text-green-600">
                    <Check className="h-5 w-5" />
                    Uloženo
                  </span>
                )}

                {saveStatus === 'error' && (
                  <span className="flex items-center gap-1 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    Chyba při ukládání
                  </span>
                )}
              </div>
            </div>

            {/* Help */}
            <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
              <h3 className="font-semibold mb-2">Jak to funguje:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Změny se projeví okamžitě po uložení (není potřeba redeploy)</li>
                <li>Kontaktní banner (telefon, email) je vždy viditelný nahoře</li>
                <li>Animovaný banner se zobrazí pod kontaktním (pokud je zapnutý)</li>
                <li>Text se scrolluje zleva doprava v nekonečné smyčce</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
