document.addEventListener('DOMContentLoaded', async () => {
  const notes = (await loadJSON('notes')).sort((a, b) => new Date(b.date) - new Date(a.date));
  document.getElementById('notes-list').innerHTML = notes.map(noteRowHTML).join('');
});
