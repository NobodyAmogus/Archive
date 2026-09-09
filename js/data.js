/* ============================================================
   Shared data loading + small helpers used across pages.
   All content lives in /content/*.json — edit those files to
   add archive entries. No build step required.
   ============================================================ */

const CONTENT_BASE = (() => {
  // works whether pages are loaded from root or a subfolder
  const path = window.location.pathname;
  return path.includes('/pages/') ? '../content/' : 'content/';
})();

async function loadJSON(name) {
  const res = await fetch(`${CONTENT_BASE}${name}.json`);
  if (!res.ok) throw new Error(`Failed to load ${name}.json`);
  return res.json();
}

async function loadAllEntries() {
  const [projects, experiments, notes] = await Promise.all([
    loadJSON('projects'),
    loadJSON('experiments'),
    loadJSON('notes'),
  ]);
  return [...projects, ...experiments, ...notes];
}

function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
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

function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

/* Renders a single entry card for grids (projects/experiments/archive) */
function entryCardHTML(item, opts = {}) {
  const detailPage = item.body ? 'note.html' : 'entry.html';
  const desc = item.description || '';
  const big = opts.big ? ' big' : '';
  return `
    <a class="entry-card${big} ${catClass(item.category)}" href="${detailPage}?id=${item.id}">
      <div class="thumb">${item.cover || '\u2726'}</div>
      <div class="body">
        <h3>${item.title}</h3>
        <p>${desc}</p>
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
        <p>${item.description || ''}</p>
      </div>
      <span class="date">${item.year}</span>
    </a>`;
}
