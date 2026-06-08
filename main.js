/**
 * main.js — Elisabeth Sri Rezeki Malau Portfolio
 * Handles: asset injection, dynamic content, animations,
 *          navbar scroll behaviour, active-link tracking
 */

/* ═══════════════════════════════════════════════════
   1. DATA DEFINITIONS
═══════════════════════════════════════════════════ */
const SKILLS_DATA = [
  { name: 'HTML',       assetKey: 'skill1' },
  { name: 'CSS',        assetKey: 'skill2' },
  { name: 'Javascript', assetKey: 'skill3' },
  { name: 'Java',       assetKey: 'skill4' },
  { name: 'Canva',      assetKey: 'skill5' },
  { name: 'Figma',      assetKey: 'skill6' },
];

const PROJECTS_DATA = [
  {
    title:    'CafeinAja',
    assetKey: 'project1',
    desc:     '<strong>CafeinAja</strong> adalah website frontend untuk sebuah kafe yang menyediakan fitur booking tempat, pemilihan menu, dan pembayaran online. Website ini dibuat dengan konsep desain cozy dan modern untuk memberikan pengalaman pengguna yang nyaman dan interaktif.',
    tags:     ['html', 'css', 'js', 'figma'],
  },
  {
    title:    'Portofolio',
    assetKey: 'project2',
    desc:     '<strong>Website portofolio</strong> pribadi yang dikembangkan sebagai media untuk menampilkan proyek, keterampilan, dan pengalaman secara profesional dalam satu platform digital.',
    tags:     ['html', 'css', 'js', 'figma'],
  },
  {
    title:    'Kalkulator',
    assetKey: 'project3',
    desc:     '<strong>Aplikasi kalkulator</strong> berbasis Java GUI yang dikembangkan untuk mendukung pembelajaran konsep pemrograman berorientasi objek (Object-Oriented Programming/OOP) dengan antarmuka interaktif, fitur perhitungan yang fungsional, serta tampilan yang mudah digunakan.',
    tags:     ['java'],
  },
  {
    title:    'Desain',
    assetKey: 'project4',
    desc:     '<strong>Kumpulan desain</strong> poster digital yang dibuat untuk mendukung berbagai kegiatan organisasi, termasuk afiliasi media sosial, menggunakan Canva dan Figma sebagai alat desain utama.',
    tags:     ['figma', 'canva'],
  },
];

// Tag label → CSS modifier map
const TAG_CLASS = {
  html:  'tag--html',
  css:   'tag--css',
  js:    'tag--js',
  figma: 'tag--figma',
  java:  'tag--java',
  canva: 'tag--canva',
};
const TAG_LABEL = {
  html:  'Html',
  css:   'CSS',
  js:    'Javascript',
  figma: 'Figma',
  java:  'Java',
  canva: 'Canva',
};


/* ═══════════════════════════════════════════════════
   2. DOM READY
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  injectImages();
  buildSkillCards();
  buildProjectCards();
  setupNavbar();
  setupScrollAnimations();
  setupHamburger();
  setupTouchHover(); // ← tambahan baru
});


/* ═══════════════════════════════════════════════════
   3. IMAGE INJECTION
═══════════════════════════════════════════════════ */
function injectImages() {
  if (typeof ASSETS === 'undefined') {
    console.warn('assets.js not loaded — images will be missing.');
    return;
  }

  const heroPhoto = document.getElementById('heroPhoto');
  if (heroPhoto && ASSETS.profile) heroPhoto.src = ASSETS.profile;

  const aboutPhoto = document.getElementById('aboutPhoto');
  if (aboutPhoto && ASSETS.profile) aboutPhoto.src = ASSETS.profile;

  const githubIcon = document.getElementById('githubIcon');
  if (githubIcon && ASSETS.github) githubIcon.src = ASSETS.github;
}


/* ═══════════════════════════════════════════════════
   4. BUILD SKILL CARDS
═══════════════════════════════════════════════════ */
function buildSkillCards() {
  const grid = document.getElementById('skillsGrid');
  if (!grid) return;

  SKILLS_DATA.forEach((skill, index) => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.style.transitionDelay = `${index * 80}ms`;

    const img = document.createElement('img');
    img.className = 'skill-icon';
    img.alt = skill.name;
    if (typeof ASSETS !== 'undefined' && ASSETS[skill.assetKey]) {
      img.src = ASSETS[skill.assetKey];
    }

    const label = document.createElement('span');
    label.className = 'skill-name';
    label.textContent = skill.name;

    card.appendChild(img);
    card.appendChild(label);
    grid.appendChild(card);
  });
}


/* ═══════════════════════════════════════════════════
   5. BUILD PROJECT CARDS
═══════════════════════════════════════════════════ */
function buildProjectCards() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  PROJECTS_DATA.forEach((proj, index) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.transitionDelay = `${index * 100}ms`;

    const thumbDiv = document.createElement('div');
    thumbDiv.className = 'project-thumb';

    const img = document.createElement('img');
    img.alt = proj.title;
    img.loading = 'lazy';
    if (typeof ASSETS !== 'undefined' && ASSETS[proj.assetKey]) {
      img.src = ASSETS[proj.assetKey];
    }

    const overlay = document.createElement('div');
    overlay.className = 'project-thumb-overlay';

    const overlayTitle = document.createElement('span');
    overlayTitle.className = 'project-thumb-title';
    overlayTitle.textContent = proj.title;

    overlay.appendChild(overlayTitle);
    thumbDiv.appendChild(img);
    thumbDiv.appendChild(overlay);

    const body = document.createElement('div');
    body.className = 'project-body';

    const desc = document.createElement('p');
    desc.className = 'project-desc';
    desc.innerHTML = proj.desc;

    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'project-tags';
    proj.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = `tag ${TAG_CLASS[tag] || ''}`;
      span.textContent = TAG_LABEL[tag] || tag;
      tagsDiv.appendChild(span);
    });

    body.appendChild(desc);
    body.appendChild(tagsDiv);

    card.appendChild(thumbDiv);
    card.appendChild(body);
    grid.appendChild(card);
  });
}


/* ═══════════════════════════════════════════════════
   6. NAVBAR — scroll shadow + active link
═══════════════════════════════════════════════════ */
function setupNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = 'hero';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 90) current = id;
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const mobileMenu = document.getElementById('mobileMenu');
      const hamburger  = document.getElementById('hamburger');
      if (mobileMenu) mobileMenu.classList.remove('open');
      if (hamburger)  hamburger.classList.remove('open');
    });
  });
}


/* ═══════════════════════════════════════════════════
   7. SCROLL ANIMATIONS — Intersection Observer
═══════════════════════════════════════════════════ */
function setupScrollAnimations() {
  const options = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (!entry.target.classList.contains('skill-card') &&
            !entry.target.classList.contains('project-card')) {
          observer.unobserve(entry.target);
        }
      }
    });
  }, options);

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  requestAnimationFrame(() => {
    document.querySelectorAll('.skill-card, .project-card').forEach(el => {
      observer.observe(el);
    });
  });
}


/* ═══════════════════════════════════════════════════
   8. HAMBURGER MENU TOGGLE
═══════════════════════════════════════════════════ */
function setupHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
  });
}


/* ═══════════════════════════════════════════════════
   9. TOUCH HOVER — untuk mobile (Kalkulator & Desain)
═══════════════════════════════════════════════════ */
function setupTouchHover() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    const overlay = card.querySelector('.hover-overlay');
    if (!overlay) return; // skip CafeinAja & Portofolio

    card.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      const isActive = overlay.classList.contains('touch-active');

      // Tutup semua overlay dulu
      document.querySelectorAll('.hover-overlay.touch-active').forEach(el => {
        el.classList.remove('touch-active');
      });

      // Toggle: jika belum aktif buka, jika sudah aktif tutup
      if (!isActive) {
        overlay.classList.add('touch-active');
      }
    }, { passive: true });
  });

  // Sentuh di luar card = tutup semua
  document.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.project-card')) {
      document.querySelectorAll('.hover-overlay.touch-active').forEach(el => {
        el.classList.remove('touch-active');
      });
    }
  }, { passive: true });
}
