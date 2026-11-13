// Menu mobile
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
});
menu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

// Filtre des projets
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');
filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filters.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    cards.forEach((card) => {
      const cats = card.dataset.cat.split(' ');
      card.hidden = !(f === 'all' || cats.includes(f));
    });
  });
});

// Fenêtre de détail d'un projet
const dlg = document.getElementById('detail');
const body = dlg.querySelector('.detail-body');
document.querySelectorAll('[data-detail]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const tpl = document.getElementById(btn.dataset.detail);
    body.replaceChildren(tpl.content.cloneNode(true));
    dlg.showModal();
    dlg.scrollTop = 0;
  });
});
dlg.querySelector('.close').addEventListener('click', () => dlg.close());
dlg.addEventListener('click', (e) => {
  if (e.target === dlg) dlg.close();
});

// Apparition au défilement
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in'));
}

// Année du pied de page
document.getElementById('year').textContent = new Date().getFullYear();
