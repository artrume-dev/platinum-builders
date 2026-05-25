// Platinum Builders & Construction — site interactions
// Compile with: tsc ts/main.ts --outDir js --target ES2018 --lib DOM,ES2018

interface FormStatusElement extends HTMLElement { }

(function () {
  const nav = document.getElementById('nav') as HTMLElement | null;
  if (nav) {
    const onScroll = (): void => nav.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const hamburger = document.getElementById('hamburger') as HTMLButtonElement | null;
  const mobileMenu = document.getElementById('mobileMenu') as HTMLElement | null;
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll<HTMLAnchorElement>('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        (e.target as HTMLElement).classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll<HTMLElement>('.fade-up').forEach((el) => observer.observe(el));

  // Trigger hero fades immediately on load
  document.querySelectorAll<HTMLElement>('.hero .fade-up, .page-hero .fade-up').forEach((el) => {
    window.setTimeout(() => el.classList.add('visible'), 80);
  });

  // Contact / booking form handling — client-side only (no backend attached yet)
  const forms = document.querySelectorAll<HTMLFormElement>('form[data-form]');
  forms.forEach((form) => {
    const status = form.querySelector<FormStatusElement>('.form-status');
    form.addEventListener('submit', (ev: SubmitEvent) => {
      ev.preventDefault();
      if (!status) return;
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      if (!name || !email) {
        status.className = 'form-status error show';
        status.textContent = 'Please enter your name and email.';
        return;
      }
      status.className = 'form-status success show';
      status.textContent = `Thanks ${name.split(' ')[0]} — we'll be in touch within one working day.`;
      form.reset();
    });
  });

  // Set minimum date for appointment picker to today
  const dateInput = document.querySelector<HTMLInputElement>('input[type="date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  // Current year in footer
  document.querySelectorAll<HTMLElement>('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
