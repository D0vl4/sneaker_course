'use client';

import { useEffect, useRef } from 'react';

// Declare UnicornStudio on window
declare global {
  interface Window {
    UnicornStudio: any;
  }
}

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load UnicornStudio script if not already loaded
    const loadScript = () => {
      return new Promise<void>((resolve) => {
        if (window.UnicornStudio && window.UnicornStudio.isInitialized) {
          resolve();
          return;
        }

        if (!window.UnicornStudio) {
          window.UnicornStudio = { isInitialized: false };
        }

        const existing = document.querySelector('script[src*="unicornStudio"]');
        if (existing) {
          // Script already loading/loaded, wait for it
          const check = setInterval(() => {
            if (window.UnicornStudio && window.UnicornStudio.init) {
              clearInterval(check);
              resolve();
            }
          }, 50);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js';
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    const initScene = async () => {
      await loadScript();

      // Small delay to let the DOM settle
      await new Promise(r => setTimeout(r, 100));

      // Re-init to pick up any new data-us-project elements
      if (window.UnicornStudio && window.UnicornStudio.init) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };

    initScene();

    // Aggressively hide branding watermark
    const style = document.createElement('style');
    style.id = 'us-branding-hide';
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }
      [data-us-project] canvas {
        width: 100% !important;
        height: 100% !important;
      }
      [data-us-project] > div:not(:first-child),
      [data-us-project] a,
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"],
      [data-us-project] [class*="badge"],
      [data-us-project] [style*="z-index: 2147483647"],
      [data-us-project] [style*="bottom"],
      div[style*="unicorn.studio"],
      a[href*="unicorn.studio"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `;

    // Only add if not already present
    if (!document.getElementById('us-branding-hide')) {
      document.head.appendChild(style);
    }

    const hideBranding = () => {
      // Target all elements inside US projects
      document.querySelectorAll('[data-us-project]').forEach(container => {
        container.querySelectorAll('*').forEach(el => {
          const text = (el.textContent || '').toLowerCase();
          const href = (el as HTMLAnchorElement).href || '';
          const title = el.getAttribute('title') || '';

          if (
            text.includes('made with') ||
            text.includes('unicorn') ||
            href.includes('unicorn') ||
            title.toLowerCase().includes('unicorn')
          ) {
            (el as HTMLElement).style.cssText = 'display:none!important;visibility:hidden!important;opacity:0!important;width:0!important;height:0!important;position:absolute!important;left:-9999px!important;';
            try { el.remove(); } catch (_e) { /* */ }
          }
        });
      });

      // Also catch any floating watermarks outside the project div
      document.querySelectorAll('a[href*="unicorn.studio"], div[class*="watermark"]').forEach(el => {
        try { el.remove(); } catch (_e) { /* */ }
      });
    };

    hideBranding();
    const interval = setInterval(hideBranding, 100);
    setTimeout(hideBranding, 500);
    setTimeout(hideBranding, 1000);
    setTimeout(hideBranding, 2000);
    setTimeout(hideBranding, 5000);

    // MutationObserver to catch dynamically added watermarks
    const observer = new MutationObserver(() => hideBranding());
    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true });
    }

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden">
      <div
        data-us-project="whwOGlfJ5Rz2rHaEUgHl"
        style={{ 
          width: '100%', 
          height: '105%', 
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
    </div>
  );
}
