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

  // Set active nav link based on current page
  const currentPath = window.location.pathname;
  const hash = window.location.hash;
  const navLinksAll = document.querySelectorAll('.nav-link');
  
  // Clear all active classes first
  navLinksAll.forEach(link => link.classList.remove('active'));

  const vehiclePages = ['ebull.html', 'sardar.html', 'spike.html', 'rs90.html', 'rs180.html'];
  const isVehiclePage = vehiclePages.some(page => currentPath.endsWith(page));
  
  if (isVehiclePage) {
    // If it's a vehicle detail page, highlight "Vehicles" nav link
    const vehiclesLink = document.querySelector('.nav-link[href="vehicles.html"]');
    if (vehiclesLink) vehiclesLink.classList.add('active');
  } else {
    let matched = false;
    navLinksAll.forEach(link => {
      const href = link.getAttribute('href');
      if (href.includes('#')) {
        // Match hash links only if we're on the home page and the hash matches exactly
        if (currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath.endsWith('eroyce/')) {
          const linkHash = href.substring(href.indexOf('#'));
          if (hash === linkHash) {
            link.classList.add('active');
            matched = true;
          }
        }
      } else {
        // Match regular pages exactly
        if (currentPath.endsWith(href) && href !== 'index.html') {
          link.classList.add('active');
          matched = true;
        }
      }
    });

    // If nothing matched and we are on home page, highlight Home
    if (!matched && (currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('eroyce/'))) {
      if (!hash || hash === '') {
        const homeLink = document.querySelector('.nav-link[href="index.html"]');
        if (homeLink) homeLink.classList.add('active');
      }
    }
  }

  // Dynamically update active link on hash click
  navLinksAll.forEach(link => {
    link.addEventListener('click', function() {
      const href = this.getAttribute('href');
      // Only do this if clicking a link that stays on the current page
      if (href.includes('#') && (currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('eroyce/'))) {
        navLinksAll.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      } else if (href === 'index.html' && (currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('eroyce/'))) {
        navLinksAll.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Smooth scroll for hash links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Account for sticky header
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.reveal');
  
  const reveal = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealElements.forEach(el => el.classList.add('active'));
      return;
    }
    
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', reveal);
  reveal(); // Trigger on load

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

  // --- Form Submission Handling ---
  const GOOGLE_SCRIPT_URL = 'YOUR_SCRIPT_URL_HERE';
  
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    if (form.id === 'warrantyForm') {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const res = document.getElementById('warrantyResult');
        if (res) {
          res.style.display = 'block';
          res.textContent = 'Warranty verified. Your vehicle is under active warranty.';
          res.style.color = 'var(--black)';
          res.style.border = '1px solid var(--border)';
        }
      });
      return;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const statusDiv = form.querySelector('.form-status');
      const originalBtnText = submitBtn ? submitBtn.textContent : 'SUBMIT';
      
      if (submitBtn) {
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;
      }
      if (statusDiv) {
        statusDiv.textContent = '';
        statusDiv.style.color = 'inherit';
      }

      let formType = 'contact';
      if (form.id === 'dealerForm') formType = 'dealer';
      else if (form.id === 'grievanceForm') formType = 'grievance';
      else if (form.id === 'outletsBookingForm' || form.querySelector('select[name="vehicle"]') || form.querySelector('input[name="vehicle"]')) formType = 'booking';
      
      const formData = new FormData(form);
      const dataObj = { formType };
      formData.forEach((value, key) => {
        dataObj[key] = value;
      });

      try {
        if (GOOGLE_SCRIPT_URL === 'YOUR_SCRIPT_URL_HERE') {
          // Simulate network request for demo
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (statusDiv) {
            statusDiv.textContent = 'Success! We have received your details.';
            statusDiv.style.color = '#10b981'; // Green
          }
          form.reset();
        } else {
          // Using mode: 'no-cors' prevents CORS issues on the Google 302 redirect.
          // Because of no-cors, the response is opaque, so we assume success if it doesn't throw.
          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(dataObj),
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            }
          });
          
          if (statusDiv) {
            statusDiv.textContent = 'Success! We have received your details.';
            statusDiv.style.color = '#10b981';
          }
          form.reset();
        }
      } catch (err) {
        if (statusDiv) {
          statusDiv.textContent = 'Something went wrong. Please try again.';
          statusDiv.style.color = 'var(--red)';
        }
      } finally {
        if (submitBtn) {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
      }
    });
  });
});
