// Liquid-metal buttons: the chrome rim is drawn in CSS (conic gradient that flows round the pill);
// this script only builds the layers and adds the click ripple.
const targets = [...document.querySelectorAll('.pill--primary, .top .pill--small')];
for (const btn of targets) {
  if (btn.dataset.metal) continue;
  btn.dataset.metal = '1';
  btn.classList.add('is-metal');
  const label = document.createElement('span');
  label.className = 'pill__label';
  while (btn.firstChild) label.appendChild(btn.firstChild);
  const rim = document.createElement('span'); rim.className = 'metal'; rim.setAttribute('aria-hidden', 'true');
  const core = document.createElement('span'); core.className = 'metal__core'; core.setAttribute('aria-hidden', 'true');
  btn.append(rim, core, label);
  btn.addEventListener('click', (e) => {
    const r = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'metal__ripple';
    const fromKeyboard = e.detail === 0;
    ripple.style.left = (fromKeyboard ? r.width / 2 : e.clientX - r.left) + 'px';
    ripple.style.top = (fromKeyboard ? r.height / 2 : e.clientY - r.top) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
}
