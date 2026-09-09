document.addEventListener('DOMContentLoaded', async () => {
  const [projects, experiments, notes, gallery] = await Promise.all([
    loadJSON('projects'), loadJSON('experiments'), loadJSON('notes'), loadJSON('gallery'),
  ]);
  const all = [...projects, ...experiments, ...notes]
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Featured strip: most recent as big feature, next 3 as mini cards
  const [feature, ...rest] = all.slice(0, 4);
  const featureLink = feature.body ? 'note.html' : 'entry.html';
  document.getElementById('featured-strip').innerHTML = `
    <a class="featured-main" href="${featureLink}?id=${feature.id}">
      <span class="k">${feature.category}</span>
      <h3>${feature.title}</h3>
      <p>${feature.description}</p>
    </a>
    <div class="featured-side">
      ${rest.map(item => {
        const link = item.body ? 'note.html' : 'entry.html';
        return `<a class="mini-card" href="${link}?id=${item.id}">
          <h4>${item.title}</h4><span>${item.year}</span>
        </a>`;
      }).join('')}
    </div>`;

  // Scrap strip: quick random-ish sampling across categories
  const scraps = [projects[0], experiments[0], notes[0], gallery[0]].filter(Boolean);
  document.getElementById('scrap-strip').innerHTML = scraps.map(item => {
    const label = item.image ? 'Gallery' : item.category;
    const title = item.title;
    const desc = item.description || item.caption || '';
    return `<div class="scrap-card"><div class="k">${label}</div><h4>${title}</h4><p>${desc}</p></div>`;
  }).join('');

  // Timeline: last 6 items across everything, chronological
  const timelineItems = all.slice(0, 6);
  const dotColors = { projects: 'var(--coral)', experiments: 'var(--teal)', notes: 'var(--gold)' };
  document.getElementById('home-timeline').innerHTML = timelineItems.map(item => `
    <div class="timeline-item" style="--dot:${dotColors[item.category] || 'var(--coral)'}">
      <div class="t-year">${fmtDate(item.date)} \u00b7 ${item.category}</div>
      <h4>${item.title}</h4>
      <p>${item.description}</p>
    </div>`).join('');
});
