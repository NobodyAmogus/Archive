document.addEventListener('DOMContentLoaded', async () => {
  const id = qs('id');
  const [projects, experiments] = await Promise.all([loadJSON('projects'), loadJSON('experiments')]);
  const all = [...projects, ...experiments];
  const item = all.find(i => i.id === id);
  const root = document.getElementById('entry-root');

  if (!item) {
    root.innerHTML = `<div class="container"><div class="empty-state">
      <h2>Nothing here</h2><p>Couldn't find that entry. <a href="archive.html">Back to the archive</a>.</p>
    </div></div>`;
    return;
  }

  document.title = `${item.title} — Archive`;

  const images = (item.images && item.images.length)
    ? item.images.map(src => `<img src="${src}" alt="${item.title} screenshot">`).join('')
    : '';

  const related = (item.related || [])
    .map(rid => all.find(i => i.id === rid))
    .filter(Boolean);

  root.innerHTML = `
    <header class="detail-hero ${catClass(item.category)}">
      <div class="container">
        <div class="meta-row">
          <span class="pill">${item.category}</span>
          <span class="pill ${statusClass(item.status)}">${item.status}</span>
          <span class="pill">${item.year}</span>
        </div>
        <h1>${item.title}</h1>
        <p class="desc">${item.description}</p>
      </div>
    </header>
    <div class="container">
      <div class="detail-grid">
        <div>
          ${images ? `<div class="detail-images">${images}</div>` : ''}
          ${item.body ? `<div class="prose">${item.body}</div>` : ''}
          ${item.notes ? `<h2>Notes</h2><p class="prose">${item.notes}</p>` : ''}
          ${related.length ? `
            <h2 style="margin-top:40px;">Related</h2>
            <div class="related-row">
              ${related.map(r => `<a class="mini-card" href="entry.html?id=${r.id}"><h4>${r.title}</h4><span>${r.year}</span></a>`).join('')}
            </div>` : ''}
        </div>
        <aside class="side-panel">
          <dt>Date</dt><dd>${fmtDate(item.date)}</dd>
          ${item.tools && item.tools.length ? `<dt>Tools</dt><dd>${item.tools.join(', ')}</dd>` : ''}
          ${item.tags && item.tags.length ? `<dt>Tags</dt><dd class="tags">${item.tags.map(t => `<span class="pill">${t}</span>`).join('')}</dd>` : ''}
          ${item.links && item.links.length ? `<dt>Links</dt><dd>${item.links.map(l => `<a href="${l.url}">${l.label}</a>`).join('<br>')}</dd>` : ''}
          ${item.downloads && item.downloads.length ? `<dt>Downloads</dt><dd>${item.downloads.map(d => `<a href="${d.url}">${d.label}</a>`).join('<br>')}</dd>` : ''}
        </aside>
      </div>
    </div>`;
});
