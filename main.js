/* ===== VINTAGE CAR RESTORATION SHOP - MAIN JS ===== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNav();
  initScrollAnimations();
  initMobileMenu();
  initCounters();
  initAccordion();
  initDarkMode();
  initRTLToggle();
  initFormHandlers();
  initDropdowns();
  initDashboardSidebar();
  initPricingToggle();
  initCountdown();
  initBlogFilter();
});

/* ===== STICKY NAVBAR ===== */
function initStickyNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

/* ===== SCROLL ANIMATIONS (IntersectionObserver) ===== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .scale-in');
  if (!elements.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  elements.forEach(el => observer.observe(el));
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
  // Close on link click, EXCEPT for dropdown toggles
  mobileMenu.querySelectorAll('a:not(.mobile-dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
}

/* ===== NUMBER COUNTERS ===== */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-counter'));
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = Math.floor(eased * target);
    el.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ===== ACCORDION ===== */
function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      // Close all in same group
      const group = item.closest('.accordion-group');
      if (group) {
        group.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      }
      if (!isActive) item.classList.add('active');
    });
  });
}

/* ===== DARK MODE TOGGLE ===== */
function initDarkMode() {
  const toggle = document.getElementById('dark-mode-toggle');
  if (!toggle) return;
  // Check saved preference
  let savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
      savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  applyTheme(savedTheme, toggle);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next, toggle);
  });
}

function applyTheme(theme, toggle) {
  document.documentElement.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('theme', theme);
  if (toggle) updateDarkModeIcon(toggle, theme);
}

function updateDarkModeIcon(toggle, theme) {
  const icon = toggle.querySelector('i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fa-solid fa-sun';
  } else {
    icon.className = 'fa-solid fa-moon';
  }
}

/* ===== RTL/LTR TOGGLE ===== */
function initRTLToggle() {
  const toggle = document.getElementById('rtl-toggle');
  if (!toggle) return;
  const savedDir = localStorage.getItem('dir');
  if (savedDir) {
    document.documentElement.setAttribute('dir', savedDir);
  }
  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('dir') || 'ltr';
    const next = current === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', next);
    localStorage.setItem('dir', next);
    showToast(next === 'rtl' ? 'Switched to RTL layout' : 'Switched to LTR layout', 'info');
  });
}

/* ===== TOAST NOTIFICATION SYSTEM ===== */
function getToastContainer() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  return container;
}

function showToast(message, type = 'success') {
  const container = getToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
  toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ===== FORM HANDLERS (Mock Submit) ===== */
function initFormHandlers() {
  // Contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
      contactForm.reset();
    });
  }
  // Newsletter form
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Subscribed successfully! Welcome aboard.', 'success');
      form.reset();
    });
  });
  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Login successful! Redirecting...', 'success');
      setTimeout(() => { window.location.href = 'user-dashboard.html'; }, 1500);
    });
  }
  // Register form
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = registerForm.querySelector('#reg-password');
      const confirm = registerForm.querySelector('#reg-confirm');
      if (pass && confirm && pass.value !== confirm.value) {
        showToast('Passwords do not match!', 'error');
        return;
      }
      showToast('Account created successfully! Redirecting to login...', 'success');
      setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    });
  }
}

/* ===== DROPDOWN NAVIGATION ===== */
function initDropdowns() {
  // Mobile dropdown toggles
  document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggle.classList.toggle('open');
      const submenu = toggle.nextElementSibling;
      if (submenu && submenu.classList.contains('mobile-submenu')) {
        submenu.classList.toggle('active');
      }
    });
  });

  // Auto-set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
}

/* ===== DASHBOARD SIDEBAR TOGGLE ===== */
function initDashboardSidebar() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('dashboard-sidebar');
  if (!toggle || !sidebar) return;
  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

/* ===== PRICING TOGGLE (Monthly/Annual) ===== */
function initPricingToggle() {
  const toggle = document.getElementById('pricing-toggle');
  if (!toggle) return;
  toggle.addEventListener('change', () => {
    const monthlies = document.querySelectorAll('.price-monthly');
    const annuals = document.querySelectorAll('.price-annual');
    const isAnnual = toggle.checked;
    monthlies.forEach(el => el.style.display = isAnnual ? 'none' : 'block');
    annuals.forEach(el => el.style.display = isAnnual ? 'block' : 'none');
  });
}

/* ===== COUNTDOWN TIMER ===== */
function initCountdown() {
  const countdown = document.getElementById('countdown');
  if (!countdown) return;
  // Set launch date 30 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate.getTime() - now;
    if (distance < 0) {
      countdown.innerHTML = '<span class="text-accent text-2xl font-bold">We\'re Live!</span>';
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setCountdownValue('cd-days', days);
    setCountdownValue('cd-hours', hours);
    setCountdownValue('cd-minutes', minutes);
    setCountdownValue('cd-seconds', seconds);
  }
  function setCountdownValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(val).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ===== BLOG FILTER ===== */
function initBlogFilter() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const blogCards = document.querySelectorAll('[data-category]');
  if (!filterBtns.length || !blogCards.length) return;
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      blogCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ===== SMOOTH SCROLL ===== */
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const targetId = anchor.getAttribute('href');
  if (targetId === '#') return;
  const target = document.querySelector(targetId);
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  }
});
