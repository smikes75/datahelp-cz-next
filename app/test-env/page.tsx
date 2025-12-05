'use client';

export default function TestEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>🔍 Environment Variables Test</h1>
      <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
        <div><strong>NEXT_PUBLIC_SUPABASE_URL:</strong></div>
        <div>{url || '❌ NOT SET'}</div>
        <div style={{ marginTop: '1rem' }}><strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong></div>
        <div>{key ? `✅ SET (first 20 chars): ${key.substring(0, 20)}...` : '❌ NOT SET'}</div>
      </div>
      {url && key ? (
        <div style={{ color: 'green', fontWeight: 'bold', fontSize: '1.2rem' }}>
          ✅ Supabase credentials jsou načtené!
        </div>
      ) : (
        <div style={{ color: 'red', fontWeight: 'bold', fontSize: '1.2rem' }}>
          ❌ Supabase credentials NEJSOU načtené!
          <div style={{ marginTop: '1rem', fontSize: '0.9rem', fontWeight: 'normal' }}>
            Zkontroluj:
            <ul>
              <li>Existuje soubor .env.local v root složce?</li>
              <li>Restartoval jsi dev server po vytvoření .env.local?</li>
              <li>Jsou proměnné správně pojmenované (NEXT_PUBLIC_ prefix)?</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
