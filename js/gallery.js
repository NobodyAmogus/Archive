document.addEventListener('DOMContentLoaded', async () => {
  const items = await loadJSON('gallery');
  const masonry = document.getElementById('masonry');

  masonry.innerHTML = items.map(item => `
    <figure data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <figcaption>${item.title}</figcaption>
    </figure>`).join('');

  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCaption = document.getElementById('lightbox-caption');

  masonry.addEventListener('click', e => {
    const fig = e.target.closest('figure');
    if (!fig) return;
    const item = items.find(i => i.id === fig.dataset.id);
    lbImg.src = item.image;
    lbImg.alt = item.title;
    lbCaption.textContent = `${item.title} — ${item.caption || ''}`;
    lightbox.classList.add('open');
  });

  document.getElementById('lightbox-close').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') lightbox.classList.remove('open'); });
});
