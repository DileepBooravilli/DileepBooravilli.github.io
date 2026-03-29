/* ============================================================
   PORTFOLIO — Main JavaScript
   Scrolly-writing animations, typed title, particles, counters
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initScrollyAnimations();
  initTypedTitle();
  initNavbar();
  initScrollProgress();
  initCursorTrail();
  initMobileMenu();
  initSmoothScroll();
  initMagneticButtons();
});

/* ============================================================
   PARTICLES
   ============================================================ */
function initParticles() {
  const container = document.getElementById('particles');
  const count = 40;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 12 + 's';
    p.style.animationDuration = (8 + Math.random() * 8) + 's';
    const hue = Math.random() > 0.5 ? '260' : '185';
    p.style.background = `hsl(${hue}, 70%, 60%)`;
    p.style.width = (1 + Math.random() * 3) + 'px';
    p.style.height = p.style.width;
    container.appendChild(p);
  }
}

/* ============================================================
   SCROLLY (Intersection Observer) ANIMATIONS
   ============================================================ */
function initScrollyAnimations() {
  const elements = document.querySelectorAll('.scrolly');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay) || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   TYPED TITLE ANIMATION
   ============================================================ */
function initTypedTitle() {
  const titles = [
    'Advanced Software Engineer',
    'GenAI Framework Developer',
    'Full Stack Engineer',
    'Vision SDK Architect',
    'Cloud Solutions Expert'
  ];

  const el = document.getElementById('typed-title');
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let pauseEnd = 0;

  function type() {
    const current = titles[titleIndex];
    const now = Date.now();

    if (now < pauseEnd) {
      requestAnimationFrame(type);
      return;
    }

    if (!isDeleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        pauseEnd = now + 2000;
      }
    } else {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        pauseEnd = now + 400;
      }
    }

    const speed = isDeleting ? 40 : 70;
    setTimeout(() => requestAnimationFrame(type), speed);
  }

  // Start typing after hero section animates in
  setTimeout(type, 1200);
}

/* ============================================================
   NAVBAR (hide on scroll down, show on scroll up)
   ============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Hide/show navbar
    if (currentScroll > lastScroll && currentScroll > 300) {
      navbar.classList.add('hidden');
    } else {
      navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;

    // Active section highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (currentScroll >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = progress + '%';
  }, { passive: true });
}

/* ============================================================
   CURSOR TRAIL (subtle glow)
   ============================================================ */
function initCursorTrail() {
  const canvas = document.getElementById('cursor-canvas');
  const ctx = canvas.getContext('2d');
  let mouseX = 0, mouseY = 0;
  let trails = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    trails.push({ x: mouseX, y: mouseY, alpha: 0.55, size: 8 });
    if (trails.length > 25) trails.shift();
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trails.forEach((t, i) => {
      t.alpha -= 0.015;
      t.size -= 0.1;
      if (t.alpha > 0 && t.size > 0) {
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${t.alpha})`;
        ctx.fill();
      }
    });
    trails = trails.filter(t => t.alpha > 0 && t.size > 0);
    requestAnimationFrame(draw);
  }

  draw();
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}
