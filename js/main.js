(function(){
  'use strict';

  const root = document.documentElement;

  // -------------------------
  // Theme
  // -------------------------
  function applyTheme(theme){
    root.setAttribute('data-theme', theme);
    try{ localStorage.setItem('theme', theme); } catch(e) {}
  }

  function initTheme(){
    let theme = null;
    try{ theme = localStorage.getItem('theme'); } catch(e) {}
    if(!theme){
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'dark' : 'light';
    }
    applyTheme(theme);
  }

  initTheme();

  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  });

  // -------------------------
  // Mobile nav (works for all pages)
  // -------------------------
  document.querySelectorAll('[data-nav-toggle]').forEach(toggle => {
    const header = toggle.closest('header') || document;
    const nav = header.querySelector('[data-nav]');
    if(!nav) return;

    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // Close nav when clicking a link (mobile)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if(!a) return;

    const header = a.closest('header');
    if(!header) return;

    const nav = header.querySelector('[data-nav]');
    const toggle = header.querySelector('[data-nav-toggle]');
    if(!nav || !toggle) return;

    if(nav.classList.contains('is-open')){
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded','false');
    }
  });

  // -------------------------
  // Year in footer
  // -------------------------
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = String(y);
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = String(y));

  // -------------------------
  // Project filter (optional)
  // -------------------------
  const projectsWrap = document.querySelector('[data-projects]');
  if(projectsWrap){
    const projects = Array.from(projectsWrap.querySelectorAll('.project'));
    const buttons = Array.from(document.querySelectorAll('[data-filter]'));

    function setActive(btn){
      buttons.forEach(b => b.classList.toggle('is-active', b === btn));
      buttons.forEach(b => b.setAttribute('aria-selected', b === btn ? 'true' : 'false'));
    }

    function applyFilter(value){
      projects.forEach(p => {
        const cats = (p.getAttribute('data-category') || '').split(/\s+/).filter(Boolean);
        const show = value === 'all' ? true : cats.includes(value);
        p.style.display = show ? '' : 'none';
      });
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-filter');
        setActive(btn);
        applyFilter(value);
      });
    });
  }

  // -------------------------
  // Contact form (demo)
  // -------------------------
  const form = document.querySelector('[data-contact-form]');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = form.querySelector('[data-form-status]');
      if(status){
        status.textContent = 'Dankjewel! (Demo) Formulier is niet echt verzonden.';
      }
      form.reset();
    });
  }

})();
