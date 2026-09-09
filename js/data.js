function mapEntry(row) {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    description: row.description || '',
    body: row.body || '',
    notes: row.notes || '',
    status: row.status || '',
    date: row.entry_date,
    year: row.entry_date ? new Date(row.entry_date + 'T00:00:00').getFullYear() : '',
    tags: row.tags || [],
    tools: row.tools || [],
    cover: row.cover_url || '',
    images: row.images || []
  };
}

function mapGalleryItem(row) {
  return {
    id: row.id,
    title: row.title,
    caption: row.caption || '',
    image: row.image_url
  };
}

async function loadJSON(name) {
  if (name === 'gallery') {
    const { data, error } = await window.archiveDb
      .from('gallery_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(mapGalleryItem);
  }

  const { data, error } = await window.archiveDb
    .from('entries')
    .select('*')
    .eq('category', name)
    .order('entry_date', { ascending: false });

  if (error) throw error;
  return data.map(mapEntry);
}

async function loadAllEntries() {
  const [projects, experiments, notes] = await Promise.all([
    loadJSON('projects'),
    loadJSON('experiments'),
    loadJSON('notes')
  ]);

  return [...projects, ...experiments, ...notes];
}

function fmtDate(iso) {
  if (!iso) return '';
  return new Date(iso + 'T00:00:00').toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' }
  );
}

function statusClass(status) {
  return `status-${(status || '').replace(/\s+/g, '-')}`;
}

function catClass(category) {
  return `cat-${category}`;
}

function qs(param) {
  return new URLSearchParams(window.location.search).get(param);
}

function entryCardHTML(item, opts = {}) {
  const detailPage = item.body ? 'note.html' : 'entry.html';
  const big = opts.big ? ' big' : '';

return `
  <a class="entry-card${big} ${catClass(item.category)}" href="${detailPage}?id=${item.id}">
    ${item.cover ? `<div class="thumb"><img src="${item.cover}" alt=""></div>` : ''}
    <div class="body">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="meta">
          <span class="pill">${item.year}</span>
          ${item.status ? `<span class="pill ${statusClass(item.status)}">${item.status}</span>` : ''}
        </div>
      </div>
    </a>`;
}

function noteRowHTML(item) {
  return `
    <a class="note-row" href="note.html?id=${item.id}">
      <div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </div>
      <span class="date">${item.year}</span>
    </a>`;
}
