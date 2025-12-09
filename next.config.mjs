/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www.datahelp.cz',
      },
    ],
  },

  async headers() {
    const allowIndexing = process.env.ALLOW_INDEXING === 'true';

    // Security headers for all routes
    const securityHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
    ];

    const headers = [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];

    // Add noindex header for non-production environments
    if (!allowIndexing) {
      headers[0].headers.push({
        key: 'X-Robots-Tag',
        value: 'noindex, nofollow',
      });
    }

    return headers;
  },

  async redirects() {
    return [
      // === SLUŽBY - Přejmenování ===
      {
        source: '/zachrana-dat/pevny-disk/',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/zachrana-dat/pevny-disk',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      // === STANDALONE STRÁNKY ===
      {
        source: '/zachrana-dat-po-cele-cr/',
        destination: '/kontakt/',
        permanent: true,
      },
      {
        source: '/zachrana-dat-po-cele-cr',
        destination: '/kontakt/',
        permanent: true,
      },

      // === TÉMATICKÉ SEO STRÁNKY → HDD ===
      {
        source: '/pevny-disk-externi-disk/',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/pevny-disk-externi-disk',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/mechanicke-poskozeni-ploten-hdd/',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/mechanicke-poskozeni-ploten-hdd',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/pevny-disk-vadne-sektory/',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/pevny-disk-vadne-sektory',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/pevny-disk-vadny-motorek-zadrena-loziska/',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/pevny-disk-vadny-motorek-zadrena-loziska',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/pevny-disk-prepeti-vypadek-elektriny/',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/pevny-disk-prepeti-vypadek-elektriny',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/pevny-disk-hw-poskozeni/',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/pevny-disk-hw-poskozeni',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/namoceny-pevny-disk/',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/namoceny-pevny-disk',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/zaplaveny-disk/',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/zaplaveny-disk',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/vadna-vnejsi-elektronika-hdd/',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/vadna-vnejsi-elektronika-hdd',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/vadna-vnitrni-elektronika-hdd/',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/vadna-vnitrni-elektronika-hdd',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/dalsi-zavady-hdd/',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },
      {
        source: '/dalsi-zavady-hdd',
        destination: '/zachrana-dat/hdd/',
        permanent: true,
      },

      // === TÉMATICKÉ SEO STRÁNKY → OBECNÉ ===
      {
        source: '/pametova-karta/',
        destination: '/zachrana-dat/',
        permanent: true,
      },
      {
        source: '/pametova-karta',
        destination: '/zachrana-dat/',
        permanent: true,
      },
      {
        source: '/obnova-smazanych-souboru/',
        destination: '/zachrana-dat/',
        permanent: true,
      },
      {
        source: '/obnova-smazanych-souboru',
        destination: '/zachrana-dat/',
        permanent: true,
      },
      {
        source: '/obnova-smazanych-fotek/',
        destination: '/zachrana-dat/',
        permanent: true,
      },
      {
        source: '/obnova-smazanych-fotek',
        destination: '/zachrana-dat/',
        permanent: true,
      },

      // === TÉMATICKÉ SEO STRÁNKY → RAID ===
      {
        source: '/obnova-dat-z-diskoveho-pole-raid/',
        destination: '/zachrana-dat/raid/',
        permanent: true,
      },
      {
        source: '/obnova-dat-z-diskoveho-pole-raid',
        destination: '/zachrana-dat/raid/',
        permanent: true,
      },

      // === TÉMATICKÉ SEO STRÁNKY → JINÉ ===
      {
        source: '/hw-problem/',
        destination: '/caste-dotazy/',
        permanent: true,
      },
      {
        source: '/hw-problem',
        destination: '/caste-dotazy/',
        permanent: true,
      },
      {
        source: '/princip-cteni-hdd/',
        destination: '/technologie/',
        permanent: true,
      },
      {
        source: '/princip-cteni-hdd',
        destination: '/technologie/',
        permanent: true,
      },
      {
        source: '/prvni-kroky-zachrany-dat/',
        destination: '/caste-dotazy/',
        permanent: true,
      },
      {
        source: '/prvni-kroky-zachrany-dat',
        destination: '/caste-dotazy/',
        permanent: true,
      },
      {
        source: '/formatovani-pevneho-disku/',
        destination: '/clanky/',
        permanent: true,
      },
      {
        source: '/formatovani-pevneho-disku',
        destination: '/clanky/',
        permanent: true,
      },
      {
        source: '/zonalni-zapis-na-pevny-disk/',
        destination: '/clanky/',
        permanent: true,
      },
      {
        source: '/zonalni-zapis-na-pevny-disk',
        destination: '/clanky/',
        permanent: true,
      },

      // === UTILITY STRÁNKY ===
      {
        source: '/bezpecnost-dat/',
        destination: '/o-nas/',
        permanent: true,
      },
      {
        source: '/bezpecnost-dat',
        destination: '/o-nas/',
        permanent: true,
      },
      {
        source: '/fakturacni-udaje/',
        destination: '/kontakt/',
        permanent: true,
      },
      {
        source: '/fakturacni-udaje',
        destination: '/kontakt/',
        permanent: true,
      },
      // Partnerský program nyní má vlastní stránku - redirect odstraněn
      {
        source: '/likvidace-dat/',
        destination: '/zachrana-dat/',
        permanent: true,
      },
      {
        source: '/likvidace-dat',
        destination: '/zachrana-dat/',
        permanent: true,
      },
      {
        source: '/odborne/',
        destination: '/technologie/',
        permanent: true,
      },
      {
        source: '/odborne',
        destination: '/technologie/',
        permanent: true,
      },

      // === CENÍKOVÉ PODSTRÁNKY - Redirecty ze starého webu na nové stránky ===
      {
        source: '/cenik-zachrany-dat/cenik-zachrany-dat-flash-disky-pametove-karty-mobily/',
        destination: '/cenik-zachrany-dat/flash',
        permanent: true,
      },
      {
        source: '/cenik-zachrany-dat/cenik-zachrany-dat-flash-disky-pametove-karty-mobily',
        destination: '/cenik-zachrany-dat/flash',
        permanent: true,
      },
      {
        source: '/cenik-zachrany-dat/cenik-zachrany-dat-nas-datova-uloziste/',
        destination: '/cenik-zachrany-dat/nas',
        permanent: true,
      },
      {
        source: '/cenik-zachrany-dat/cenik-zachrany-dat-nas-datova-uloziste',
        destination: '/cenik-zachrany-dat/nas',
        permanent: true,
      },
      {
        source: '/cenik-zachrany-dat/cenik-zachrany-dat-raid-pole/',
        destination: '/cenik-zachrany-dat/raid',
        permanent: true,
      },
      {
        source: '/cenik-zachrany-dat/cenik-zachrany-dat-raid-pole',
        destination: '/cenik-zachrany-dat/raid',
        permanent: true,
      },
      {
        source: '/cenik-zachrany-dat/cenik-zachrany-dat-ssd-disk-solid-state-disk/',
        destination: '/cenik-zachrany-dat/ssd',
        permanent: true,
      },
      {
        source: '/cenik-zachrany-dat/cenik-zachrany-dat-ssd-disk-solid-state-disk',
        destination: '/cenik-zachrany-dat/ssd',
        permanent: true,
      },
      {
        source: '/cenik-zachrany-dat/cenik-zachrany-dat-z-mobilu-os-android-ios/',
        destination: '/cenik-zachrany-dat/mobil',
        permanent: true,
      },
      {
        source: '/cenik-zachrany-dat/cenik-zachrany-dat-z-mobilu-os-android-ios',
        destination: '/cenik-zachrany-dat/mobil',
        permanent: true,
      },
      // Další varianty starých URL
      {
        source: '/pevny-disk-externi-disk/cenik/',
        destination: '/cenik-zachrany-dat/hdd',
        permanent: true,
      },
      {
        source: '/pevny-disk-externi-disk/cenik',
        destination: '/cenik-zachrany-dat/hdd',
        permanent: true,
      },

      // === NOVINKY - Wildcard redirect na články ===
      {
        source: '/novinky/:slug*',
        destination: '/clanky/',
        permanent: true,
      },
      {
        source: '/novinky/',
        destination: '/clanky/',
        permanent: true,
      },
      {
        source: '/novinky',
        destination: '/clanky/',
        permanent: true,
      },

      // === BLOG CATEGORIES - Redirect to main blog ===
      {
        source: '/clanky/kategorie/:slug*',
        destination: '/clanky/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
