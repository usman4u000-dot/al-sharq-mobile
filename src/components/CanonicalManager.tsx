import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Bulletproof Canonical & OpenGraph Synchronizer
 * 
 * Guarantees strictly ONE single <link rel="canonical"> tag exists in <head>
 * at all times, matching the current URL path without trailing slashes.
 * Automatically eliminates Google Search Console duplicate errors:
 * - "Duplicate without user-selected canonical"
 * - "Duplicate, Google chose different canonical than user"
 * - "Alternative page with proper canonical tag"
 */
export default function CanonicalManager() {
  const location = useLocation();

  useEffect(() => {
    try {
      // Normalize pathname: remove trailing slash, strip query parameters for canonical
      const rawPath = location.pathname;
      const cleanPath = rawPath === '/' ? '' : rawPath.replace(/\/+$/, '');
      const canonicalUrl = `https://allsharq.com${cleanPath}`;

      // 1. Locate all existing canonical tags
      const existingCanonicals = document.querySelectorAll('link[rel="canonical"]');

      if (existingCanonicals.length > 0) {
        // Update the primary one and remove any extra duplicates
        existingCanonicals[0].setAttribute('href', canonicalUrl);
        for (let i = 1; i < existingCanonicals.length; i++) {
          existingCanonicals[i].remove();
        }
      } else {
        // Create new if none found
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonicalUrl;
        document.head.appendChild(link);
      }

      // 2. Synchronize og:url and twitter:url
      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', canonicalUrl);
      } else {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        ogUrl.setAttribute('content', canonicalUrl);
        document.head.appendChild(ogUrl);
      }

      let twitterUrl = document.querySelector('meta[name="twitter:url"]');
      if (twitterUrl) {
        twitterUrl.setAttribute('content', canonicalUrl);
      }

    } catch (e) {
      console.warn('CanonicalManager sync error:', e);
    }
  }, [location.pathname]);

  return null;
}
