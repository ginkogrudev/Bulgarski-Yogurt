/**
 * analytics.js — GA4 Event Tracking
 * Български Йогурт | GG Solutions
 *
 * Events map:
 * ┌─────────────────────────┬────────────────────────────────┐
 * │ Event Name              │ Trigger                        │
 * ├─────────────────────────┼────────────────────────────────┤
 * │ cta_partner_hero        │ Hero primary CTA click         │
 * │ cta_products            │ "Виж продуктите" click         │
 * │ cta_b2b_contact         │ B2B section CTA click          │
 * │ nav_contact             │ Header inquiry button click    │
 * │ scroll_depth_25         │ 25% page scroll                │
 * │ scroll_depth_50         │ 50% page scroll                │
 * │ scroll_depth_75         │ 75% page scroll                │
 * │ scroll_depth_100        │ Reached footer                 │
 * │ product_card_hover      │ Product card hover (name)      │
 * │ time_on_page_30s        │ 30 seconds on page             │
 * │ time_on_page_60s        │ 60 seconds on page             │
 * └─────────────────────────┴────────────────────────────────┘
 */

(function () {
  'use strict';

  /* ── Safe gtag wrapper ──────────────────────────────────── */
  function track(eventName, params = {}) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, {
        event_category: 'engagement',
        ...params,
      });
    }
    // Dev logging
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      console.log('[Analytics]', eventName, params);
    }
  }

  /* ── CTA Click Tracking ─────────────────────────────────── */
  function initCTATracking() {
    const ctaMap = {
      '[data-track="cta_partner_hero"]': { name: 'cta_partner_hero',  label: 'Hero — Стани наш партньор' },
      '[data-track="cta_products"]':     { name: 'cta_products',      label: 'Hero — Виж продуктите'    },
      '[data-track="cta_b2b_contact"]':  { name: 'cta_b2b_contact',   label: 'B2B — Свържете се'        },
      '[data-track="nav_contact"]':      { name: 'nav_contact',        label: 'Nav — Запитване'          },
    };

    Object.entries(ctaMap).forEach(([selector, config]) => {
      document.querySelectorAll(selector).forEach(el => {
        el.addEventListener('click', () => {
          track(config.name, { event_label: config.label });
        });
      });
    });
  }

  /* ── Scroll Depth Tracking ──────────────────────────────── */
  function initScrollDepth() {
    const milestones = { 25: false, 50: false, 75: false, 100: false };

    function getScrollPercent() {
      const el  = document.documentElement;
      const top = el.scrollTop || document.body.scrollTop;
      const h   = el.scrollHeight - el.clientHeight;
      return h > 0 ? Math.round((top / h) * 100) : 0;
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        const pct = getScrollPercent();
        [25, 50, 75, 100].forEach(m => {
          if (!milestones[m] && pct >= m) {
            milestones[m] = true;
            track(`scroll_depth_${m}`, { event_label: `${m}% scroll` });
          }
        });
        ticking = false;
      });
      ticking = true;
    }, { passive: true });
  }

  /* ── Time on Page ───────────────────────────────────────── */
  function initTimeTracking() {
    const checkpoints = [30, 60];
    checkpoints.forEach(sec => {
      setTimeout(() => {
        track(`time_on_page_${sec}s`, { event_label: `${sec}s on page` });
      }, sec * 1000);
    });
  }

  /* ── Product Card Hover ─────────────────────────────────── */
  function initProductHover() {
    document.querySelectorAll('[data-product]').forEach(card => {
      let hoverTimer;
      card.addEventListener('mouseenter', () => {
        hoverTimer = setTimeout(() => {
          const name = card.dataset.product;
          track('product_card_hover', { event_label: name });
        }, 1500); // only fire if hovered > 1.5s
      });
      card.addEventListener('mouseleave', () => clearTimeout(hoverTimer));
    });
  }

  /* ── Init ───────────────────────────────────────────────── */
  function init() {
    initCTATracking();
    initScrollDepth();
    initTimeTracking();
    initProductHover();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
