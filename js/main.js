/* =====================================================
   PORTFOLIO - THOMAS LE GOFF
   Main JavaScript
   ===================================================== */

// ─── ADMIN PASSWORD (hashed with btoa, change as needed) ───
const ADMIN_HASH = btoa('TLG@admin2025'); // base64, not secure but simple

// ─── STATE ────────────────────────────────────────────
const PROJECTS_VERSION = 3;
let projects = JSON.parse(localStorage.getItem('tlg_projects') || 'null') || getDefaultProjects();
if (localStorage.getItem('tlg_projects_version') !== String(PROJECTS_VERSION)) {
  projects = getDefaultProjects();
  localStorage.setItem('tlg_projects', JSON.stringify(projects));
  localStorage.setItem('tlg_projects_version', String(PROJECTS_VERSION));
}
let isAdmin = false;
let editingProjectId = null;

// ─── INIT ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCanvas();
  initCursor();
  initNav();
  renderProjects();
  initSkillBars();
  initContactForm();
  initAdmin();
  const pageFromHash = location.hash.replace('#', '');
  const validPages = ['home', 'about', 'projects', 'skills', 'contact'];
  navigateTo(validPages.includes(pageFromHash) ? pageFromHash : 'home');
});

// ─── DEFAULT PROJECTS ─────────────────────────────────
function getDefaultProjects() {
  return [
    {
      id: 'p1',
      num: '01',
      emoji: '🎮',
      title: 'Sokoban en C — SAÉ 1.01',
      desc: "Implémentation complète d'un jeu de puzzle Sokoban en C (mode terminal). Gestion des déplacements, détection de conditions de victoire et persistance des parties. Projet réalisé en autonomie avec structuration du code et résolution de problèmes. SAÉ S1.01 — IUT Lannion.",
      tags: ['C', 'Algorithmique', 'SAÉ S1.01'],
      category: 'c',
      github: 'https://github.com/thomaslgff/iut/blob/main/sokoban/main',
      link: '',
      image: null
    },
    {
      id: 'p2',
      num: '02',
      emoji: '🧩',
      title: 'Sokoban Optimisé — SAÉ 1.02',
      desc: "Version améliorée du jeu Sokoban en C axée sur l'optimisation algorithmique. Détection et suppression de séquences de déplacements inutiles, sélection de structures de données adaptées, analyse de la complexité. SAÉ S1.02 — IUT Lannion.",
      tags: ['C', 'Algorithmique', 'Optimisation', 'SAÉ S1.02'],
      category: 'c',
      github: 'https://github.com/thomaslgff/SAE1.02/blob/main/sokoban/main',
      link: '',
      image: null
    },
    {
      id: 'p3',
      num: '03',
      emoji: '🌍',
      title: 'Site Touristique Portugal — SAÉ 1.05',
      desc: "Conception et réalisation d'un site web touristique dédié au Portugal. Inclut arborescence, charte graphique, maquettage et développement responsive en HTML/CSS. Projet réalisé en collaboration. SAÉ 1.05 — IUT Lannion.",
      tags: ['HTML', 'CSS', 'Web Design', 'SAÉ 1.05'],
      category: 'web',
      github: 'https://github.com/Saynex228/site-portugal-tourism',
      link: '',
      image: null
    },
    {
      id: 'p4',
      num: '04',
      emoji: '⚡',
      title: 'Comparateur d\'Électricité - SAE 1.04',
      desc: "Modélisation d'une base de données pour un comparateur d'offres tarifaires d'électricité. Diagramme de classe UML, modèle relationnel en Tutorial D, gestion des créneaux HC/HP et des contrats. SAÉ 1.04 — IUT Lannion.",
      tags: ['Tutorial D', 'UML', 'SQL', 'BDD', 'SAÉ 1.04'],
      category: 'bdd',
      github: '',
      link: 'assets/projet-base-de-donnees-complet.zip',
      image: null
    },
    {
      id: 'p5',
      num: '05',
      emoji: '🐳',
      title: 'Chaîne de Traitement Docker - SAE 1.03',
      desc: "Automatisation d'une chaîne de traitement de fichiers (images, CSV, textes) pour un site Web via Docker, Bash et PHP CLI. Conversion d'images WebP, génération de PDFs avec WeasyPrint, intégration de filtres Unix. SAÉ 1.03.",
      tags: ['Docker', 'Bash', 'PHP', 'Linux', 'SAÉ 1.03'],
      category: 'sys',
      github: '',
      link: 'assets/projet-docker-complet.zip',
      image: null
    },
    {
      id: 'p6',
      num: '06',
      emoji: '🤝',
      title: 'Analyse de Google — SAÉ 1.06',
      desc: "Étude approfondie de l'environnement économique et écologique de Google en groupe de 4. Tableau de caractéristiques (finalité, forme juridique, ressources, performances), diagnostic externe PESTEL avec opportunités et menaces. SAÉ 1.06 — IUT Lannion.",
      tags: ['Travail d\'équipe', 'Économie', 'Analyse PESTEL', 'SAÉ 1.06'],
      category: 'other',
      github: '',
      link: 'dossier__LeGoff_Vallet_Buanic_About.pdf',
      image: null
    }
  ];
}

// ─── CANVAS BACKGROUND ────────────────────────────────
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h, particles = [], lines = [];
  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  // Particles
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * 2000,
      y: Math.random() * 2000,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.4 + 0.1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    // Grid
    ctx.strokeStyle = 'rgba(0,229,255,0.03)';
    ctx.lineWidth = 1;
    const gs = 80;
    for (let x = 0; x < w; x += gs) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += gs) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    // Particles & connections
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,229,255,${p.opacity})`;
      ctx.fill();
    });
    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,229,255,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ─── CURSOR ───────────────────────────────────────────
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();
}

// ─── NAVIGATION ───────────────────────────────────────
function initNav() {
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  });
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }
}

function navigateTo(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });
  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add('active');
    window.scrollTo(0, 0);
    // Trigger skill bars if skills page
    if (pageId === 'skills') {
      setTimeout(() => animateSkillBars(), 300);
    }
  }
  // Close mobile nav
  document.querySelector('.nav-links')?.classList.remove('open');
  document.querySelector('.hamburger')?.classList.remove('open');
}

// ─── PROJECTS ─────────────────────────────────────────
let activeFilter = 'all';

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);

  grid.innerHTML = filtered.map(p => `
    <article class="project-card animate-in" data-id="${p.id}">
      <div class="project-admin-btns">
        <button class="project-edit-btn" onclick="openEditProject('${p.id}')" title="Modifier">✏️</button>
        <button class="project-delete-btn" onclick="deleteProject('${p.id}')" title="Supprimer">🗑️</button>
      </div>
      <div class="project-image" style="background: ${getCategoryGradient(p.category)}">
        ${p.image ? `<img src="${p.image}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;">` : `<span style="font-size:3.5rem">${p.emoji || '💻'}</span>`}
        <div class="project-image-overlay">
          ${p.github ? `<a href="${p.github}" target="_blank" class="btn btn-outline btn-sm" onclick="event.stopPropagation()">GitHub</a>` : ''}
          ${p.link ? `<a href="${p.link}" target="_blank" class="btn btn-primary btn-sm" onclick="event.stopPropagation()">Voir →</a>` : ''}
        </div>
      </div>
      <div class="project-body">
        <div class="project-num">// ${p.num || String(projects.indexOf(p)+1).padStart(2,'0')}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="tag tag-${getTagColor(t)}">${t}</span>`).join('')}
        </div>
        <div class="project-links">
          ${p.github ? `<a href="${p.github}" target="_blank" class="btn btn-outline btn-sm">⬡ GitHub</a>` : ''}
          ${p.link ? `<a href="${p.link}" target="_blank" class="btn btn-primary btn-sm">Voir le projet →</a>` : ''}
          ${!p.github && !p.link ? `<span style="font-size:0.75rem;color:var(--text-muted);font-family:var(--font-mono)">// lien à venir</span>` : ''}
        </div>
      </div>
    </article>
  `).join('');

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:3rem;font-family:var(--font-mono)">// Aucun projet dans cette catégorie</div>`;
  }
}

function getCategoryGradient(cat) {
  const g = { c:'linear-gradient(135deg,#1a1f35,#0d1b2a)', java:'linear-gradient(135deg,#1a1535,#0d0a2a)', web:'linear-gradient(135deg,#0d2235,#0a1a2a)', bdd:'linear-gradient(135deg,#1a2a15,#0a1a0d)', sys:'linear-gradient(135deg,#2a1a15,#1a0d0a)', other:'linear-gradient(135deg,#1a1a1a,#0d0d0d)' };
  return g[cat] || g.c;
}
function getTagColor(t) {
  const colors = { 'C':'cyan','Java':'purple','HTML':'blue','CSS':'blue','Docker':'cyan','Bash':'green','PHP':'purple','SQL':'green','UML':'blue','Python':'cyan','Linux':'green' };
  return colors[t] || 'cyan';
}

function setFilter(cat) {
  activeFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
  renderProjects();
}

// ─── SKILLS BARS ──────────────────────────────────────
function initSkillBars() {
  // Will animate when page is shown
}
function animateSkillBars() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    const target = bar.dataset.pct;
    bar.style.width = target + '%';
  });
}

// ─── CONTACT FORM ─────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('[name=name]').value;
    const email = form.querySelector('[name=email]').value;
    const msg = form.querySelector('[name=message]').value;
    const subject = encodeURIComponent(`Message de ${name} — Portfolio`);
    const body = encodeURIComponent(`${msg}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:tlegoff31@gmail.com?subject=${subject}&body=${body}`;
    showToast('Ouverture de votre client mail…', 'success');
    form.reset();
  });
}

// ─── ADMIN ────────────────────────────────────────────
function initAdmin() {
  // nothing needed on init
}

function toggleAdmin() {
  if (isAdmin) {
    isAdmin = false;
    document.body.classList.remove('admin-mode');
    showToast('Mode admin désactivé', 'success');
  } else {
    openModal('login-modal');
  }
}

function adminLogin() {
  const pw = document.getElementById('admin-pw').value;
  if (btoa(pw) === ADMIN_HASH) {
    isAdmin = true;
    document.body.classList.add('admin-mode');
    closeModal('login-modal');
    document.getElementById('admin-pw').value = '';
    showToast('✓ Mode admin activé', 'success');
  } else {
    showToast('Mot de passe incorrect', 'error');
  }
}

function openAddProject() {
  editingProjectId = null;
  document.getElementById('proj-modal-title').textContent = '// Nouveau Projet';
  document.getElementById('project-form').reset();
  document.getElementById('proj-id').value = '';
  openModal('project-modal');
}

function openEditProject(id) {
  const p = projects.find(x => x.id === id);
  if (!p) return;
  editingProjectId = id;
  document.getElementById('proj-modal-title').textContent = '// Modifier Projet';
  document.getElementById('proj-id').value = p.id;
  document.getElementById('proj-title').value = p.title;
  document.getElementById('proj-desc').value = p.desc;
  document.getElementById('proj-tags').value = p.tags.join(', ');
  document.getElementById('proj-category').value = p.category;
  document.getElementById('proj-github').value = p.github || '';
  document.getElementById('proj-link').value = p.link || '';
  document.getElementById('proj-emoji').value = p.emoji || '';
  openModal('project-modal');
}

function saveProject() {
  const title = document.getElementById('proj-title').value.trim();
  const desc = document.getElementById('proj-desc').value.trim();
  const tags = document.getElementById('proj-tags').value.split(',').map(t=>t.trim()).filter(Boolean);
  const category = document.getElementById('proj-category').value;
  const github = document.getElementById('proj-github').value.trim();
  const link = document.getElementById('proj-link').value.trim();
  const emoji = document.getElementById('proj-emoji').value.trim() || '💻';

  if (!title || !desc) { showToast('Titre et description requis', 'error'); return; }

  // Handle image
  const imgFile = document.getElementById('proj-image').files[0];
  const processAndSave = (imageData) => {
    if (editingProjectId) {
      const idx = projects.findIndex(p => p.id === editingProjectId);
      if (idx > -1) {
        projects[idx] = { ...projects[idx], title, desc, tags, category, github, link, emoji, ...(imageData ? {image: imageData} : {}) };
      }
    } else {
      const newId = 'p' + Date.now();
      const num = String(projects.length + 1).padStart(2, '0');
      projects.push({ id: newId, num, title, desc, tags, category, github, link, emoji, image: imageData || null });
    }
    localStorage.setItem('tlg_projects', JSON.stringify(projects));
    renderProjects();
    closeModal('project-modal');
    showToast(editingProjectId ? '✓ Projet modifié' : '✓ Projet ajouté', 'success');
    editingProjectId = null;
  };

  if (imgFile) {
    const reader = new FileReader();
    reader.onload = e => processAndSave(e.target.result);
    reader.readAsDataURL(imgFile);
  } else {
    processAndSave(null);
  }
}

function deleteProject(id) {
  if (!confirm('Supprimer ce projet ?')) return;
  projects = projects.filter(p => p.id !== id);
  localStorage.setItem('tlg_projects', JSON.stringify(projects));
  renderProjects();
  showToast('Projet supprimé', 'success');
}

function resetProjects() {
  if (!confirm('Réinitialiser tous les projets aux valeurs par défaut ?')) return;
  projects = getDefaultProjects();
  localStorage.removeItem('tlg_projects');
  renderProjects();
  showToast('Projets réinitialisés', 'success');
}

// ─── MODAL HELPERS ────────────────────────────────────
function openModal(id) {
  document.getElementById(id)?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
  document.body.style.overflow = '';
}
// Close modal on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});
// Login on Enter
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('login-modal')?.classList.contains('open')) {
    adminLogin();
  }
});

// ─── TOAST ────────────────────────────────────────────
let toastTimer;
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ─── TYPING EFFECT ON HERO ────────────────────────────
function typeEffect(el, text, speed = 60) {
  if (!el) return;
  let i = 0; el.textContent = '';
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}
