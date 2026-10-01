// js/nav.js
// Shared Header & Footer injection for all E-Royce pages
// Usage: include this script on every page BEFORE script.js

(function() {
  // ─── Determine active page ─────────────────────────────────────────────────
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  function isActive(pageFile) {
    if (pageFile === 'index.html') {
      return filename === 'index.html' || filename === '' || path.endsWith('/eroyce/') || path.endsWith('/eroyce');
    }
    return filename === pageFile;
  }

  // Vehicle pages
  const vehiclePages = ['ebull.html','sardar.html','spike.html','rs90.html','rs180.html'];
  const isVehiclePage = vehiclePages.includes(filename);

  // ─── TOP BAR ───────────────────────────────────────────────────────────────
  const topBarHTML = `
  <div class="top-bar" role="complementary" aria-label="Contact information">
    <div class="container">
      <div class="top-bar-left">
        <span class="top-bar-dot" aria-hidden="true"></span>
        <span>DIRECT NETWORK TELEMETRY</span>
        <span class="top-bar-divider" aria-hidden="true">/</span>
        <a href="tel:+919500128831" style="color:inherit;">+91 95001 28831</a>
        <span class="top-bar-divider" aria-hidden="true">/</span>
        <a href="tel:+916384484463" style="color:inherit;">+91 63844 84463</a>
        <span class="top-bar-divider" aria-hidden="true">/</span>
        <span>CHENNAI • COIMBATORE • MADURAI</span>
      </div>
      <div class="top-bar-right">
        <span class="top-bar-muted">ISO 9001:2015 CERTIFIED EV MFG</span>
        <span class="top-bar-highlight">BHARAT FLEET GRADE</span>
      </div>
    </div>
  </div>`;

  // ─── HEADER / NAV ──────────────────────────────────────────────────────────
  function navLink(href, label, pageFile) {
    const active = (pageFile === 'vehicles' && isVehiclePage)
      ? 'active'
      : (isActive(pageFile) ? 'active' : '');
    return `<a href="${href}" class="nav-link ${active}">${label}</a>`;
  }

  const headerHTML = `
  <header class="site-header" id="siteHeader">
    <div class="container">
      <a href="index.html" class="logo-group" aria-label="E Royce Motors — Home">
        <img src="assets/images/logo.png" alt="E Royce Motors Logo" class="logo-img">
        <div class="logo-text">
          <div class="logo-brand">E Royce</div>
          <div class="logo-tagline">ELECTRIC VEHICLES</div>
        </div>
      </a>

      <nav class="main-nav" id="mainNav" aria-label="Main navigation">
        ${navLink('index.html',             'Home',                 'index.html')}
        ${navLink('vehicles.html',          'Vehicles',             isVehiclePage ? 'vehicles' : 'vehicles.html')}
        ${navLink('about.html',             'About Us',             'about.html')}
        ${navLink('technology.html',        'Technology',           'technology.html')}
        ${navLink('dealer-locator.html',    'Dealer Locator',       'dealer-locator.html')}
        ${navLink('dealership-entities.html','Dealership Enquiry',  'dealership-entities.html')}
        ${navLink('contact.html',           'Contact',              'contact.html')}
        ${navLink('faq.html',               'FAQ',                  'faq.html')}
      </nav>

      <div class="header-actions">
        <a href="book.html" class="btn btn-primary btn-header">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          BOOK YOUR VEHICLE
        </a>
      </div>

      <button class="hamburger" id="hamburger" aria-label="Toggle navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;

  // ─── FOOTER ────────────────────────────────────────────────────────────────
  const footerHTML = `
  <footer class="site-footer" role="contentinfo">
    <!-- CTA Strip -->
    <div class="footer-cta-strip">
      <div class="container footer-cta-content">
        <h3 class="footer-cta-title">Ready to Electrify Your Fleet &amp; Commute?</h3>
        <a href="book.html" class="btn btn-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          BOOK YOUR VEHICLE
        </a>
      </div>
    </div>

    <!-- Main Footer Grid -->
    <div class="container footer-main">

      <!-- Brand Column -->
      <div class="footer-col footer-brand-col">
        <a href="index.html" aria-label="E Royce Motors — Home">
          <img src="assets/images/logo.png" alt="E Royce Motors Logo" class="footer-brand-img">
        </a>
        <p class="footer-desc">E Royce Motors India Pvt. Ltd. — pioneering clean electric transportation since 2017. ISO 9001:2015 certified. ARAI compliant vehicles built for India.</p>
        <div class="footer-tagline footer-tagline-green">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px;"><path d="M11 20A7 7 0 0 1 4 13c0-4.42 7-10 7-10s7 5.58 7 10a7 7 0 0 1-7 7z"/><path d="M11 20v-7"/></svg>
          GO GREEN, GO E-ROYCE
        </div>
        <div class="social-links" aria-label="Follow E-Royce on social media">
          <a href="https://www.instagram.com/eroycemotorsindia/" target="_blank" rel="noopener noreferrer" aria-label="E-Royce on Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://www.facebook.com/eRoycemotors" target="_blank" rel="noopener noreferrer" aria-label="E-Royce on Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="https://wa.me/916384440214" target="_blank" rel="noopener noreferrer" aria-label="Chat with E-Royce on WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </a>
        </div>
      </div>

      <!-- Vehicles Column -->
      <div class="footer-col">
        <h4>Our Vehicles</h4>
        <nav class="footer-nav" aria-label="Vehicle pages">
          <a href="ebull.html">eBull — Commercial 3-Wheeler</a>
          <a href="sardar.html">Sardar — Electric Scooter</a>
          <a href="spike.html">Spike — Electric Scooter</a>
          <a href="rs90.html">RS90 — Electric Scooter</a>
          <a href="rs180.html">RS180 — Electric Scooter</a>
          <a href="book.html" style="color:var(--red);font-weight:600;">Book Your Vehicle →</a>
        </nav>
      </div>

      <!-- Company Column -->
      <div class="footer-col">
        <h4>Company</h4>
        <nav class="footer-nav" aria-label="Company pages">
          <a href="about.html">About Us</a>
          <a href="technology.html">Technology</a>
          <a href="dealer-locator.html">Dealer Locator</a>
          <a href="dealership-entities.html">Become a Dealer</a>
          <a href="faq.html">FAQ</a>
          <a href="contact.html">Contact Us</a>
          <a href="privacy.html">Privacy Policy</a>
          <a href="terms.html">Terms of Service</a>
        </nav>
      </div>

      <!-- Locations Column -->
      <div class="footer-col footer-locations-col">
        <h4>Our Outlets</h4>
        <div class="footer-locations">
          <div class="footer-location-item">
            <div class="footer-location-name">Coimbatore</div>
            <address class="footer-location-address">Pollachi Main Road, Eachanari,<br>Coimbatore, Tamil Nadu 641 021</address>
            <a href="tel:+916384440214" class="footer-location-tel">+91 63844 40214</a>
          </div>
          <div class="footer-location-item">
            <div class="footer-location-name">Chennai</div>
            <address class="footer-location-address">21, Ground Floor, Old GST Road,<br>Peerkankaranai, Chennai 600 063</address>
            <a href="tel:+916384440216" class="footer-location-tel">+91 63844 40216</a>
          </div>
          <div class="footer-location-item">
            <div class="footer-location-name">Madurai</div>
            <address class="footer-location-address">B-3, Pandi Kovil Ring Road,<br>Opp. Guru Hospital, 625 020</address>
            <a href="tel:+916384440212" class="footer-location-tel">+91 63844 40212</a>
          </div>
          <div class="footer-location-item">
            <div class="footer-location-name">Head Office</div>
            <address class="footer-location-address">Gemini Parsn Apartments, Cathedral Garden Road,<br>Anna Salai, Nungambakkam, Chennai 600 006</address>
          </div>
        </div>
      </div>

      <!-- Contact Column -->
      <div class="footer-col footer-contact-col">
        <h4>Contact</h4>
        <div class="footer-contact-info">
          <a href="tel:+919500128831" class="footer-contact-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.77-.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +91 95001 28831
          </a>
          <a href="tel:+916384484463" class="footer-contact-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.77-.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +91 63844 84463
          </a>
          <a href="mailto:sales@eroyce.in" class="footer-contact-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            sales@eroyce.in
          </a>
          <a href="https://wa.me/916384440214" target="_blank" rel="noopener" class="footer-contact-link footer-wa-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            WhatsApp Chat
          </a>
          <div class="footer-hours">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Mon–Sat, 9am–6pm IST
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom Bar -->
    <div class="container footer-bottom">
      <div class="footer-bottom-copy">© 2026 E Royce Motors India Pvt. Ltd. All rights reserved.</div>
      <nav class="footer-bottom-links" aria-label="Legal links">
        <a href="privacy.html">Privacy Policy</a>
        <span aria-hidden="true" style="color:var(--gray-400)">|</span>
        <a href="terms.html">Terms of Service</a>
        <span aria-hidden="true" style="color:var(--gray-400)">|</span>
        <a href="contact.html">Contact Us</a>
      </nav>
    </div>
  </footer>

  <!-- WhatsApp Floating Button -->
  <a href="https://wa.me/916384440214" target="_blank" rel="noopener" class="wa-floating" aria-label="Chat with E-Royce on WhatsApp" title="Chat on WhatsApp">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
    <span class="wa-tooltip">Chat on WhatsApp</span>
  </a>`;

  // ─── Inject into DOM ───────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    // Inject top bar before body first child
    const body = document.body;
    const topBarEl = document.createElement('div');
    topBarEl.innerHTML = topBarHTML;
    body.insertBefore(topBarEl.firstElementChild, body.firstChild);

    // Inject header after top bar
    const headerEl = document.createElement('div');
    headerEl.innerHTML = headerHTML;
    body.insertBefore(headerEl.firstElementChild, body.children[1]);

    // Inject footer + WhatsApp before end of body
    const footerEl = document.createElement('div');
    footerEl.innerHTML = footerHTML;
    while (footerEl.firstChild) {
      body.appendChild(footerEl.firstChild);
    }

    // Hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');
    if (hamburger && mainNav) {
      hamburger.addEventListener('click', () => {
        const isExp = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExp);
        hamburger.classList.toggle('active');
        mainNav.classList.toggle('open');
        document.body.classList.toggle('menu-open');
      });
      mainNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.classList.remove('active');
          mainNav.classList.remove('open');
          document.body.classList.remove('menu-open');
        });
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('open')) {
          hamburger.setAttribute('aria-expanded', 'false');
          hamburger.classList.remove('active');
          mainNav.classList.remove('open');
          document.body.classList.remove('menu-open');
        }
      });
    }

    // ─── Floating header offset + compact-on-scroll ────────────────────────
    // The top-bar sits in normal page flow (scrolls away naturally). The
    // nav header is position:fixed, floating 16px below it at page-top and
    // snapping to a constant 16px gap once the top-bar has scrolled out of
    // view — so <main> needs top padding sized to the larger (unscrolled)
    // offset, measured rather than guessed so it stays correct across
    // breakpoints (top-bar is hidden below 1200px).
    const topBarNode = document.querySelector('.top-bar');
    const headerNode = document.getElementById('siteHeader');
    const mainNode = document.querySelector('main');
    const GAP = 16;
    let topBarHeight = 0;

    function applyHeaderOffset() {
      topBarHeight = topBarNode ? topBarNode.offsetHeight : 0;
      const headerH = headerNode ? headerNode.offsetHeight : 0;
      document.documentElement.style.setProperty('--topbar-h', topBarHeight + 'px');
      if (mainNode) {
        mainNode.style.paddingTop = (topBarHeight + GAP + headerH + GAP) + 'px';
      }
    }
    applyHeaderOffset();
    window.addEventListener('resize', applyHeaderOffset);
    window.addEventListener('load', applyHeaderOffset);

    function handleHeaderScroll() {
      document.body.classList.toggle('header-scrolled', window.scrollY > topBarHeight);
    }
    handleHeaderScroll();
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  });
})();
