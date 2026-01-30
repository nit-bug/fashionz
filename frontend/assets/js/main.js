(function () {
  'use strict';

  // ----- Navbar scroll -----
  var header = document.getElementById('site-header');
  if (header) {
    function onScroll() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ----- Cart count in header -----
  function updateCartCount() {
    var el = document.querySelector('.cart-count');
    if (el && window.FashionzState) {
      el.textContent = window.FashionzState.getCartCount();
    }
  }
  if (window.FashionzState && window.FashionzState.onCartChange) {
    window.FashionzState.onCartChange(updateCartCount);
  }
  updateCartCount();

  // ----- Mobile menu: close on nav link click -----
  var navLinks = document.querySelectorAll('.navbar .nav-link');
  var navbarCollapse = document.querySelector('.navbar-collapse');
  var navbarToggler = document.querySelector('.navbar-toggler');
  if (navbarCollapse && navbarToggler) {
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
          var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }

  // ----- Smooth scroll for anchor links -----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    var href = anchor.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (target) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });

  // ----- Hero slider (only when hero exists) -----
  var heroSlides = document.querySelectorAll('.hero-slide');
  var heroPrev = document.querySelector('.hero-prev');
  var heroNext = document.querySelector('.hero-next');
  var heroDotsEl = document.querySelector('.hero-dots');
  var currentSlide = 0;
  var totalSlides = heroSlides.length;
  var autoSlideInterval;

  function showSlide(index) {
    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;
    heroSlides.forEach(function (slide, i) {
      slide.classList.toggle('active', i === currentSlide);
    });
    updateDots();
  }

  function updateDots() {
    if (!heroDotsEl) return;
    heroDotsEl.innerHTML = '';
    for (var i = 0; i < totalSlides; i++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hero-dot' + (i === currentSlide ? ' active' : '');
      btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      btn.setAttribute('data-index', i);
      btn.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'), 10);
        showSlide(idx);
        resetAutoSlide();
      });
      heroDotsEl.appendChild(btn);
    }
  }

  function nextSlide() { showSlide(currentSlide + 1); }
  function prevSlide() { showSlide(currentSlide - 1); }
  function startAutoSlide() { autoSlideInterval = setInterval(nextSlide, 5000); }
  function resetAutoSlide() { clearInterval(autoSlideInterval); startAutoSlide(); }

  if (heroPrev) heroPrev.addEventListener('click', function () { prevSlide(); resetAutoSlide(); });
  if (heroNext) heroNext.addEventListener('click', function () { nextSlide(); resetAutoSlide(); });

  if (totalSlides > 0) {
    showSlide(0);
    startAutoSlide();
  }

  // ----- Newsletter form -----
  var newsletterForm = document.getElementById('newsletter-form');
  var newsletterMessage = document.getElementById('newsletter-message');
  if (newsletterForm && newsletterMessage) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = newsletterForm.querySelector('input[type="email"]');
      if (!input || !input.value.trim()) return;
      newsletterMessage.textContent = 'Thank you for subscribing!';
      newsletterMessage.classList.remove('d-none', 'error');
      newsletterMessage.classList.add('success');
      input.value = '';
    });
  }

  // ----- Footer year -----
  var yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
