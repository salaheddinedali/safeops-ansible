/* JavaScript natif : navigation et validation locale, sans stockage ni requête. */
'use strict';
document.documentElement.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav-wrap')) closeMenu();
});
document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
function validateDemo() {
  status.textContent = '';
  if (!form.reportValidity()) return;
  status.textContent = 'Les champs sont valides. Démonstration uniquement : votre demande n’a pas été envoyée. Aucune donnée n’est enregistrée.';
}
form.addEventListener('submit', event => { event.preventDefault(); validateDemo(); });
document.querySelector('#form-submit').addEventListener('click', validateDemo);
form.addEventListener('input', () => { status.textContent = ''; });
// Le contenu reste visible si JavaScript est désactivé ou si l’API est absente.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.service-card, .project, .about-grid, .quality-grid').forEach(element => observer.observe(element));
}
