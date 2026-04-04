/* ═══════════════════════════════════════════════
   ABHISHEK IJ PORTFOLIO — main.js
═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── DOT GRID CANVAS ─────────────────────── */
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let dots = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildDots();
  }

  function buildDots() {
    dots = [];
    const spacing = 36;
    const cols = Math.ceil(canvas.width / spacing) + 1;
    const rows = Math.ceil(canvas.height / spacing) + 1;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({ x: i * spacing, y: j * spacing });
      }
    }
  }

  function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scrollY = window.scrollY;
    dots.forEach(d => {
      const dy = d.y - (scrollY * 0.08) % 36;
      ctx.beginPath();
      ctx.arc(d.x, ((dy % canvas.height) + canvas.height) % canvas.height, 1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(100,130,200,0.22)';
      ctx.fill();
    });
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function animateDots() {
    drawDots();
    requestAnimationFrame(animateDots);
  }
  animateDots();

  /* ─── NAVBAR SCROLL ───────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }, { passive: true });

  /* ─── HAMBURGER MENU ──────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  /* ─── SCROLL REVEAL ───────────────────────── */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  revealEls.forEach(el => observer.observe(el));

  /* ─── HERO STAGGER ────────────────────────── */
  const heroEls = document.querySelectorAll('#hero .reveal-up');
  heroEls.forEach((el, i) => {
    el.style.transitionDelay = `${i * 110}ms`;
    // Trigger immediately for hero
    setTimeout(() => el.classList.add('in'), 80 + i * 110);
  });

  /* ─── CONTACT FORM ────────────────────────── */
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      const originalContent = btn.innerHTML;
      btn.innerHTML = '<span>Sending...</span>';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      setTimeout(() => {
        btn.style.display = 'none';
        successMsg.classList.add('visible');
        form.reset();
        setTimeout(() => {
          btn.style.display = '';
          btn.innerHTML = originalContent;
          btn.disabled = false;
          btn.style.opacity = '';
          successMsg.classList.remove('visible');
        }, 4000);
      }, 900);
    });
  }

  /* ─── SMOOTH NAV LINKS ────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── ACTIVE NAV HIGHLIGHT ────────────────── */
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.style.color = '';
          a.style.background = '';
          if (a.getAttribute('href') === `#${id}`) {
            a.style.color = 'var(--text)';
            a.style.background = 'var(--surface-hover)';
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => sectionObserver.observe(s));

  /* ─── CARD TILT EFFECT ────────────────────── */
  document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * 4;
      const rotY = -((x - cx) / cx) * 4;
      card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

})();
