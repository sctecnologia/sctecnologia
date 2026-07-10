const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

if (form && feedback) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    const waBody = `Hola, soy ${name}.${phone ? ` Teléfono: ${phone}` : ''}${email ? ` Email: ${email}` : ''}\n\n${message}`;
    const waLink = document.createElement('a');
    waLink.href = `https://wa.me/34644176695?text=${encodeURIComponent(waBody)}`;
    waLink.target = '_blank';
    waLink.rel = 'noopener,noreferrer';
    waLink.click();

    form.reset();
    btn.textContent = originalText;
    btn.disabled = false;
    feedback.className = 'form-feedback success';
    feedback.textContent = `Gracias, ${name}. Te responderé lo antes posible por WhatsApp.`;
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === COOKIE CONSENT BANNER ===
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');
const cookieReject = document.getElementById('cookieReject');

function getCookie(name) {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='));
}

function hideCookieBanner() {
  cookieBanner.classList.remove('show');
  setTimeout(() => { cookieBanner.style.display = 'none'; }, 400);
}

function setCookieConsent(value) {
  document.cookie = 'cookies_accepted=' + value + '; max-age=31536000; path=/; SameSite=Lax';
}

if (cookieBanner && cookieAccept) {
  // Solo mostrar si no ha respondido ya
  if (!getCookie('cookies_accepted')) {
    setTimeout(() => cookieBanner.classList.add('show'), 500);
  }

  cookieAccept.addEventListener('click', () => {
    setCookieConsent('1');
    hideCookieBanner();
  });

  if (cookieReject) {
    cookieReject.addEventListener('click', () => {
      setCookieConsent('rejected');
      hideCookieBanner();
    });
  }
}

// Función global para revocar consentimiento desde la página de cookies
window.revocarConsentimiento = function() {
  // Borrar la cookie de consentimiento
  document.cookie = 'cookies_accepted=; max-age=0; path=/; SameSite=Lax';
  // Mostrar el banner de nuevo
  if (cookieBanner) {
    cookieBanner.style.display = '';
    setTimeout(() => cookieBanner.classList.add('show'), 100);
    // Hacer scroll al banner
    cookieBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};
