'use client';

/**
 * Admin - Contact Forms (placeholder)
 */

import { Mail, Clock, User } from 'lucide-react';

export default function AdminContactFormsPage() {
  // Placeholder data
  const contacts = [
    {
      id: 1,
      name: 'Jan Novák',
      email: 'jan@example.com',
      phone: '+420 123 456 789',
      message: 'Potřebuji zachránit data z poškozeného disku...',
      date: '2025-01-15',
      read: false
    },
    {
      id: 2,
      name: 'Petra Svobodová',
      email: 'petra@example.com',
      phone: '+420 987 654 321',
      message: 'Zajímá mě cena za záchranu dat z SSD...',
      date: '2025-01-14',
      read: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Kontaktní formuláře</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-white rounded-lg shadow-lg p-6 ${
                !contact.read ? 'border-l-4 border-accent' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <User className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                    <p className="text-sm text-gray-600">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {contact.date}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{contact.message}</p>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Odpovědět
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                  Označit jako vyřízené
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
