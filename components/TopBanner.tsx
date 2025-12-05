'use client';

/**
 * Top Banner - Wrapper pro přepínání mezi statickým a animovaným bannerem
 * Konfigurace: BANNER_CONFIG
 */

import { ContactBanner } from './ContactBanner';
import { AnnouncementBanner } from './AnnouncementBanner';

// ==================== KONFIGURACE ====================
const BANNER_CONFIG = {
  showAnnouncement: false, // true = animovaný banner, false = statický kontaktní banner
};
// =====================================================

export function TopBanner() {
  return BANNER_CONFIG.showAnnouncement ? <AnnouncementBanner /> : <ContactBanner />;
}
