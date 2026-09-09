document.addEventListener('DOMContentLoaded', async () => {
  const id = qs('id');
  const notes = await loadJSON('notes');
  const item = notes.find(i => i.id === id);
  const root = document.getElementById('note-root');

  if (!item) {
    root.innerHTML = `<div class="container"><div class="empty-state">
      <h2>Nothing here</h2><p>Couldn't find that note. <a href="notes.html">Back to notes</a>.</p>
    </div></div>`;
    return;
  }

  document.title = `${item.title} — Archive`;

  root.innerHTML = `
    <header class="detail-hero cat-notes">
      <div class="container">
        <div class="meta-row">
          <span class="pill">note</span>
          <span class="pill">${item.year}</span>
        </div>
        <h1>${item.title}</h1>
        <p class="desc">${item.description}</p>
      </div>
    </header>
    <div class="container">
      <div class="detail-grid">
        <div class="prose">${item.body}</div>
        <aside class="side-panel">
          <dt>Written</dt><dd>${fmtDate(item.date)}</dd>
          ${item.tags && item.tags.length ? `<dt>Tags</dt><dd class="tags">${item.tags.map(t => `<span class="pill">${t}</span>`).join('')}</dd>` : ''}
        </aside>
      </div>
    </div>`;
});
