"use strict";
// Shared header component. Update this file to change the header on every page.
(function () {
  var headerHost = document.querySelector('[data-site-header]');
  if (!headerHost) return;

  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinks = [
    ['index.html', 'Home'],
    ['work.html', 'Work'],
    ['services.html', 'Services'],
    ['contact.html', 'Contact']
  ];

  var linkMarkup = function (mobile) {
    return navLinks.map(function (link) {
      var href = link[0];
      var label = link[1];
      var active = href === currentPage;
      var attrs = active ? ' class="active" aria-current="page"' : '';

      return mobile
        ? '<a href="' + href + '"' + attrs + '>' + label + '</a>'
        : '<li><a href="' + href + '"' + attrs + '>' + label + '</a></li>';
    }).join('');
  };

  headerHost.innerHTML = '\
  <nav id="nav" aria-label="Primary">\
    <div class="container">\
      <div class="nav-inner">\
        <a href="index.html" class="logo">\
          <img src="images/platinum-builders-logo.png" alt="" class="logo-mark" aria-hidden="true" />\
          <span class="logo-text"><span>Platinum</span><span>Builders</span></span>\
        </a>\
        <ul class="nav-links">' + linkMarkup(false) + '</ul>\
        <div class="nav-ctas">\
          <a href="tel:+441494000000" class="btn btn-ghost">01494 000 000</a>\
          <a href="book.html" class="btn btn-primary">Book Appointment</a>\
        </div>\
        <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">\
          <span></span><span></span><span></span>\
        </button>\
      </div>\
    </div>\
  </nav>\
  <div class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Navigation">\
    ' + linkMarkup(true) + '\
    <div class="mobile-ctas">\
      <a href="tel:+441494000000" class="btn btn-ghost">Call Us</a>\
      <a href="book.html" class="btn btn-primary">Book Appointment</a>\
    </div>\
  </div>';
})();
