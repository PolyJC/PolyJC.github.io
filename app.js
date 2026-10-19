const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
  menu.querySelector('span').textContent = open ? '−' : '+';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  menu.querySelector('span').textContent = '+';
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    menu.click();
    menu.focus();
  }
});
const filters = [...document.querySelectorAll('[data-filter]')];
const papers = [...document.querySelectorAll('.publication')];
function filterPapers(category) {
  let shown = 0;
  papers.forEach(paper => {
    paper.hidden = category === 'selected'
      ? paper.dataset.selected !== 'true'
      : category !== 'all' && paper.dataset.category !== category;
    if (!paper.hidden) shown++;
  });
  filters.forEach(button => {
    const active = button.dataset.filter === category;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelector('#filter-status').textContent = `${shown} publications shown`;
}
filters.forEach(button => button.addEventListener('click', () => filterPapers(button.dataset.filter)));
document.querySelectorAll('a[href^="#paper-"]').forEach(link => link.addEventListener('click', () => filterPapers('all')));

filterPapers('all');
