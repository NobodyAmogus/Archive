document.addEventListener('DOMContentLoaded', () => {
  const current = document.body.dataset.page || '';
  document.querySelectorAll('nav.main-nav a').forEach(a => {
    if (a.dataset.page === current) a.classList.add('active');
  });
});
