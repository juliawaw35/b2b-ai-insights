// Current year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');

burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      menu.classList.remove('open');
    }
  });
});

// UTM capture for webinar form
const params = new URLSearchParams(location.search);
['utm_source', 'utm_medium', 'utm_campaign'].forEach(k => {
  const v = params.get(k);
  if (v) {
    const input = document.querySelector(`#webinar-form input[name="${k}"]`);
    if (input) input.value = v;
  }
});

// Simple async submit status (works with Formspree)
const form = document.getElementById('webinar-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    const status = document.getElementById('form-status');
    status.textContent = 'Submitting...';

    try {
      e.preventDefault();
      const data = new FormData(form);
      const resp = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (resp.ok) {
        status.textContent = 'Thank you! Check your inbox for webinar details.';
        form.reset();
      } else {
        status.textContent = 'Something went wrong. Please try again or email us.';
      }

    } catch (err) {
      status.textContent = 'Network error. Please try again.';
    }
  });
}
