/* ============================================================
   ANNEM SUHAS REDDY — PORTFOLIO SCRIPTS — UNIQUE EDITION
   Particles, cursor glow, magnetic hover, scroll progress,
   typewriter, stat counters, reveal animations
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Progress Bar
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const p = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = p + '%';
  }, { passive: true });

  // ── Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // ── Back to Top Button
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 600), { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── Mobile menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('show');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  };
  hamburger.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);
  navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => { if (navLinks.classList.contains('open')) toggleMenu(); }));

  // ── Typewriter effect
  const typewriterEl = document.getElementById('typewriter');
  const phrases = ['Full Stack Developer', 'App Developer', 'Flutter Enthusiast', 'CS Engineering Student', 'AI & ML Explorer'];
  let pi = 0, ci = 0, deleting = false, speed = 80;

  function typeWriter() {
    const cur = phrases[pi];
    if (deleting) { typewriterEl.textContent = cur.substring(0, ci - 1); ci--; speed = 35; }
    else { typewriterEl.textContent = cur.substring(0, ci + 1); ci++; speed = 70; }
    if (!deleting && ci === cur.length) { speed = 2200; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; speed = 500; }
    setTimeout(typeWriter, speed);
  }
  typeWriter();

  // ── Scroll-triggered reveal animations
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); revealObs.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  // ── Animated stat counters (uses .metric-num)
  const statNumbers = document.querySelectorAll('.metric-num[data-target]');
  let counted = false;
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !counted) {
        counted = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'));
          const steps = 40;
          let step = 0;
          const interval = setInterval(() => {
            step++;
            const progress = 1 - Math.pow(1 - step / steps, 3);
            stat.textContent = Math.round(progress * target) + '+';
            if (step >= steps) { stat.textContent = target + '+'; clearInterval(interval); }
          }, 35);
        });
        countObs.disconnect();
      }
    });
  }, { threshold: 0.4 });
  const metrics = document.querySelector('.about-metrics');
  if (metrics) countObs.observe(metrics);

  // ── Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const t = document.querySelector(this.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── Cursor Glow (Desktop)
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.innerWidth > 768) {
    let mx = 0, my = 0, gx = 0, gy = 0;
    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    (function glowLoop() {
      gx += (mx - gx) * 0.08; gy += (my - gy) * 0.08;
      cursorGlow.style.left = gx + 'px'; cursorGlow.style.top = gy + 'px';
      requestAnimationFrame(glowLoop);
    })();
  }

  // ── Magnetic Hover
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.15}px, ${(e.clientY - r.top - r.height / 2) * 0.15}px) scale(1.02)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  // ── 3D Tilt on cards
  document.querySelectorAll('.project-card, .metric-card, .journey-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -4;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 4;
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
      setTimeout(() => card.style.transition = '', 400);
    });
  });

  // ── Staggered Grid Reveal
  document.querySelectorAll('.skills-bento, .projects-bento, .achievement-grid').forEach(grid => {
    const items = grid.children;
    const gObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          Array.from(items).forEach((item, i) => {
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, i * 80);
          });
          gObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    Array.from(items).forEach(item => {
      item.style.opacity = '0'; item.style.transform = 'translateY(20px)';
      item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    });
    gObs.observe(grid);
  });

  // ── Particle System
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [], animId;
    function resizeCanvas() { const h = document.querySelector('.hero'); canvas.width = h.offsetWidth; canvas.height = h.offsetHeight; }

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5; this.opacity = Math.random() * 0.35 + 0.05;
        this.fadeSpeed = Math.random() * 0.004 + 0.002; this.growing = Math.random() > 0.5;
      }
      update() {
        this.x += this.speedX; this.y += this.speedY;
        if (this.growing) { this.opacity += this.fadeSpeed; if (this.opacity >= 0.4) this.growing = false; }
        else { this.opacity -= this.fadeSpeed; if (this.opacity <= 0.05) this.growing = true; }
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(255, 107, 43, ${this.opacity})`; ctx.fill(); }
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < 110) {
            ctx.beginPath(); ctx.strokeStyle = `rgba(255, 107, 43, ${(1 - d / 110) * 0.08})`;
            ctx.lineWidth = 0.5; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
          }
        }
      }
    }

    function init() {
      resizeCanvas();
      const count = Math.min(50, Math.floor(canvas.width * canvas.height / 18000));
      particles = []; for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); connectParticles(); animId = requestAnimationFrame(animate); }

    init(); animate();
    window.addEventListener('resize', () => { cancelAnimationFrame(animId); init(); animate(); });

    const heroEl = document.querySelector('.hero');
    new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) animate(); else cancelAnimationFrame(animId); });
    }, { threshold: 0 }).observe(heroEl);
  }

});
