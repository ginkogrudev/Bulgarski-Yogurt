/**
 * shared.js — Shared interactions across all pages
 * Български Йогурт | GG Solutions
 */
(function () {
  'use strict';

  /* ── Nav scroll glass ──────────────────────── */
  function initNav() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile menu ───────────────────────────── */
  function initMobileMenu() {
    const btn  = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('hamburger-icon');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      if (icon) icon.innerHTML = open
        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>'
        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ── Intersection reveal ───────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
  }

  /* ── Smooth scroll anchors ─────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      });
    });
  }

  /* ── Animated counters ─────────────────────── */
  function animateCounter(el, target, duration = 1800) {
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function initCounters() {
    const els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCounter(e.target, parseInt(e.target.dataset.count, 10)); obs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    els.forEach(el => obs.observe(el));
  }

  /* ── Active nav link ───────────────────────── */
  function initActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-links a, .dropdown-menu a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href && path.endsWith(href)) a.classList.add('active');
    });
  }

  /* ── Init ──────────────────────────────────── */
  function init() {
    initNav(); initMobileMenu(); initReveal();
    initSmoothScroll(); initCounters(); initActiveNav();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();