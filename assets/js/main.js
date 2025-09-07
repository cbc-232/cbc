(function() {
  "use strict";

  /**
   * Utilities
   */
  function safeDecode(s) {
    try { return decodeURI(s); } catch (e) { return s; }
  }

  function normalizePath(p) {
    if (!p) return '/';
    p = safeDecode(p).replace(/\\/g, '/');
    // Remove trailing slash except keep single root slash
    p = p.replace(/\/+$/, '');
    if (p === '') p = '/';
    return p.toLowerCase();
  }

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader ||
        (!selectHeader.classList.contains('scroll-up-sticky') &&
         !selectHeader.classList.contains('sticky-top') &&
         !selectHeader.classList.contains('fixed-top'))) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }
  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  function mobileNavToogle() {
    const body = document.querySelector('body');
    if (!body) return;
    body.classList.toggle('mobile-nav-active');
    if (!mobileNavToggleBtn) return;
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      if (this.parentNode.nextElementSibling)
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (window.AOS && typeof AOS.init === 'function') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  if (window.GLightbox) {
    try { GLightbox({ selector: '.glightbox' }); } catch (e) { /* ignore */ }
  }

  /**
   * Initiate Pure Counter
   */
  if (window.PureCounter) {
    try { new PureCounter(); } catch (e) { /* ignore */ }
  }

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && window.Typed) {
    let typed_strings = selectTyped.getAttribute('data-typed-items') || '';
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    if (!window.Swiper) return;
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      const cfgNode = swiperElement.querySelector(".swiper-config");
      if (!cfgNode) return;
      let config = {};
      try { config = JSON.parse(cfgNode.innerHTML.trim()); } catch (e) { console.warn('Invalid Swiper config', e); }
      if (swiperElement.classList.contains("swiper-tab")) {
        if (typeof window.initSwiperWithCustomPagination === "function") {
          window.initSwiperWithCustomPagination(swiperElement, config);
        } else {
          try { new Swiper(swiperElement, config); } catch(e){/*ignore*/ }
        }
      } else {
        try { new Swiper(swiperElement, config); } catch(e){/*ignore*/ }
      }
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * FAQ Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Adjust scroll to anchor on load
   */
  window.addEventListener('load', function() {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop || "0", 10),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Robust Active Menu Item Detection (Live Server + file:// fully supported)
   */
  function updateActiveNav() {
    const currentFullRaw = location.pathname || '/';
    const currentFull = normalizePath(currentFullRaw);
    const currentFileName = (currentFullRaw.split('/').pop() || '').toLowerCase();

    const navLinks = document.querySelectorAll('.navmenu a');
    if (!navLinks || !navLinks.length) return;

    // Reset all active states first
    navLinks.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    });

    let bestMatch = null;
    let bestMatchLength = -1;

    navLinks.forEach(link => {
      const href = (link.getAttribute('href') || '').trim();
      if (!href || href.startsWith('#')) return;

      // Skip true externals
      if (/^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//.test(href)) {
        try {
          const u = new URL(href);
          if (u.origin !== location.origin) return;
        } catch(e) { return; }
      }

      // Resolve URL for both Live Server and file://
      let linkUrl;
      try {
        if (location.protocol === 'file:') {
          const base = 'file://' + location.pathname.replace(/[^\/]+$/, '');
          linkUrl = new URL(href, base);
        } else {
          linkUrl = new URL(href, location.origin);
        }
      } catch(e){ return; }

      const linkPath = normalizePath(linkUrl.pathname);

      // Exact match
      if (linkPath === currentFull && linkPath.length > bestMatchLength) {
        bestMatch = link;
        bestMatchLength = linkPath.length;
        return;
      }

      // Subpage match
      if (currentFull.startsWith(linkPath + '/') && linkPath.length > bestMatchLength) {
        bestMatch = link;
        bestMatchLength = linkPath.length;
      }

      // Fallback: filename-only match
      const hrefFile = (linkPath.split('/').pop() || '').toLowerCase();
      if (!bestMatch && hrefFile && currentFileName && hrefFile === currentFileName) {
        bestMatch = link;
        bestMatchLength = linkPath.length;
      }
    });

    // Apply active state
    if (bestMatch) {
      bestMatch.classList.add('active');
      bestMatch.setAttribute('aria-current', 'page');

      // Propagate to parent dropdowns
      let parent = bestMatch.closest('.dropdown');
      while (parent) {
        parent.classList.add('active');
        const parentLink = parent.querySelector('a');
        if (parentLink) parentLink.classList.add('active');
        const sibling = parent.querySelector('ul');
        if (sibling) sibling.classList.add('dropdown-active');
        parent = parent.parentElement.closest('.dropdown');
      }
    }
  }

  // Run once page loads and on navigation events
  window.addEventListener('load', updateActiveNav);
  window.addEventListener('popstate', updateActiveNav);
  document.addEventListener('scroll', updateActiveNav, { passive: true });
  window.addEventListener('resize', updateActiveNav);

  /**
   * Contact Form Submission
   */
  document.addEventListener("DOMContentLoaded", () => {
    const originalForm = document.querySelector("form.php-email-form");
    if (!originalForm) return;

    const form = originalForm.cloneNode(true);
    originalForm.parentNode.replaceChild(form, originalForm);
    form.removeAttribute && form.removeAttribute("onsubmit");

    const loading = form.querySelector(".loading");
    const errorMessage = form.querySelector(".error-message");
    const sentMessage = form.querySelector(".sent-message");

    let sending = false;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (sending) return;
      sending = true;

      if (errorMessage) { errorMessage.style.display = "none"; errorMessage.textContent = ""; }
      if (sentMessage) sentMessage.style.display = "none";
      if (loading) loading.style.display = "block";

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method || 'POST',
          body: formData,
          headers: { "Accept": "application/json" }
        });

        const contentType = response.headers.get("content-type") || "";
        let data;

        if (contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          try { data = JSON.parse(text); }
          catch { throw new Error("Unexpected server response: " + text); }
        }

        if (data && (data.success || data.ok)) {
          if (loading) loading.style.display = "none";
          if (sentMessage) {
            sentMessage.textContent = data.message || "Thanks — we've received your message.";
            sentMessage.style.display = "block";
          }
          form.reset();
        } else {
          throw new Error(data && (data.message || data.error) ? (data.message || data.error) : "Submission failed");
        }

      } catch (error) {
        if (loading) loading.style.display = "none";
        if (errorMessage) {
          errorMessage.textContent = error.message || "An unexpected error occurred.";
          errorMessage.style.display = "block";
        }
      } finally {
        sending = false;
      }
    });
  });  

})();
