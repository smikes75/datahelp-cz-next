'use client';

/**
 * Animovaný banner pro speciální oznámení
 * Nastavení v /dhadmin - text, odkaz, barvy
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BannerConfig {
  enabled: boolean;
  text: string;
  link: string;
  backgroundColor: string;
  textColor: string;
}

export function AnnouncementBanner() {
  const [config, setConfig] = useState<BannerConfig | null>(null);

  useEffect(() => {
    fetch('/api/admin/banner')
      .then((res) => res.json())
      .then((data) => {
        if (data.enabled && data.text) {
          setConfig(data);
        }
      })
      .catch(() => {});
  }, []);

  if (!config) {
    return null;
  }

  const content = (
    <>
      <span className="mx-4 font-medium inline-block">{config.text}</span>
      <span className="mx-4 font-medium inline-block">{config.text}</span>
      <span className="mx-4 font-medium inline-block">{config.text}</span>
      <span className="mx-4 font-medium inline-block">{config.text}</span>
    </>
  );

  const innerContent = (
    <div className="relative flex">
      <div className="animate-scroll whitespace-nowrap flex">
        {content}
      </div>
    </div>
  );

  return (
    <div
      className="py-3 overflow-hidden"
      style={{
        backgroundColor: config.backgroundColor,
        color: config.textColor,
      }}
    >
      {config.link ? (
        <Link href={config.link} className="hover:opacity-80 transition-opacity">
          {innerContent}
        </Link>
      ) : (
        innerContent
      )}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
