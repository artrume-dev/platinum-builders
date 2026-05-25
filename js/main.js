"use strict";
// Compiled from ts/main.ts — Platinum Builders & Construction
(function () {
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { return nav.classList.toggle('scrolled', window.scrollY > 40); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(function (el) { return observer.observe(el); });

  document.querySelectorAll('.hero .fade-up, .page-hero .fade-up').forEach(function (el) {
    window.setTimeout(function () { return el.classList.add('visible'); }, 80);
  });

  var forms = document.querySelectorAll('form[data-form]');
  forms.forEach(function (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!status) return;
      var data = new FormData(form);
      var name = String(data.get('name') || '').trim();
      var email = String(data.get('email') || '').trim();
      if (!name || !email) {
        status.className = 'form-status error show';
        status.textContent = 'Please enter your name and email.';
        return;
      }
      status.className = 'form-status success show';
      status.textContent = "Thanks " + name.split(' ')[0] + " \u2014 we'll be in touch within one working day.";
      form.reset();
    });
  });

  var dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    var today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
