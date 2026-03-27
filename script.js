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

  // ─── Form handling — Beehiiv via serverless API ─
  window.handleForm = function (e, source) {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector('.email-input');
    const email = input.value.trim();

    if (!email) return;

    // Send to Beehiiv via our Vercel serverless function
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(() => {});

    // Show success + Tally link
    form.outerHTML = `
      <div class="form-success">
        <p>You're in.</p>
        <p class="form-success-sub">We'll email you when Cohort #1 opens.</p>
        <button class="btn-primary tally-btn" onclick="openTally()" style="margin-top:16px">
          <span class="btn-text">Help us find your partner</span>
          <span class="btn-arrow">→</span>
        </button>
      </div>
    `;
  };

  // ─── Tally popup ──────────────────────────────
  window.openTally = function () {
    if (typeof Tally !== 'undefined' && Tally.openPopup) {
      Tally.openPopup('81G5e5', {
        width: 500,
        emoji: { text: '🤝', animation: 'wave' },
        hiddenFields: { source: 'landing' }
      });
    } else {
      window.open('https://tally.so/r/81G5e5', '_blank');
    }
  };

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
