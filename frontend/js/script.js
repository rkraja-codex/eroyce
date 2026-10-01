// js/script.js

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const mainNav = document.querySelector('.main-nav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      hamburger.classList.toggle('active');
      mainNav.classList.toggle('open');
      document.body.classList.toggle('menu-open');
    });

    // Close menu when a link is clicked
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        mainNav.classList.remove('open');
        document.body.classList.remove('menu-open');
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        mainNav.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    });
  }

  // === Navigation Smooth Scroll & Scroll Spy ===
  const navLinksAll = document.querySelectorAll('.nav-link');
  const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname.endsWith('eroyce/');

  // 1. Smooth Scroll Handler
  navLinksAll.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // If we are on the home page and the link is to an index.html# section
      if (isHomePage && href.includes('index.html#')) {
        const targetId = href.split('#')[1];
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update URL hash without jumping
          window.history.pushState(null, '', '#' + targetId);
        }
      }
    });
  });

  // 2. Scroll Spy (Active State)
  if (isHomePage) {
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `index.html#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);
    
    sections.forEach(section => {
      observer.observe(section);
    });
  } else {
    // If not on home page, highlight based on current page if needed
    // The prompt requested nav to behave consistently. 
    // Since main nav links mostly go to home page sections, they will just act as normal links.
    // If we are on a specific page, we might not highlight anything in main nav unless it's a vehicle.
  }

  // Scroll reveal animation — IntersectionObserver (not a scroll listener)
  // so it costs nothing while scrolling instead of recalculating every
  // .reveal element's position on every scroll frame.
  const revealElements = document.querySelectorAll('.reveal');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => el.classList.add('active'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // Fleet Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const vehicleCards = document.querySelectorAll('.vehicle-card:not(.custom-fleet-card)');

  if (filterBtns.length > 0 && vehicleCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        vehicleCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Note: form submission is handled per-page (contact.html, book.html,
  // dealership-entities.html each have their own dedicated inline handler
  // wired to the deployed Google Apps Script URL) — intentionally no
  // generic form handler here, to avoid double-submitting every form.

  // --- FAQ Accordion ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;
      faqQuestions.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const other = otherBtn.nextElementSibling;
          if (other) other.classList.remove('open');
        }
      });
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        answer.classList.remove('open');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });

  // --- Vehicle Canvas Slider ---
  const vcTrack = document.getElementById('vehicleTrack');
  const vcPrev = document.getElementById('vcPrev');
  const vcNext = document.getElementById('vcNext');

  if (vcTrack && vcPrev && vcNext) {
    const CARD_W = 320 + 24; // card width + gap
    let currentOffset = 0;
    let maxOffset = 0;

    function updateMaxOffset() {
      const trackWidth = vcTrack.scrollWidth;
      const wrapperWidth = vcTrack.parentElement.offsetWidth;
      maxOffset = Math.max(0, trackWidth - wrapperWidth);
    }

    function setOffset(val) {
      updateMaxOffset();
      currentOffset = Math.max(0, Math.min(val, maxOffset));
      vcTrack.style.transform = `translateX(-${currentOffset}px)`;
      vcPrev.style.opacity = currentOffset <= 0 ? '0.35' : '1';
      vcNext.style.opacity = currentOffset >= maxOffset ? '0.35' : '1';
    }

    vcNext.addEventListener('click', () => setOffset(currentOffset + CARD_W));
    vcPrev.addEventListener('click', () => setOffset(currentOffset - CARD_W));

    // Drag-to-scroll (desktop)
    const wrapper = vcTrack.parentElement;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartOffset = 0;

    wrapper.addEventListener('mousedown', (e) => {
      isDragging = true;
      dragStartX = e.pageX;
      dragStartOffset = currentOffset;
      vcTrack.style.transition = 'none';
    });
    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      vcTrack.style.transition = '';
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const delta = dragStartX - e.pageX;
      setOffset(dragStartOffset + delta);
    });

    // Touch swipe
    let touchStartX = 0;
    let touchStartOffset = 0;
    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
      touchStartOffset = currentOffset;
      vcTrack.style.transition = 'none';
    }, { passive: true });
    wrapper.addEventListener('touchend', () => {
      vcTrack.style.transition = '';
    });
    wrapper.addEventListener('touchmove', (e) => {
      const delta = touchStartX - e.touches[0].pageX;
      setOffset(touchStartOffset + delta);
    }, { passive: true });

    setOffset(0);
    window.addEventListener('resize', () => setOffset(currentOffset));
  }

  // --- Video Hero: pause when page hidden ---
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { heroVideo.pause(); }
      else { heroVideo.play().catch(() => {}); }
    });
    // Ensure video plays on load
    heroVideo.play().catch(() => {});
  }
});
