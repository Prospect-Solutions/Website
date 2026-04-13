// ============================================================
// PROSPECT — Main JS
// ============================================================

// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// Scroll reveal
const scrollRevealEls = document.querySelectorAll('.scroll-reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

scrollRevealEls.forEach(el => observer.observe(el));

// ============================================================
// EMAILJS CONFIG
// Replace these three values after setting up your EmailJS account
// ============================================================
const EMAILJS_PUBLIC_KEY  = '-NqIm1SITnPbOERRf';   // EmailJS → Account → Public Key
const EMAILJS_SERVICE_ID  = 'service_rnv4a8q';   // EmailJS → Email Services → Service ID
const EMAILJS_TEMPLATE_ID = 'template_6qv7srw';  // EmailJS → Email Templates → Template ID

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// Contact form
const form = document.getElementById('contactForm');
const btn  = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Basic validation
  const name  = form.querySelector('[name="from_name"]').value.trim();
  const email = form.querySelector('[name="reply_to"]').value.trim();
  if (!name || !email) return;

  // Loading state
  btn.textContent = 'Sending...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  try {
    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);

    // Success state
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#2a6e4e';
    btn.style.opacity = '1';
    form.reset();

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);

  } catch (err) {
    console.error('EmailJS error:', err);

    // Error state
    btn.textContent = 'Something went wrong — try again';
    btn.style.background = '#6e2a2a';
    btn.style.opacity = '1';
    btn.disabled = false;

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
    }, 4000);
  }
});

// Smooth anchor offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});
