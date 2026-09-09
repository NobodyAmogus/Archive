document.addEventListener('DOMContentLoaded', async () => {
  const all = (await loadAllEntries()).sort((a, b) => new Date(b.date) - new Date(a.date));

  const grid = document.getElementById('archive-grid');
  const countEl = document.getElementById('results-count');
  const searchInput = document.getElementById('archive-search');
  const yearSelect = document.getElementById('year-filter');
  const chipRow = document.getElementById('category-chips');
  const statusChipRow = document.getElementById('status-chips');

  const state = { q: '', category: 'all', year: 'all', status: 'all' };

  // Populate year filter dynamically
  const years = [...new Set(all.map(i => i.year))].sort((a, b) => b - a);
  yearSelect.innerHTML = `<option value="all">All years</option>` +
    years.map(y => `<option value="${y}">${y}</option>`).join('');

  const categories = ['all', 'projects', 'experiments', 'notes'];
  chipRow.innerHTML = categories.map(c =>
    `<button class="chip${c === 'all' ? ' active' : ''}" data-category="${c}">${c === 'all' ? 'Everything' : c}</button>`
  ).join('');

  const statuses = ['all', 'Completed', 'In Progress', 'Experimental', 'Archived', 'Abandoned'];
  statusChipRow.innerHTML = statuses.map(s =>
    `<button class="chip${s === 'all' ? ' active' : ''}" data-status="${s}">${s === 'all' ? 'Any status' : s}</button>`
  ).join('');

  function render() {
    const filtered = all.filter(item => {
      const matchesQ = !state.q || (item.title + ' ' + (item.description || '') + ' ' + (item.tags || []).join(' '))
        .toLowerCase().includes(state.q.toLowerCase());
      const matchesCat = state.category === 'all' || item.category === state.category;
      const matchesYear = state.year === 'all' || String(item.year) === state.year;
      const matchesStatus = state.status === 'all' || item.status === state.status;
      return matchesQ && matchesCat && matchesYear && matchesStatus;
    });

    countEl.textContent = `${filtered.length} item${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
      grid.innerHTML = '';
      grid.insertAdjacentHTML('afterend', '');
      document.getElementById('empty-state').style.display = 'block';
    } else {
      document.getElementById('empty-state').style.display = 'none';
    }

    grid.innerHTML = filtered.map((item, i) =>
      entryCardHTML(item, { big: i === 0 && state.q === '' && state.category === 'all' })
    ).join('');
  }

  searchInput.addEventListener('input', e => { state.q = e.target.value; render(); });
  yearSelect.addEventListener('change', e => { state.year = e.target.value; render(); });

  chipRow.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    chipRow.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    state.category = btn.dataset.category;
    render();
  });

  statusChipRow.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    statusChipRow.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    state.status = btn.dataset.status;
    render();
  });

  // Support ?category= deep link from homepage tiles
  const initialCategory = qs('category');
  if (initialCategory && categories.includes(initialCategory)) {
    state.category = initialCategory;
    chipRow.querySelectorAll('.chip').forEach(c =>
      c.classList.toggle('active', c.dataset.category === initialCategory));
  }

  render();
});
