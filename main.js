/* iotas.net — main.js */

document.addEventListener('DOMContentLoaded', () => {

  // ── Marquee ──
  const items = [
    'Hand-authenticated pieces',
    'Original provenance documentation',
    'Worldwide insured shipping',
    'Est. 1928 — Disney heritage',
    'Museum-grade conservation',
    'New acquisitions weekly',
  ];
  const track = document.getElementById('mtrack');
  if (track) {
    let html = '';
    for (let r = 0; r < 4; r++) {
      items.forEach(item => {
        html += `<span class="marquee-item">${item}<span class="marquee-dash"></span></span>`;
      });
    }
    track.innerHTML = html;
  }

  // ── Bag counter (placeholder) ──
  let bagCount = 0;
  const bagBtn = document.querySelector('.nav-bag');
  document.querySelectorAll('.prod-add').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.textContent.trim() === 'Add') {
        bagCount++;
        if (bagBtn) bagBtn.textContent = `Bag · ${bagCount}`;
      }
    });
  });

});
