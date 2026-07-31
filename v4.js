const modal = document.querySelector('#purchase-modal');
const sticky = document.querySelector('.sticky-purchase');
const purchase = document.querySelector('#purchase');
const revealAfter = document.querySelector('.problem');
let lastFocus = null;

function setSticky(visible) {
  sticky.classList.toggle('show', visible);
  sticky.setAttribute('aria-hidden', String(!visible));
  sticky.inert = !visible;
}

function syncSticky() {
  const start = revealAfter.offsetTop + Math.min(280, revealAfter.offsetHeight * 0.3);
  const stop = purchase.offsetTop - window.innerHeight * 0.55;
  setSticky(window.scrollY >= start && window.scrollY < stop && modal.hidden);
}

function openModal(trigger) {
  lastFocus = trigger;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  setSticky(false);
  modal.querySelector('.modal-close').focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
  lastFocus?.focus();
  syncSticky();
}

document.querySelectorAll('.js-purchase').forEach(button => {
  button.addEventListener('click', () => openModal(button));
});
modal.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', closeModal));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.hidden) closeModal();
});
window.addEventListener('scroll', syncSticky, { passive: true });
window.addEventListener('resize', syncSticky);
syncSticky();
