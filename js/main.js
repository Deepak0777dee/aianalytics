/* ============================================
   MAIN.JS — Stackly AI Analytics
   Navigation, Mobile Menu, Scroll Reveals,
   Stat Counters, Form Validation, 404 Redirect
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Page Loader ---------- */
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 400);
    });
    // Fallback
    setTimeout(() => loader.classList.add('hidden'), 2500);
  }

  /* ---------- Header Scroll ---------- */
  const header = document.getElementById('mainHeader');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile Menu ---------- */
  const hamBtn = document.querySelector('.ham-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');
  const mobileOverlay = document.getElementById('mobile-overlay');

  function openMobile() {
    if (mobileMenu) mobileMenu.classList.add('open');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeMobile() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (hamBtn) hamBtn.addEventListener('click', openMobile);
  if (mobileClose) mobileClose.addEventListener('click', closeMobile);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobile);

  /* ---------- Scroll Reveal ---------- */
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach((el, i) => {
      el.style.setProperty('--i', i % 6);
      revealObserver.observe(el);
    });
  }

  /* ---------- Stat Counter ---------- */
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const duration = 2000;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * eased);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }
          requestAnimationFrame(update);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

  /* ---------- Dashboard: Sidebar Toggle ---------- */
  const sidebar = document.getElementById('sidebar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarClose = document.getElementById('sidebarClose');

  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
  if (sidebarClose && sidebar) {
    sidebarClose.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  }

  /* ---------- Active Sidebar Link ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

});

/* ---------- Form Validation ---------- */
function validateField(input) {
  const group = input.closest('.form-group');
  const errorDiv = group ? group.querySelector('.form-error') : null;
  let message = '';

  if (input.required && !input.value.trim()) {
    message = 'This field is required';
  } else if (input.type === 'email' && input.value.trim()) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(input.value.trim())) {
      message = 'Please enter a valid email';
    }
  } else if (input.minLength > 0 && input.value.length < input.minLength) {
    message = `Minimum ${input.minLength} characters required`;
  }

  if (errorDiv) errorDiv.textContent = message;
  if (message) {
    input.style.borderColor = 'var(--danger)';
    return false;
  } else {
    input.style.borderColor = '';
    return true;
  }
}

/* ---------- Password Toggle ---------- */
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('.password-toggle');
  if (!toggle) return;
  const wrapper = toggle.closest('.password-wrapper');
  const input = wrapper ? wrapper.querySelector('input') : null;
  if (input) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
});
