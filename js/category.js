document.addEventListener('DOMContentLoaded', async () => {
  const category = document.body.dataset.category; // 'projects' or 'experiments'
  const items = (await loadJSON(category)).sort((a, b) => new Date(b.date) - new Date(a.date));
  document.getElementById('category-grid').innerHTML = items.length
    ? items.map((item, i) => entryCardHTML(item, { big: i === 0 })).join('')
    : `<div class="empty-state"><h2>Nothing here yet</h2><p>Add entries to <code>content/${category}.json</code> to fill this page.</p></div>`;
});
