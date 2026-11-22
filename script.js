/**
 * Kishorenath S - Portfolio Engine
 * Motion, Spotlight Physics & Interactive Mechanics
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleNetwork();
  initTypingEffect();
  initSpotlightCards();
  initTiltCards();
  initMetricCounters();
  initCustomCursor();
  initCopyButtons();
  initScrollSpy();
  initAudioFeedback();
  initMobileNav();
});

/* ==========================================================================
   1. Interactive Particle Network (Canvas)
   ========================================================================== */
function initParticleNetwork() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.8 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(99, 102, 241, ';
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 2.5;
          this.y -= Math.sin(angle) * force * 2.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.hypot(dx, dy);

        if (distance < 115) {
          const opacity = (1 - distance / 115) * 0.2;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Dynamic Professional Typing Effect (General & Balanced)
   ========================================================================== */
function initTypingEffect() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const roles = [
    '3rd Year CSE Undergraduate @ CEG Guindy',
    'Software Engineer & Problem Solver',
    'Creator of securedrop.kishorenath.me',
    'Passionate about Algorithms & Data Structures',
    'NSS General Secretary & Campus Leader'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 70;

  function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
      target.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 35;
    } else {
      target.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 70;
    }

    if (!isDeleting && charIndex === current.length) {
      typingDelay = 2400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 350;
    }

    setTimeout(type, typingDelay);
  }

  setTimeout(type, 500);
}

/* ==========================================================================
   3. Raycast / Linear Spotlight Mouse Tracker on Cards
   ========================================================================== */
function initSpotlightCards() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   4. 3D Tilt Cards with Hardware-Accelerated Glare
   ========================================================================== */
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   5. Dynamic Metric Counters (Intersection Observer)
   ========================================================================== */
function initMetricCounters() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseFloat(el.getAttribute('data-counter-target'));
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const isDecimal = targetValue % 1 !== 0;

        let start = 0;
        const duration = 1600;
        const startTime = performance.now();

        function updateCounter(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = start + (targetValue - start) * easeProgress;

          el.textContent = `${prefix}${isDecimal ? current.toFixed(2) : Math.floor(current)}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = `${prefix}${isDecimal ? targetValue.toFixed(2) : targetValue}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((c) => observer.observe(c));
}

/* ==========================================================================
   6. Custom Magnetic Cursor
   ========================================================================== */
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');
  if (!dot || !outline) return;

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderOutline() {
    outlineX += (mouseX - outlineX) * 0.16;
    outlineY += (mouseY - outlineY) * 0.16;
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    requestAnimationFrame(renderOutline);
  }
  requestAnimationFrame(renderOutline);

  const hoverTargets = document.querySelectorAll('a, button, .clickable, .pro-card');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      outline.style.width = '48px';
      outline.style.height = '48px';
      outline.style.borderColor = '#38bdf8';
      outline.style.backgroundColor = 'rgba(56, 189, 248, 0.08)';
    });
    el.addEventListener('mouseleave', () => {
      outline.style.width = '32px';
      outline.style.height = '32px';
      outline.style.borderColor = 'rgba(56, 189, 248, 0.4)';
      outline.style.backgroundColor = 'transparent';
    });
  });
}

/* ==========================================================================
   7. Copy to Clipboard with Toast Notification
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
        btn.classList.add('text-emerald-400');
        setTimeout(() => btn.classList.remove('text-emerald-400'), 1500);
      });
    });
  });

  function showToast(msg) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

/* ==========================================================================
   8. Scroll Spy & Navbar Blur
   ========================================================================== */
function initScrollSpy() {
  const nav = document.getElementById('main-navbar');
  const progressBar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    if (progressBar) progressBar.style.width = scrolled + '%';

    if (nav) {
      if (winScroll > 40) {
        nav.classList.add('py-3', 'bg-[#06080e]/85', 'backdrop-blur-md', 'shadow-2xl', 'border-b', 'border-slate-800/80');
        nav.classList.remove('py-5', 'bg-transparent');
      } else {
        nav.classList.remove('py-3', 'bg-[#06080e]/85', 'backdrop-blur-md', 'shadow-2xl', 'border-b', 'border-slate-800/80');
        nav.classList.add('py-5', 'bg-transparent');
      }
    }
  });
}

/* ==========================================================================
   9. Web Audio API Feedback (Toggleable)
   ========================================================================== */
function initAudioFeedback() {
  const audioToggle = document.getElementById('sound-toggle');
  let audioEnabled = false;
  let audioCtx = null;

  function playTone(freq, type = 'sine', duration = 0.05) {
    if (!audioEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.025, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio context restricted
    }
  }

  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      audioToggle.classList.toggle('text-sky-400', audioEnabled);
      audioToggle.classList.toggle('text-slate-400', !audioEnabled);
      if (audioEnabled) {
        playTone(580, 'triangle', 0.12);
      }
    });
  }

  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => playTone(320, 'sine', 0.03));
    el.addEventListener('click', () => playTone(520, 'triangle', 0.05));
  });
}

/* ==========================================================================
   10. Mobile Menu Toggle
   ========================================================================== */
function initMobileNav() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}
