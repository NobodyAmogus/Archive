document.addEventListener('DOMContentLoaded', async () => {
  const category = document.body.dataset.category; // 'projects' or 'experiments'
  const items = (await loadJSON(category)).sort((a, b) => new Date(b.date) - new Date(a.date));
  document.getElementById('category-grid').innerHTML =
    items.map((item, i) => entryCardHTML(item, { big: i === 0 })).join('');
});
