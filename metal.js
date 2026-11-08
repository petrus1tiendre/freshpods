// Liquid-metal buttons, after jolyui's "Liquid Metal Button" (MIT): a WebGL liquid-metal
// shader fills the pill, a dark core sits 2px inside it, so the metal reads as a living rim.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const targets = [...document.querySelectorAll('.pill--primary, .top .pill--small')];

function dress(btn) {
  if (btn.dataset.metal) return;
  btn.dataset.metal = '1';
  btn.classList.add('is-metal');
  const label = document.createElement('span');
  label.className = 'pill__label';
  while (btn.firstChild) label.appendChild(btn.firstChild);
  const shader = document.createElement('span');
  shader.className = 'metal';
  shader.setAttribute('aria-hidden', 'true');
  const core = document.createElement('span');
  core.className = 'metal__core';
  core.setAttribute('aria-hidden', 'true');
  btn.append(shader, core, label);
  return shader;
}

const hosts = targets.map(dress).filter(Boolean);

if (!reduce && hosts.length) {
  try {
    const { ShaderMount, liquidMetalFragmentShader } = await import('https://cdn.jsdelivr.net/npm/@paper-design/shaders@0.0.82/+esm');
    const mounts = new Map();
    const mount = (host) => {
      if (mounts.has(host) || host.offsetWidth === 0) return;
      const m = new ShaderMount(host, liquidMetalFragmentShader, {
        u_repetition: 4, u_softness: 0.5, u_shiftRed: 0.3, u_shiftBlue: 0.3,
        u_distortion: 0, u_contour: 0, u_angle: 45, u_scale: 8, u_shape: 1,
        u_offsetX: 0.1, u_offsetY: -0.1,
      }, undefined, 0.6);
      mounts.set(host, m);
      const btn = host.parentElement;
      btn.addEventListener('pointerenter', () => m.setSpeed?.(1));
      btn.addEventListener('pointerleave', () => m.setSpeed?.(0.6));
      btn.addEventListener('click', (e) => {
        m.setSpeed?.(2.4);
        setTimeout(() => m.setSpeed?.(btn.matches(':hover') ? 1 : 0.6), 300);
        const r = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'metal__ripple';
        ripple.style.left = (e.clientX - r.left) + 'px';
        ripple.style.top = (e.clientY - r.top) + 'px';
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
      });
    };
    // Mount only what is on screen; the slider's hidden CTAs mount when their step shows.
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) mount(en.target); });
    }, { rootMargin: '20% 0px' });
    hosts.forEach((h) => io.observe(h));
    // Hidden-then-shown elements (visibility toggles) re-check on scroll.
    window.addEventListener('scroll', () => hosts.forEach((h) => { if (!mounts.has(h) && h.offsetWidth) mount(h); }), { passive: true });
  } catch (err) {
    document.documentElement.classList.add('metal-fallback');
  }
} else {
  document.documentElement.classList.add('metal-fallback');
}
