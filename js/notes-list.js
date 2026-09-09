document.addEventListener('DOMContentLoaded', async () => {
  const notes = (await loadJSON('notes')).sort((a, b) => new Date(b.date) - new Date(a.date));
  document.getElementById('notes-list').innerHTML = notes.length
    ? notes.map(noteRowHTML).join('')
    : `<div class="empty-state"><h2>Nothing here yet</h2><p>Add entries to <code>content/notes.json</code> to fill this page.</p></div>`;
});
