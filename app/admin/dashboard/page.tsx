'use client';

/**
 * Admin Dashboard (placeholder)
 */

import { BarChart, Users, Mail, FileText } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { icon: <Users />, label: 'Aktivní zakázky', value: '12' },
    { icon: <Mail />, label: 'Nové zprávy', value: '5' },
    { icon: <FileText />, label: 'Objednávky tento měsíc', value: '48' },
    { icon: <BarChart />, label: 'Úspěšnost', value: '94%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Rychlé akce</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/kontakty"
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors text-center"
            >
              <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
              <span className="font-semibold">Kontaktní formuláře</span>
            </Link>
            <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors text-center">
              <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <span className="font-semibold">Objednávky</span>
            </button>
            <button className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary transition-colors text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <span className="font-semibold">Klienti</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
