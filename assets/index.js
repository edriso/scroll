(() => {
  const wrapper = document.getElementById('swingWrapper');
  const messageText = document.getElementById('messageText');
  const trackInner = document.querySelector('.scroll-track-inner');
  const boatSvg = document.querySelector('.swing-svg');

  const messages = [
    { min: 0,    max: 0.05, text: "Scroll to swing..." },
    { min: 0.05, max: 0.12, text: "Just a little scroll..." },
    { min: 0.12, max: 0.22, text: "The feed never ends." },
    { min: 0.22, max: 0.34, text: "Still looking for something?" },
    { min: 0.34, max: 0.48, text: "You've seen this before." },
    { min: 0.48, max: 0.65, text: "Your focus is fading." },
    { min: 0.65, max: 0.85, text: "Brain on autopilot now." },
    { min: 0.85, max: 1.10, text: "Hours gone. Nothing gained." },
    { min: 1.10, max: Infinity, text: "Put. The. Phone. Down." },
  ];

  const starsEl = document.getElementById('stars');
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width:${size}px; height:${size}px;
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      --dur:${(Math.random() * 4 + 2).toFixed(1)}s;
      --delay:${(Math.random() * 5).toFixed(1)}s;
      --peak:${(Math.random() * 0.6 + 0.2).toFixed(2)};
    `;
    starsEl.appendChild(s);
  }

  const G = 9.8;
  const L = 1.8;
  const DAMPING = 0.985;
  const MAX_ANGLE_DEG = 55;

  let angle = 0;
  let angularVelocity = 0;
  let lastMessage = '';
  let lastTime = performance.now();

  let lastTouchY = null;

  function applyImpulse(deltaMagnitude) {
    const strength = Math.min(deltaMagnitude, 200) * 0.0009;
    // Push in the direction the swing is already moving so it builds up like real pumping.
    // If nearly stopped, pick a side based on current angle (or random tiny bias).
    let dir;
    if (Math.abs(angularVelocity) > 0.05) {
      dir = Math.sign(angularVelocity);
    } else if (Math.abs(angle) > 0.01) {
      dir = -Math.sign(angle);
    } else {
      dir = 1;
    }
    angularVelocity += dir * strength;
  }

  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    applyImpulse(Math.abs(e.deltaY));
  }, { passive: false });

  window.addEventListener('touchstart', (e) => {
    if (e.touches.length > 0) lastTouchY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (e.touches.length === 0) return;
    const y = e.touches[0].clientY;
    if (lastTouchY !== null) {
      const dy = lastTouchY - y;
      applyImpulse(Math.abs(dy) * 4);
    }
    lastTouchY = y;
  }, { passive: false });

  window.addEventListener('touchend', () => { lastTouchY = null; }, { passive: true });

  const maxAngleRad = MAX_ANGLE_DEG * Math.PI / 180;

  function tick(now) {
    requestAnimationFrame(tick);
    let dt = (now - lastTime) / 1000;
    lastTime = now;
    if (dt > 0.05) dt = 0.05;

    const accel = -(G / L) * Math.sin(angle);
    angularVelocity += accel * dt;
    angularVelocity *= Math.pow(DAMPING, dt * 60);
    angle += angularVelocity * dt;

    if (angle > maxAngleRad) {
      angle = maxAngleRad;
      if (angularVelocity > 0) angularVelocity = -angularVelocity * 0.5;
    } else if (angle < -maxAngleRad) {
      angle = -maxAngleRad;
      if (angularVelocity < 0) angularVelocity = -angularVelocity * 0.5;
    }

    const deg = angle * 180 / Math.PI;
    wrapper.style.transform = `rotate(${deg}deg)`;

    const energy = 0.5 * angularVelocity * angularVelocity + (G / L) * (1 - Math.cos(angle));
    const fill = Math.min((energy / 4) * 100, 100);
    trackInner.style.height = fill + '%';

    if (energy > 1.2) {
      boatSvg.classList.add('fast');
    } else {
      boatSvg.classList.remove('fast');
    }

    const msg = messages.find(m => energy >= m.min && energy < m.max);
    if (msg && msg.text !== lastMessage) {
      lastMessage = msg.text;
      messageText.textContent = msg.text;
    }
  }

  requestAnimationFrame(tick);
})();
