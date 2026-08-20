/* ============================================
   ANIMATIONS.JS — GSAP Text & Scroll Animations
   Stackly AI Analytics
   Uses GSAP + ScrollTrigger from CDN
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Wait for GSAP to be available
  if (typeof gsap === 'undefined') return;

  // Register ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------- Hero Text Animations ---------- */
  const heroH1 = document.querySelector('.hero h1');
  const heroText = document.querySelector('.hero-text');
  const heroBtns = document.querySelector('.hero-btns');
  const heroBadge = document.querySelector('.hero-badge');
  const heroVisual = document.querySelector('.hero-visual');
  const heroTrusted = document.querySelector('.hero-trusted');

  if (heroH1) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });

    tl.from(heroBadge, { y: 20, opacity: 0, duration: 0.6 }, 0.2)
      .from(heroH1, { y: 50, opacity: 0, duration: 1 }, 0.35)
      .from(heroText, { y: 30, opacity: 0 }, 0.6)
      .from(heroBtns, { y: 25, opacity: 0 }, 0.75)
      .from(heroTrusted, { y: 20, opacity: 0 }, 0.9);

    if (heroVisual) {
      tl.from(heroVisual, { x: 60, opacity: 0, duration: 1.1 }, 0.5);
    }
  }

  /* ---------- Page Hero Text Animation ---------- */
  const pageHeroH1 = document.querySelector('.page-hero h1');
  const pageHeroP = document.querySelector('.page-hero p');
  const pageHeroLabel = document.querySelector('.page-hero .section-label');

  if (pageHeroH1) {
    const ptl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
    if (pageHeroLabel) ptl.from(pageHeroLabel, { y: 20, opacity: 0, duration: 0.5 }, 0.2);
    ptl.from(pageHeroH1, { y: 40, opacity: 0 }, 0.35)
       .from(pageHeroP, { y: 20, opacity: 0 }, 0.55);
  }

  /* ---------- Section Title Animations ---------- */
  document.querySelectorAll('.section-title').forEach(title => {
    gsap.fromTo(title, 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }
    );
  });

  /* ---------- Stagger Card Animations ---------- */
  document.querySelectorAll('.stagger-children').forEach(container => {
    const children = Array.from(container.children);
    if (children.length === 0) return;

    gsap.fromTo(children, 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out'
      }
    );
  });

  /* ---------- Stats Counter Animation ---------- */
  document.querySelectorAll('.stats-grid').forEach(grid => {
    gsap.fromTo(grid.children, 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      }
    );
  });

  /* ---------- Split Section Animations ---------- */
  document.querySelectorAll('.split-grid').forEach(grid => {
    const left = grid.querySelector('.split-content, .reveal-left, :first-child');
    const right = grid.querySelector('.split-image, .reveal-right, :last-child');

    if (left) {
      gsap.fromTo(left, 
        { x: -40, opacity: 0 },
        {
          scrollTrigger: { trigger: grid, start: 'top 80%' },
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out'
        }
      );
    }
    if (right) {
      gsap.fromTo(right, 
        { x: 40, opacity: 0 },
        {
          scrollTrigger: { trigger: grid, start: 'top 80%' },
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.15
        }
      );
    }
  });

  /* ---------- Metrics Pill Counter ---------- */
  document.querySelectorAll('.metric-pill .val').forEach(el => {
    const text = el.textContent;
    const numMatch = text.match(/[\d,.]+/);
    if (!numMatch) return;

    const target = parseFloat(numMatch[0].replace(/,/g, ''));
    const prefix = text.substring(0, text.indexOf(numMatch[0]));
    const suffix = text.substring(text.indexOf(numMatch[0]) + numMatch[0].length);

    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      textContent: 0,
      duration: 2,
      ease: 'power2.out',
      snap: { textContent: 1 },
      onUpdate: function() {
        const val = Math.floor(parseFloat(el.textContent));
        el.textContent = prefix + val.toLocaleString() + suffix;
      }
    });
  });

  /* ---------- Floating Card Parallax ---------- */
  document.querySelectorAll('.hero-float-card').forEach(card => {
    gsap.to(card, {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });

  /* ---------- CTA Section Subtle Parallax ---------- */
  const cta = document.querySelector('.cta-section');
  if (cta) {
    gsap.to(cta.querySelector('::before') || cta, {
      scrollTrigger: {
        trigger: cta,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      backgroundPosition: '50% 30%',
      ease: 'none'
    });
  }

  /* ---------- Standalone Reveal Animations ---------- */
  document.querySelectorAll('.reveal:not(.stagger-children .reveal)').forEach(el => {
    gsap.fromTo(el, 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
      }
    );
  });

  document.querySelectorAll('.reveal-left').forEach(el => {
    gsap.fromTo(el, 
      { x: -50, opacity: 0 },
      {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
      }
    );
  });

  document.querySelectorAll('.reveal-right').forEach(el => {
    gsap.fromTo(el, 
      { x: 50, opacity: 0 },
      {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        x: 0, opacity: 1, duration: 0.8, ease: 'power3.out'
      }
    );
  });
});
