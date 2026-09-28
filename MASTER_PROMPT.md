# MASTER PROMPT — E-Royce website (full build)

You are a senior frontend engineer, backend engineer and deployment engineer. Build the complete E-Royce website in this folder: frontend, backend (API), database, SEO, testing, and deployment setup.

`PROJECT_BRIEF.md` is the single source of truth. Read it completely before doing anything. If this prompt and the brief ever disagree, the brief wins. Look at every image in `/design` before building any page.

## How to work

- Work **phase by phase**, in order. Finish a phase completely, test it in the browser, then give me a 3–5 line summary and **wait for me to reply "next"** before starting the next phase.
- When something needs me (a Google login, a URL, a missing file), stop and list it under **USER ACTION NEEDED** with exact click-by-click steps. Never guess or fake it.
- Plain HTML, CSS and JavaScript only. No React, Next.js, Tailwind, TypeScript, jQuery, Bootstrap or build tools. The only outside resources allowed are Google Fonts.
- Never invent specs, prices, phone numbers, addresses, map links, WhatsApp numbers, certifications or customer data. Use only sections 6 and 7 of the brief. The Figma PNGs contain fake numbers, so do not copy numbers from the images.
- Never stretch or distort the logo or any image.
- There must be no horizontal scrolling at any screen width.
- Keep the code clean and commented so a beginner can maintain it.

---

## PHASE 0 — Audit (no code yet)

1. Read `PROJECT_BRIEF.md`.
2. List the files in `/design`, `/assets/images` and `/assets/icons`.
3. Report:
   - whether `eroyce.pdf` exists
   - which photos and icons are present or missing
   - anything in the brief you find unclear
4. If the design PDF is missing, stop and ask me for it.
5. Download the official product images listed in brief section 7 into `assets/images/`, named `ebull.png`, `sardar.jpg`, `spike.png`, `rs90.png`, `rs180.png`. If a download fails, tell me the URL so I can save it manually.

## PHASE 1 — Foundation and shared layout

- `css/style.css`: all design tokens from brief section 2 as CSS variables, Google Fonts, reset, base typography, container, buttons (primary, outline, dark), cards, badges/pills, eyebrow label, section heading, form inputs, and the breakpoints from brief section 5.
- Shared **top status bar, header and footer**, matching the Home frame exactly.
  - Header: sticky, with a working hamburger menu below 1200px. The menu must be keyboard accessible, close on Escape and close when a link is tapped.
  - Nav order: Home · Vehicles · About Us · Technology · Applications · Outlets & Network · Contact.
  - Highlight the active page in red.
- Use the same header and footer markup on every page (copy it identically). Add a comment `<!-- SHARED HEADER: keep identical on all pages -->`.
- `js/script.js`: mobile menu, active nav link, smooth scroll for `#` links, scroll-reveal fade-in (disabled when `prefers-reduced-motion` is set).
- Favicon made from `assets/images/logo.png` (keep its proportions).
- Create `index.html` with just the header and footer. Test at 375, 768 and 1280px.

## PHASE 2 — Home page (`index.html`)

- Build every section listed in brief section 4 (Home), in order, matching `eroyce.pdf` Page 1.
- Section ids: `about`, `vehicles`, `applications`, `technology`, `outlets`, `contact`.
- The fleet filter tabs (All / Commercial 3-Wheelers / Electric 2-Wheelers) must filter the cards with JS.
- "View Vehicle" buttons link to `ebull.html`, `sardar.html`, `spike.html`, `rs90.html`, `rs180.html`.
- "Specs" buttons link to the spec section of each vehicle page.
- Vehicle card metrics come ONLY from brief section 7. Pick 3 real specs per vehicle, e.g. Range / Top speed / Charging time.
- KPI cards and the cost section: keep the Figma layout, but show only real, verifiable facts from the brief. Examples: "Since 2017", "32,000 sq ft Coimbatore plant", "LFP batteries", "36-month battery warranty", "3 direct outlets". Remove any ₹/km or savings figure unless it appears in the brief.
- Outlet cards: data from brief section 6. Include tel: and mailto: links, and Directions buttons as Google Maps search links.
- The booking form shows only Name, Email and Phone (wire it up in Phase 6).

## PHASE 3 — Vehicle detail template and 5 vehicle pages

- Build `ebull.html` to match `eroyce.pdf` Page 2, using all sections from brief section 4.
- Create `sardar.html`, `spike.html`, `rs90.html` and `rs180.html` from the **same template**. Only the content changes, never the layout.
- Store all vehicle data in ONE file, `js/vehicles-data.js`, with one object per vehicle using exactly the data from brief section 7. The pages render their spec tables, hero spec bar and colour list from this file, so specs can be updated in one place.
- If a vehicle has no data for a card or spec row, leave it out. Never write "N/A" filler or invented text.
- Add a colour list where the brief has colours.
- Add a breadcrumb: Home / Vehicles / {Model}.
- Every page gets a unique `<title>` and meta description.

## PHASE 4 — Vehicles page (`vehicles.html`)

- Build all sections from brief section 4 (Vehicles), matching `eroyce.pdf` Page 4.
- The filter tabs work.
- Render the spec comparison table from `js/vehicles-data.js`. On mobile it scrolls inside its card, never the page.
- The Figma TCO/cost comparison uses unverified numbers. Keep the card layout, but replace the figures with the real, verifiable spec comparisons from the brief, or remove the numbers and add `<!-- TODO: client to supply verified running-cost figures -->`. Tell me which option you chose.

## PHASE 5 — Outlets page (`outlets.html`)

- Build all sections from brief section 4 (Outlets), matching `eroyce.pdf` Page 3.
- Show the 4 outlet cards from brief section 6.
- WhatsApp buttons: `href="#"` with a visible "WhatsApp — coming soon" state and a `<!-- TODO: WhatsApp number -->` comment.
- The booking form (Name, Email, Phone plus the vehicle picker cards from Figma; the chosen vehicle is sent as the `vehicle` field).
- Dealer application panel with its form: Name, Email, Phone, City.
- 3 support cards, including the warranty chassis-number check.
- Grievance form with the fields from brief section 8.

## PHASE 6 — Backend, database and API (Google Apps Script + Google Sheets)

Rewrite `apps-script/Code.gs` as one small REST-style API.

**`doPost(e)`** routes on `e.parameter.action`:

| action | Required fields | Sheet tab | Returns |
|---|---|---|---|
| `enquiry` | name, email, phone (+ vehicle, source, auto-filled) | `Enquiries` | `{ok:true}` |
| `dealer` | name, email, phone, city | `Dealers` | `{ok:true}` |
| `grievance` | name, phone, vin, category, description | `Grievances` | `{ok:true, ticketId:"ER-GRV-000123"}` (Status column starts as "Open") |

**`doGet(e)`**:
- `action=warranty&chassis=XXXX`: looks up the `Warranty` tab and returns `{ok:true, found:true, model, warrantyUntil, notes}` or `{ok:true, found:false}`.
- `action=health`: returns `{ok:true}`.

Requirements:
- Auto-create each tab with bold, frozen headers the first time it is used.
- Validate on the server as well as in the browser: email format, Indian phone number (10 digits, optional +91), required fields, maximum lengths.
- Block spam: a hidden honeypot field `website` must be empty, and a `LockService` lock around each write.
- Prevent formula injection: strip leading `= + - @` from text fields, and store the phone with a leading `'`.
- Send an optional email alert with `MailApp` to the address in `const NOTIFY_EMAIL = ""`. If it's left empty, don't send.
- Always return JSON through `ContentService`. Never expose stack traces.

Frontend: `js/api.js` with `submitForm(action, data)` and `checkWarranty(chassis)`.
- Use `fetch(SHEET_URL, {method:"POST", body:new URLSearchParams(...)})` so there's no CORS preflight.
- Add a 15-second timeout, a disabled button with a spinner while sending, inline success and error messages, and reset the form on success.
- If `SHEET_URL` is still the placeholder, show "Form not connected yet" instead of failing silently.

Then write `apps-script/SETUP.md` with click-by-click steps:
1. Create the Google Sheet.
2. Open Extensions → Apps Script and paste the code.
3. Deploy as a Web app (Execute as: Me; Who has access: Anyone).
4. Copy the URL into `js/config.js`.
5. Redeploy as a **new version** after every code change.
6. Add warranty records to the `Warranty` tab.
7. Test each form.

List these steps under USER ACTION NEEDED. Test end to end once I give you the URL.

## PHASE 7 — SEO, performance, accessibility

- Every page gets a unique title, meta description, canonical URL, Open Graph and Twitter tags (image = logo or the vehicle photo), and `lang="en"`.
- Add JSON-LD structured data: `Organization` on the home page with the verified contacts, and `Product` on each vehicle page (no price, no rating).
- Add `sitemap.xml`, `robots.txt` and a styled `404.html` with the shared header and footer.
- Images:
  - add `width`/`height` attributes
  - add `loading="lazy"` below the fold
  - add meaningful alt text
  - compress anything over 400 KB, keeping a high-quality original
- Accessibility:
  - semantic landmarks
  - one `<h1>` per page
  - labels on every input
  - visible focus styles
  - AA colour contrast
  - buttons that are real `<button>`s or links
- Aim for Lighthouse 90+ in all four categories. Run it and report the scores.

## PHASE 8 — Full QA

Test every page at 360, 375, 414, 768, 1024, 1280 and 1440px, and check:
- no horizontal scroll (run `document.documentElement.scrollWidth > innerWidth` at each width)
- header/menu works, all nav and footer links work, every View Vehicle and Specs button works
- tel:, mailto: and directions links are correct
- filter tabs work
- every form shows its validation, loading, success and error states
- no console errors, no broken images, logo never distorted
- no number on the site that isn't in brief section 7

Fix everything you find, then give me a checklist of results.

## PHASE 9 — Git, GitHub and deployment

- Add `.gitignore` (ignore `.DS_Store`, `node_modules`, `.env`, `design/` exports larger than 10 MB), run `git init`, and make the first commit.
- Add `netlify.toml`:
  - publish directory `.`
  - custom 404 page
  - security headers (X-Content-Type-Options, Referrer-Policy, X-Frame-Options)
  - a long cache time for `/assets/*`
- Write `README.md` covering:
  - what the project is
  - folder structure
  - how to run it locally (Live Server)
  - how to edit vehicle specs (`js/vehicles-data.js`)
  - how to connect or redeploy the Apps Script backend
  - how to deploy
  - how to connect a custom domain
- USER ACTION NEEDED, step by step:
  1. Create a GitHub repository and push.
  2. Connect it to Netlify (Import from Git).
  3. Check the live site and test the forms on the live URL.
  4. Add the custom domain in Netlify and update DNS at the registrar (A record `75.2.60.5` or the records Netlify shows, plus a CNAME for `www`), and confirm HTTPS.

## PHASE 10 — Handover

Give me a final report:
- all pages and their URLs
- what's connected
- what's still pending: the WhatsApp number, payment requirements, replacement photos for images showing other brands, confirmation of the ISO/ARAI wording, and running-cost figures
- exactly how to add each pending item later

---

Start with **PHASE 0** now.
