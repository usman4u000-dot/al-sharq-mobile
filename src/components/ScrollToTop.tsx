import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Ensures that whenever a user navigates to any new page (e.g. from Footer links,
 * Navbar links, blog links, or internal CTA buttons), the window scrolls immediately
 * to the top of the page. Also handles same-page link clicks and anchor hashes.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  // Reset scroll to top on every route change
  useEffect(() => {
    // If the URL has an anchor hash (e.g. #contact or #faq), scroll to that element
    if (hash) {
      const scrollTimer = setTimeout(() => {
        try {
          const targetId = decodeURIComponent(hash.slice(1));
          const element = document.getElementById(targetId) || document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
          }
        } catch {
          // Fallback if invalid selector
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      }, 80);

      return () => clearTimeout(scrollTimer);
    }

    // Standard route transition: scroll immediately to top
    const resetScrollPosition = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    // 1. Immediate scroll reset
    resetScrollPosition();

    // 2. Additional triggers to account for React Router suspense / AnimatePresence page transitions (300ms)
    const rafId = requestAnimationFrame(resetScrollPosition);
    const t1 = setTimeout(resetScrollPosition, 60);
    const t2 = setTimeout(resetScrollPosition, 180);
    const t3 = setTimeout(resetScrollPosition, 350);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, search, hash]);

  // Set manual history scroll restoration and handle same-page clicks
  useEffect(() => {
    // Prevent browser from retaining scrolled down position on back/forward
    if ('scrollRestoration' in window.history) {
      try {
        window.history.scrollRestoration = 'manual';
      } catch {
        // Ignore if read-only
      }
    }

    const handleGlobalLinkClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement)?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore external or protocol links
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return;
      }

      // If clicked '#', '#top' or link to current page (like clicking current page link in footer)
      if (href === '#' || href === '#top') {
        event.preventDefault();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        return;
      }

      const cleanTarget = href.split('?')[0].split('#')[0];
      const currentPath = window.location.pathname;

      if (cleanTarget === currentPath || cleanTarget === `${currentPath}/`) {
        // Same route link clicked while scrolled down
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleGlobalLinkClick, { passive: true });
    return () => {
      document.removeEventListener('click', handleGlobalLinkClick);
    };
  }, []);

  return null;
}
