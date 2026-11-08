// FreshPods — scroll-driven hero, before/after slider, booking form.

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const remap = (v, a, b) => clamp((v - a) / (b - a), 0, 1);
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  /* ---------- inertia scroll (Lenis): wheel and trackpad glide, touch stays native ---------- */
  if (!reduceMotion && window.Lenis) {
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true, syncTouch: false });
    window.__lenis = lenis;
    const tick = (time) => { lenis.raf(time); requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
    if (window.ScrollTrigger) lenis.on('scroll', () => window.ScrollTrigger.update());
    // In-page anchors go through Lenis so they glide too.
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -64, duration: 1.1 });
      });
    });
  }

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

      const pT = easeOut(remap(p, 0, 0.18));       // title + CTA fade
      const pS = easeInOut(remap(p, 0.02, 0.38));  // porthole grows to full screen
      const pC = easeInOut(remap(p, 0.22, 0.85));  // clean spreads

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

  /* ---------- falling light rain: thin streaks and sparks on a canvas ---------- */
  if (!reduceMotion) {
    document.querySelectorAll('canvas[data-rain]').forEach((canvas) => {
      const ctx = canvas.getContext('2d');
      const forceLight = canvas.dataset.rain === 'light';
      const darkMq = window.matchMedia('(prefers-color-scheme: dark)');
      const isDark = () => forceLight || (document.documentElement.getAttribute('data-theme') || (darkMq.matches ? 'dark' : 'light')) === 'dark';
      let w = 0, h = 0, dpr = 1, streaks = [], sparks = [], running = false, raf = 0, last = 0;

      const rnd = (a, b) => a + Math.random() * (b - a);
      const makeStreak = (fresh) => ({
        x: Math.random() * w,
        y: fresh ? -rnd(0, h) : Math.random() * h,
        len: rnd(40, 240),
        speed: rnd(90, 420),
        alpha: rnd(0.1, forceLight ? 0.55 : 0.42),
        width: Math.random() < 0.15 ? 1.5 : 1,
      });
      const makeSpark = () => ({ x: Math.random() * w, y: Math.random() * h, r: rnd(0.6, 1.6), phase: Math.random() * Math.PI * 2, speed: rnd(0.6, 1.6) });

      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = Math.max(1, rect.width); h = Math.max(1, rect.height);
        canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.round(Math.min(160, Math.max(40, w / 9)));
        streaks = Array.from({ length: count }, () => makeStreak(false));
        sparks = Array.from({ length: Math.round(count / 2) }, makeSpark);
      };

      const draw = (now) => {
        if (!running) return;
        const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
        last = now;
        ctx.clearRect(0, 0, w, h);
        const dark = isDark();
        const base = dark ? '255,255,255' : '27,29,32';
        const gain = dark ? 1 : 0.45;
        for (const s of streaks) {
          s.y += s.speed * dt;
          if (s.y - s.len > h) Object.assign(s, makeStreak(true));
          const g = ctx.createLinearGradient(0, s.y - s.len, 0, s.y);
          g.addColorStop(0, 'rgba(' + base + ',0)');
          g.addColorStop(0.85, 'rgba(' + base + ',' + (s.alpha * gain).toFixed(3) + ')');
          g.addColorStop(1, 'rgba(' + base + ',' + Math.min(1, s.alpha * gain * 1.6).toFixed(3) + ')');
          ctx.fillStyle = g;
          ctx.fillRect(s.x, s.y - s.len, s.width, s.len);
        }
        for (const p of sparks) {
          p.phase += p.speed * dt;
          const a = (0.25 + 0.75 * (0.5 + 0.5 * Math.sin(p.phase))) * (dark ? 0.9 : 0.35);
          ctx.fillStyle = 'rgba(' + base + ',' + a.toFixed(3) + ')';
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        }
        raf = requestAnimationFrame(draw);
      };
      const start = () => { if (running) return; running = true; last = performance.now(); raf = requestAnimationFrame(draw); };
      const stop = () => { running = false; cancelAnimationFrame(raf); };

      resize();
      window.addEventListener('resize', resize);
      const io = new IntersectionObserver((entries) => { entries[0].isIntersecting ? start() : stop(); }, { threshold: 0.01 });
      io.observe(canvas.parentElement);
      document.addEventListener('visibilitychange', () => { document.hidden ? stop() : (io.takeRecords(), start()); });
    });
  }

  /* ---------- turntable: frames drawn on a canvas, driven by the scroll (Apple's technique) ---------- */
  const turn = document.getElementById('tour');
  if (turn && parseInt(turn.dataset.frames, 10) > 0) {
    const count = parseInt(turn.dataset.frames, 10);
    const src = turn.dataset.src;
    const canvas = turn.querySelector('.turn__canvas');
    const ctx = canvas.getContext('2d');
    const frames = new Array(count);
    let loaded = 0, current = -1, w = 0, h = 0, dpr = 1;
    const pad = (n) => String(n).padStart(3, '0');
    const draw = (i) => {
      const img = frames[i];
      if (!img || !img.complete || !img.naturalWidth) return;
      current = i;
      // cover
      const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (current >= 0) draw(current);
    };
    const load = (i) => {
      if (frames[i]) return;
      const img = new Image();
      img.decoding = 'async';
      img.src = src.replace('{i}', pad(i + 1));
      img.onload = () => { loaded++; if (i === 0 && current < 0) draw(0); };
      frames[i] = img;
    };
    // First frame now, the rest in order once the section is near.
    load(0);
    const loadAll = () => { for (let i = 1; i < count; i++) load(i); };
    const near = new IntersectionObserver((e) => { if (e[0].isIntersecting) { loadAll(); near.disconnect(); } }, { rootMargin: '150% 0px' });
    near.observe(turn);
    const progress = () => {
      const rect = turn.getBoundingClientRect();
      const total = turn.offsetHeight - window.innerHeight;
      return reduceMotion ? 0 : clamp(-rect.top / total, 0, 1);
    };
    let tick = false;
    const update = () => {
      tick = false;
      const p = progress();
      const i = Math.min(count - 1, Math.round(p * (count - 1)));
      if (i !== current) {
        // fall back to the nearest loaded frame so the scrub never blanks
        let j = i;
        while (j > 0 && !(frames[j] && frames[j].complete && frames[j].naturalWidth)) j--;
        draw(j);
      }
      turn.style.setProperty('--tFade', easeOut(remap(p, 0.55, 0.95)).toFixed(3));
    };
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(update); } };
    resize();
    window.addEventListener('resize', () => { resize(); update(); });
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
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

  /* ---------- split step slider (ported from 21st.dev, GSAP ScrollTrigger) ---------- */
  const track = document.getElementById('sps');
  if (track && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    const root = track.querySelector('.sps-root');
    const shots = [...track.querySelectorAll('.sps-shot')];
    const blocks = [...track.querySelectorAll('.sps-block')];
    const dots = [...track.querySelectorAll('.sps-dot')];
    const n = shots.length;
    const steps = n - 1;
    let current = 0;
    let tl = null;
    let st = null;

    const mark = (to) => {
      shots.forEach((el, i) => { el.toggleAttribute('data-on', i === to); el.setAttribute('aria-hidden', String(i !== to)); });
      blocks.forEach((el, i) => {
        el.toggleAttribute('data-on', i === to); el.setAttribute('aria-hidden', String(i !== to));
        el.querySelectorAll('a, button').forEach((f) => f.setAttribute('tabindex', i === to ? '0' : '-1'));
      });
      dots.forEach((el, i) => el.setAttribute('aria-current', String(i === to)));
    };

    // Copy lifts out line by line, the next rises in; the next photo slides over the last, turned and a touch large.
    const go = (target, dir) => {
      const from = current;
      const to = clamp(target, 0, n - 1);
      if (to === from) return;
      const d = dir || (to > from ? 1 : -1);
      if (tl) tl.progress(1).kill();
      current = to;
      const oldShot = shots[from], newShot = shots[to], oldBlock = blocks[from], newBlock = blocks[to];
      const oldImg = oldShot.firstElementChild, newImg = newShot.firstElementChild;
      const oldLines = oldBlock.querySelectorAll('[data-sps-l]');
      const newLines = newBlock.querySelectorAll('[data-sps-l]');
      mark(to);
      gsap.set([oldShot, newShot, oldBlock, newBlock], { visibility: 'visible' });
      gsap.set(oldShot, { zIndex: 1 });
      gsap.set(newShot, { zIndex: 2 });
      const done = () => {
        gsap.set([oldShot, newShot, oldBlock, newBlock], { clearProps: 'visibility,zIndex' });
        gsap.set([oldShot, oldImg, newShot, newImg], { clearProps: 'transform' });
        gsap.set([oldLines, newLines], { clearProps: 'transform,opacity' });
      };
      if (reduceMotion) {
        tl = gsap.timeline({ onComplete: done });
        tl.fromTo(newShot, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'none', clearProps: 'opacity' });
        tl.fromTo(newLines, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'none' }, 0);
        tl.set(oldLines, { opacity: 0 }, 0);
        return;
      }
      tl = gsap.timeline({ onComplete: done });
      tl.to(oldLines, { y: -38 * d, opacity: 0, duration: 0.42, ease: 'power2.in', stagger: 0.045 }, 0);
      tl.fromTo(newLines, { y: 46 * d, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.07 }, 0.3);
      tl.fromTo(newShot, { yPercent: -100 * d }, { yPercent: 0, duration: 0.95, ease: 'power3.inOut' }, 0.2);
      tl.fromTo(oldShot, { yPercent: 0 }, { yPercent: 42 * d, duration: 0.95, ease: 'power3.inOut' }, 0.2);
      tl.fromTo(newImg, { rotation: -11 * d, scale: 1.34 }, { rotation: 0, scale: 1, duration: 1.35, ease: 'power2.out' }, 0.22);
      tl.to(oldImg, { rotation: 7 * d, scale: 1.12, duration: 0.95, ease: 'power2.in' }, 0.2);
    };

    if (!reduceMotion && n > 1) {
      st = ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const i = Math.round(clamp(self.progress, 0, 1) * steps);
          if (i !== current) go(i, self.direction > 0 ? 1 : -1);
        },
      });
    }
    const jump = (to, dir) => {
      const i = clamp(to, 0, n - 1);
      go(i, dir);
      if (st && st.isActive) {
        const top = st.start + (i / steps) * (st.end - st.start);
        if (window.__lenis) window.__lenis.scrollTo(top, { immediate: true }); else window.scrollTo({ top, behavior: 'instant' });
      }
      else if (!st) go(i, dir);
    };
    dots.forEach((b) => b.addEventListener('click', () => jump(parseInt(b.dataset.spsGo, 10))));
    track.querySelectorAll('[data-sps-step]').forEach((b) => b.addEventListener('click', () => {
      const d = parseInt(b.dataset.spsStep, 10);
      jump(current + d, d);
    }));
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') jump(current + 1, 1);
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') jump(current - 1, -1);
      else return;
      e.preventDefault();
    });
  }

  /* ---------- Avant / Après showcase ---------- */
  const sx = document.getElementById('showcase');
  if (sx) {
    const statusEl = sx.querySelector('[data-sx-status]');
    const labels = { avant: 'À la réception', apres: 'Remis à neuf' };
    const setState = (state) => {
      sx.dataset.state = state;
      sx.querySelectorAll('.sx__opt').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.sx === state)));
      sx.querySelectorAll('.sx__block').forEach((b) => b.classList.toggle('is-on', b.classList.contains('sx__block--' + state)));
      if (statusEl) statusEl.textContent = labels[state];
    };
    let touched = false;
    sx.querySelectorAll('.sx__opt').forEach((b) => b.addEventListener('click', () => { touched = true; setState(b.dataset.sx); }));
    setState('avant');
    // First time it comes into view, it flips to "Après" on its own, once, unless the visitor already chose.
    if ('IntersectionObserver' in window && !reduceMotion) {
      const once = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        once.disconnect();
        setTimeout(() => { if (!touched) setState('apres'); }, 1600);
      }, { threshold: 0.5 });
      once.observe(sx);
    }
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
    const to = 'bonjour@freshpods.ca'; // TODO: placeholder, replace with the real address before publishing
    const fields = {
      name: form.querySelector('#f-name'),
      contact: form.querySelector('#f-contact'),
      city: form.querySelector('#f-city'),
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
        `Ville : ${fields.city.value}`,
        `Casque : ${fields.model.value}`,
        fields.message.value.trim() ? `Message : ${fields.message.value.trim()}` : null,
        '',
        'Envoyé depuis freshpods.ca',
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
