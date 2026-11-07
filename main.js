// FreshPads — scroll-driven hero, before/after slider, booking form.

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const remap = (v, a, b) => clamp((v - a) / (b - a), 0, 1);
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  /* ---------- hero: porthole grows, cushions get clean ---------- */
  const hero = document.getElementById('hero');
  const slot = document.getElementById('hero-slot');
  const porthole = document.getElementById('porthole');

  if (hero && slot && porthole && !reduceMotion) {
    const pin = hero.querySelector('.hero__pin');

    // Measure where the porthole sits at rest (the slot keeps the place in the flow).
    function measure() {
      const pinRect = pin.getBoundingClientRect();
      const slotRect = slot.getBoundingClientRect();
      // Cushion-shaped box that follows the slot: wide on desktop, upright on phones.
      const aspect = clamp(slotRect.width / slotRect.height, 0.84, 1.18);
      const h = Math.min(slotRect.height, slotRect.width / aspect);
      const w = h * aspect;
      const t = slotRect.top - pinRect.top + (slotRect.height - h) / 2;
      porthole.style.setProperty('--w0', w + 'px');
      porthole.style.setProperty('--h0', h + 'px');
      porthole.style.setProperty('--t0', t + 'px');
      // End state: full height; full width only where the viewport is as tall as the photo,
      // otherwise a tall panel (the photos are portrait, a landscape full-bleed would crop the cushions).
      const vw = window.innerWidth, vh = window.innerHeight;
      const w1 = Math.min(vw, vh * 0.82);
      porthole.style.setProperty('--w1', w1 + 'px');
      porthole.style.setProperty('--h1', vh + 'px');
      porthole.style.setProperty('--r1', (w1 < vw ? 28 : 0) + 'px');
    }

    // ?p=0.6 freezes the hero at that progress (used for screenshots and review).
    const forced = parseFloat(new URLSearchParams(location.search).get('p'));
    let ticking = false;
    function update() {
      ticking = false;
      const rect = hero.getBoundingClientRect();
      const total = hero.offsetHeight - window.innerHeight;
      const p = Number.isFinite(forced) ? clamp(forced, 0, 1) : clamp(-rect.top / total, 0, 1);

      const pT = easeOut(remap(p, 0, 0.2));        // title + CTA fade
      const pS = easeInOut(remap(p, 0.02, 0.5));   // porthole grows to full screen
      const pC = easeInOut(remap(p, 0.3, 0.92));   // clean spreads

      hero.style.setProperty('--pT', pT.toFixed(4));
      hero.style.setProperty('--pS', pS.toFixed(4));
      hero.style.setProperty('--pC', pC.toFixed(4));
      hero.classList.toggle('is-after', pC > 0.55);
      hero.classList.toggle('is-scrolled', pT > 0.6);
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { measure(); update(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); update(); });
  }

  /* ---------- header: section links once the hero is behind ---------- */
  const body = document.body;
  const heroEl = document.getElementById('hero');
  function pastHero() {
    if (!heroEl) return;
    body.classList.toggle('is-past', window.scrollY > heroEl.offsetHeight - window.innerHeight * 0.5);
  }
  window.addEventListener('scroll', pastHero, { passive: true });
  pastHero();

  /* ---------- night mode ---------- */
  const themeBtn = document.getElementById('theme');
  if (themeBtn) {
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = () => (root.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light')) === 'dark';
    const sync = () => {
      themeBtn.setAttribute('aria-pressed', String(isDark()));
      themeBtn.setAttribute('aria-label', isDark() ? 'Activer le mode jour' : 'Activer le mode nuit');
    };
    themeBtn.addEventListener('click', () => {
      const next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('fp-theme', next); } catch (e) { /* private mode */ }
      sync();
    });
    systemDark.addEventListener('change', sync);
    sync();
  }

  /* ---------- reveals, word-by-word statement, count-ups ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
        en.target.querySelectorAll('[data-count]').forEach(countUp);
        if (en.target.hasAttribute('data-count')) countUp(en.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

    function countUp(el) {
      if (el.dataset.done) return;
      el.dataset.done = '1';
      const end = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const t0 = performance.now();
      const dur = 1100;
      const tick = (now) => {
        const k = easeOut(clamp((now - t0) / dur, 0, 1));
        el.textContent = Math.round(end * k) + suffix;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    // The statement lights up word by word as it crosses the viewport.
    const band = document.querySelector('.band__text');
    if (band) {
      const wrap = (node) => {
        node.childNodes.forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
              const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.appendChild(s);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1) wrap(n);
        });
      };
      wrap(band);
      const words = band.querySelectorAll('.w');
      const lightWords = () => {
        const r = band.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = clamp((vh * 0.85 - r.top) / (vh * 0.55), 0, 1);
        const n = Math.round(p * words.length);
        words.forEach((w, i) => w.classList.toggle('is-on', i < n));
      };
      window.addEventListener('scroll', lightWords, { passive: true });
      lightWords();
    }
  } else {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- before / after slider ---------- */
  const compare = document.getElementById('compare');
  if (compare) {
    const range = compare.querySelector('input[type="range"]');
    const setX = (v) => {
      const x = clamp(v, 0, 100);
      compare.style.setProperty('--x', x + '%');
      if (range.value !== String(x)) range.value = x;
    };
    range.addEventListener('input', () => setX(parseFloat(range.value)));

    // Pointer drag anywhere on the image (the range input stays for keyboard and screen readers).
    let dragging = false;
    const fromEvent = (e) => {
      const r = compare.getBoundingClientRect();
      return ((e.clientX - r.left) / r.width) * 100;
    };
    compare.addEventListener('pointerdown', (e) => {
      dragging = true;
      compare.setPointerCapture(e.pointerId);
      setX(fromEvent(e));
    });
    compare.addEventListener('pointermove', (e) => { if (dragging) setX(fromEvent(e)); });
    const stop = () => { dragging = false; };
    compare.addEventListener('pointerup', stop);
    compare.addEventListener('pointercancel', stop);
    setX(50);
  }

  /* ---------- booking form ---------- */
  const form = document.getElementById('form');
  const done = document.getElementById('form-done');
  if (form && done) {
    const to = 'bonjour@freshpads.ca'; // TODO: placeholder, replace with the real address before publishing
    const fields = {
      name: form.querySelector('#f-name'),
      contact: form.querySelector('#f-contact'),
      model: form.querySelector('#f-model'),
      message: form.querySelector('#f-msg'),
    };
    const validate = () => {
      let ok = true;
      ['name', 'contact'].forEach((key) => {
        const input = fields[key];
        const field = input.closest('.field');
        const error = field.querySelector('.field__error');
        const valid = input.value.trim().length > 1;
        field.classList.toggle('is-invalid', !valid);
        error.hidden = valid;
        input.setAttribute('aria-invalid', String(!valid));
        if (!valid && ok) { input.focus(); ok = false; }
      });
      return ok;
    };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;
      const subject = `Demande de remise à neuf — ${fields.name.value.trim()}`;
      const body = [
        `Prénom : ${fields.name.value.trim()}`,
        `Contact : ${fields.contact.value.trim()}`,
        `Casque : ${fields.model.value}`,
        fields.message.value.trim() ? `Message : ${fields.message.value.trim()}` : null,
        '',
        'Envoyé depuis freshpads.ca',
      ].filter(Boolean).join('\n');
      const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      form.querySelector('.form__submit').classList.add('is-sending');
      window.location.href = href;
      setTimeout(() => {
        form.hidden = true;
        done.hidden = false;
        done.querySelector('h3').focus?.();
      }, 600);
    });
  }
})();
