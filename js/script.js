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
    });

    // Close menu when a link is clicked
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        mainNav.classList.remove('open');
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('active');
        mainNav.classList.remove('open');
      }
    });
  }

  // Set active nav link based on current page
  const currentPath = window.location.pathname;
  const navLinksAll = document.querySelectorAll('.nav-link');
  navLinksAll.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath && currentPath.endsWith(linkPath) && linkPath !== 'index.html') {
      link.classList.add('active');
    } else if (currentPath.endsWith('/') && linkPath === 'index.html') {
      link.classList.add('active');
    }
  });
  
  if (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('eroyce/') || currentPath.endsWith('eroyce/index.html')) {
    const homeLink = document.querySelector('.nav-link[href="index.html"]');
    if (homeLink) homeLink.classList.add('active');
  }

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
          const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(dataObj),
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            }
          });
          const result = await response.json();
          if (result.status === 'success') {
            if (statusDiv) {
              statusDiv.textContent = 'Success! We have received your details.';
              statusDiv.style.color = '#10b981';
            }
            form.reset();
          } else {
            throw new Error('Submission failed');
          }
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
