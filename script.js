/* ═══════════════════════════════════════════════════
   30Days — script.js
   Minimal vanilla JS: reveals, counters, FAQ, forms
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Scroll-triggered reveal ───────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // ─── Nav background on scroll ──────────────────
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 60);
    lastScroll = y;
  }, { passive: true });

  // ─── Count-up animation ────────────────────────
  const countUpObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countUpObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.count-up').forEach((el) => {
    countUpObserver.observe(el);
  });

  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  // ─── Live page-time counter ────────────────────
  const pageSecondsEl = document.getElementById('page-seconds');
  let pageSeconds = 0;

  if (pageSecondsEl) {
    setInterval(() => {
      pageSeconds++;
      pageSecondsEl.textContent = pageSeconds;
    }, 1000);
  }

  // ─── FAQ accordion ─────────────────────────────
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');

      // Close all others
      document.querySelectorAll('.faq-item.open').forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // ─── Form handling ─────────────────────────────
  // For now, forms show a success state locally.
  // Replace with Tally.so or Beehiiv integration later.

  window.handleForm = function (e, source) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('.email-input').value;

    if (!email) return;

    // Store locally (temporary — replace with real backend)
    const stored = JSON.parse(localStorage.getItem('30days_signups') || '[]');
    if (!stored.includes(email)) {
      stored.push(email);
      localStorage.setItem('30days_signups', JSON.stringify(stored));
    }

    // Show success
    const parent = form.parentElement;
    const successHTML = `
      <div class="form-success">
        <p>You're in.</p>
        <p class="form-success-sub">We'll email you when Cohort #1 opens. Check your inbox.</p>
      </div>
    `;

    form.outerHTML = successHTML;

    // Update counters
    updateSignupCount();
  };

  function updateSignupCount() {
    const stored = JSON.parse(localStorage.getItem('30days_signups') || '[]');
    const count = stored.length;

    const counterEl = document.querySelector('#hero-count .accent');
    if (counterEl) counterEl.textContent = count;
  }

  // Init counter on load
  updateSignupCount();

  // ─── Smooth scroll for anchor links ────────────
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
