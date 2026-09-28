# E-Royce Website — Project Brief (source of truth for Claude)

Read this whole file before writing any code. Follow it exactly.

## 1. Stack and structure

Plain **HTML + CSS + JavaScript**. No React, Next.js, Tailwind, TypeScript or build tools.

```
/
├── index.html            Home
├── vehicles.html         Complete vehicle lineup
├── ebull.html            Vehicle detail (template 1 of 5)
├── sardar.html           Vehicle detail (same template)
├── spike.html            Vehicle detail (same template)
├── rs90.html             Vehicle detail (same template)
├── rs180.html            Vehicle detail (same template)
├── outlets.html          Outlets, dealer & booking
├── css/style.css         ONE shared stylesheet
├── js/script.js          ONE shared script (nav, tabs, forms)
├── js/config.js          Google Apps Script URL lives here
├── assets/images/        Photos + logo.png
├── assets/icons/         SVG icons exported from Figma
├── design/               Figma PNG exports (reference only, never used in pages)
├── apps-script/Code.gs   Google Sheets backend (paste into Apps Script)
└── README.md
```

## 2. Design reference

- Figma frame exports (2x PNG) are in `/design`. They are the visual target.
- `design/all-frames-overview.jpg` shows all 4 frames side by side (low-res overview).
- The design is **desktop only (1280px)**. Tablet and mobile layouts must be derived (see section 5).

### Design tokens (extracted from Figma — use as CSS variables)

```css
:root {
  --red: #e51a24;          /* primary accent, CTAs, active nav, eyebrow labels */
  --red-tint: #fef2f2;     /* red badge background */
  --red-border: #fecaca;
  --black: #0a0a0a;        /* headings */
  --text: #374151;         /* nav links */
  --body: #4b5563;         /* paragraphs */
  --muted: #6b7280;        /* small labels */
  --gray-400: #9ca3af;
  --gray-300: #d1d5db;
  --border: #e5e7eb;
  --gray-100: #f3f4f6;
  --bg-subtle: #f9fafb;    /* top bar, soft cards */
  --white: #ffffff;        /* DOMINANT background */
  --footer: #0f1115;       /* footer only */
  --footer-2: #14171d;     /* footer CTA strip, footer cards */
  --footer-border: #1f2937;

  --font-head: 'Space Grotesk', sans-serif;   /* headings, buttons (bold) */
  --font-body: 'Hanken Grotesk', sans-serif;  /* body, nav */
  --font-mono: 'JetBrains Mono', monospace;   /* labels, badges, top bar */

  --radius-btn: 6px;
  --radius-card: 12px;
  --radius-canvas: 16px;
  --container: 1280px;
  --gutter: 32px;
  --section-y: 96px;
}
```

Fonts (Google Fonts): Space Grotesk 500/700, Hanken Grotesk 400/500/600/700, JetBrains Mono 400/500/700.

### Component specs taken from Figma

- **Top status bar**: bg `--bg-subtle`, bottom border `--border`, 12px JetBrains Mono. Left: red 8px dot + "DIRECT NETWORK TELEMETRY" / "+91 95001 28831" / "CHENNAI • COIMBATORE • MADURAI" (slashes in `--gray-300`). Right: "ISO 9001:2015 CERTIFIED EV MFG" (muted) + "BHARAT FLEET GRADE" (red, uppercase, 0.6px tracking).
- **Header**: 80px tall, white 95% + 6px backdrop blur, bottom border, shadow `0 2px 12px rgba(0,0,0,.04)`. Logo 48×48 + "eROYCE" (Space Grotesk bold 20px, red ".") + "ELECTRIC VEHICLES" (JetBrains Mono 9px, 0.9px tracking, muted). Nav: Hanken Grotesk 15px medium `--text`, 32px gap; active link red, semibold, 2px red underline. CTA: red, 6px radius, padding 10px 20px, bolt icon, "ENQUIRE NOW" Space Grotesk 14px uppercase 0.7px tracking, shadow `0 4px 7px rgba(229,26,36,.3)`.
- **Section eyebrow**: red 8px dot + JetBrains Mono bold 12px uppercase, 1.2px tracking, red.
- **Section H2**: Space Grotesk bold 36px / 40px line-height, -0.9px tracking, `--black`.
- **Body text**: Hanken Grotesk 16px / 26px, `--body`.
- **Cards**: white, 1px `--border`, 12px radius, subtle shadow `0 1px 2px rgba(0,0,0,.05)`.
- **Primary button**: red bg, white Space Grotesk bold 12–14px uppercase, 6–8px radius.
- **Outline button**: 1px `--gray-300` border, `#1f2937` text.
- **Footer**: see Figma. CTA strip ("Ready to Electrify Your Fleet & Commute?", 30px) on `--footer-2`, then 3 columns (brand 4/12, vehicle lineup 3/12, regional hubs 5/12 as a 2×2 card grid), then copyright row in JetBrains Mono 12px.

## 3. Global rules (from the client — do not break)

1. **Do not simplify, remove, or invent sections.** Every section in the Figma frames must be built.
2. **One unified header and footer on every page.** Use the Home page header/footer. Nav: Home · Vehicles · About Us · Technology · Applications · Outlets & Network · Contact. About/Technology/Applications/Contact link to sections on the Home page (`index.html#about` etc.).
3. **Colour balance: WHITE dominant, RED accent, BLACK text.** Black backgrounds only in the footer.
4. **Never stretch, crop, recolour, or distort the logo.** Always `width` + `height: auto` or `object-fit: contain`.
5. **Never invent specs, prices, phone numbers, map links, or claims.** Use only section 6 and 7 of this file. If data is missing, show a clearly marked placeholder like `[WhatsApp number — to be added]`.
6. **No horizontal scrolling at any width.**
7. **All forms** keep the Figma card styling but submit only **Name, Email, Phone** to Google Sheets (section 8).
8. Figma images that show other brands ("GREEN BULL ENERGY SOLUTIONS", "E-VEE MOBILITY") must be replaced with official E-Royce photos (section 7) before going live.

## 4. Pages and sections (from PDF `eroyce.pdf`)

**Home (`index.html`)**
1. Top status bar + header
2. Hero: "The Efficient Choice for the Future of Electric Mobility." (Future red + underlined), 2 CTAs, vehicle showcase canvas with floating badges (100% ELECTRIC / HIGH TORQUE), and bottom KPI bar (4 metrics).
3. "Pioneering Clean Transportation for Tomorrow's Bharat": 3 pillar cards (Pioneering Drive, Engineering Quality, Eco Manufacturing) → `id="about"`
4. Fleet showcase ("Explore Our Engineered Fleet"): 3 filter tabs, 5 vehicle cards + "Need Custom Fleet Solutions?" card → `id="vehicles"`
5. Applications ("Engineered for Bharat's Demanding Routes"): 4 cards (Last-Mile Cargo, Urban Passenger Transit, Daily Commuting, Industrial Campuses) → `id="applications"`
6. Technology ("Safety, Durability, and Thermal Resilience in Every Weld"): 3 feature rows + Fleet Economics Comparison card → `id="technology"`
7. Direct outlets ("Direct Outlets & Corporate Presence"): 4 location cards → `id="outlets"`
8. Booking form ("Book Your Vehicle or Request Dealership Franchise"): 2 contact cards (WhatsApp, Helpline) + Reserve/Enquire Online Form → `id="contact"`
9. Footer CTA ("Ready to Electrify Your Fleet & Commute?") and standard Footer.

**Vehicles (`vehicles.html`)**
1. Hero: "Engineered for Performance. Built for Reliability." + 4 stat cards (Payload Ceiling, Electric Range Max, Fleet Operating OPEX, Battery Cell Lifecycle).
2. Filter tabs.
3. eBull Electric Carrier row (image left).
4. Sardar Heavy Commercial Auto row (image right).
5. RS180 Flagship eBike / Scooter row (image left).
6. RS90 + Spike City Electric Scooter (two-column bento).
7. TCO Comparison ("Switch to Electric 3-Wheelers: Save Up to ₹1,12,000 / Year"): 3 cards (Diesel 3W, CNG 3W, E-Royce Electric).
8. Specification matrix table ("Vehicle Specification Matrix").
9. Schedule Form ("Experience Silent Velocity First-Hand").
10. Footer.

**Vehicle detail template (`ebull.html` design, reused for all 5)**
1. Breadcrumb + Headline ("EBULL AUTO — HEAVY-DUTY ZERO-EMISSION COMMERCIAL CARRIER").
2. 2 Highlight Cards (Payload Certification, Operating Economics).
3. 16:9 hero image + spec bar (4 specs: Certified Range, Top Speed, Max Grade, Full Charge) + FAME-II eligible ribbon + dual CTAs (Book, Download Spec Sheet).
4. 6 feature cards ("Engineered For Relentless Commercial Duty").
5. 4 application cards ("Purpose-Built For High-Yield Commercial Sectors").
6. 4 spec modules ("Comprehensive Technical Specifications").
7. Enquiry form ("Order or Inquire for Your eBull Fleet") + Loan/Corporate Desk cards.
8. Footer CTA and Footer.

**Outlets (`outlets.html`)**
1. Hero ("Visit an E-Royce Direct Outlet or Book Your EV Online") + 24 HR DISPATCH READY card.
2. 4 Hub cards ("Direct Experience Hubs & Master Centers").
3. Dispatch ribbon ("South India Quick Dispatch Corridor").
4. Split layout: "Book Your Vehicle / Request Test Drive" form (left) + "Become an Authorized E-Royce Dealer" checklist panel + "Institutional Cargo Fleets" banner.
5. "Customer Support & Grievance Registration": 24/7 Breakdown, Warranty & Battery Health, Periodic Maintenance Bay.
6. Grievance form ("Register a Grievance or Ticket").
7. Footer.

## 5. Responsive rules (derived — not in Figma)

- **≥1200px**: match Figma exactly.
- **768–1199px**: nav collapses to a hamburger menu (slide-down panel). 4-column grids → 2 columns. 3-column → 2 columns. Split layouts (text + form, image + specs) stack.
- **<768px**: single column everywhere. Hero floating badges sit below the image instead of on it. Form fields full width. Footer stacks. Spec tables scroll inside their card (`overflow-x: auto`), never the page.
- **<380px**: reduce H1 to ~32px, section padding to 56px, gutter to 16px.
- Test at 375, 768, 1024, 1280, 1440.

## 6. Contact details (verified on eroyce.in)

- **Company**: E-Royce Motors India Pvt. Ltd. — in EVs since 2017, 32,000 sq ft manufacturing facility in Coimbatore.
- **Corporate Office**: Cathedral Garden Road, Anna Salai, Nungambakkam, Chennai – 600 006
- **Head Office & Plant I**: SF No 283/2A, Vadasithur Road, Kondampatti Village, Kinathukadavu, Coimbatore, Tamil Nadu 641202
- **Plant II**: No.118/11, Burkoni Vindhansaba, Raipur, Chhattisgarh
- **Phones**: +91 95001 28831 · +91 63844 84463 · +91 63844 40204
- **Email**: sales@eroyce.in
- **Instagram**: https://www.instagram.com/eroycemotorsindia/
- **Facebook**: https://www.facebook.com/eRoycemotors

**Direct outlets**

| Outlet | Address | Phone | Email |
|---|---|---|---|
| E Royce Coimbatore | Pollachi Main Road, Eachanari, Coimbatore – 641 021 | +91 63844 40214 | sales.ho@eroycemotors.com |
| E Royce Chennai | 21, Ground Floor, Old GST Rd, Peerkankaranai, Chennai – 600 063 | +91 63844 40216 | chennai.ro@eroyce.in |
| E Royce Madurai | B-3, Pandi Kovil Ring Road, Guru Hospital (opp.), Madurai – 625 020 | +91 63844 40212 | sales_mro@eroyce.in |
| Corporate Office | Cathedral Garden Road, Anna Salai, Nungambakkam, Chennai – 600 006 | +91 95001 28831 | sales@eroyce.in |

- **Directions buttons**: use a Google Maps search of the exact address, e.g. `https://www.google.com/maps/search/?api=1&query=` + URL-encoded address.
- **WhatsApp**: NOT AVAILABLE YET — leave the WhatsApp link as `href="#"` with a `<!-- TODO: WhatsApp number -->` comment.
- **Figma text that is NOT verified**: "ISO 9001:2015", "ARAI & FAME-II Compliance", "Open Today", opening hours, "24 HR dispatch". Keep the design slots, but confirm wording with the client before launch.

## 7. Vehicle data (verified on eroyce.in — use ONLY these numbers)

> ⚠️ The Figma file shows different numbers (e.g. RS180 "85 km/h, 4.2 kW"). Those are NOT real. Always use the table below.

| Spec | eBull | Sardar | Spike | RS90 | RS180 |
|---|---|---|---|---|---|
| Type | Electric cargo 3-wheeler | Electric auto (commercial) | Electric scooter | Electric scooter | Electric scooter |
| Top speed | 25 km/h | 60 km/h | 25 km/h | 25 km/h | 25 km/h |
| Range | 50–110 km/charge | 90–100 km/charge | 70–80 km/charge | 50–90 km/charge | 50–90 km/charge |
| Charging time | 8 hrs | 4 hrs | 4 hrs | 4 hrs | 4 hrs |
| Motor type | BLDC/PMSM | BLDC hub motor | BLDC | BLDC | BLDC |
| Motor power | 1500W–2500W | — | 250W | 250W | 250W |
| Battery | LFP | Li-ion 2.3 kW | Lithium | LFP | LFP |
| Operating voltage | 60V/72V | 60V | 60V | 60V/72V | 60V/72V |
| Payload | 500 kg / 750 kg | — | 150 kg | Rider + 150 kg | Rider + 180 kg |
| Braking | Mechanical/Hydraulic | — | F-Disc / R-Drum | F-Drum / R-Disc | F-Drum / R-Disc |
| Dimensions (mm) | 2750 × 1000 × 1770 | — | 1800 × 700 × 1100 | 1800 × 690 × 1050 | 1940 × 690 × 1050 |
| Tyre size | 3.75-12 / 4.00-12 in | — | 90/100-10 in tubeless | 90/90-12 in tubeless | 90/100-10 in tubeless |
| Ground clearance | 160 mm | — | 160 mm | 160 mm | 160 mm |
| Speedometer | Digital | — | Digital | Digital | Digital |
| Key features | — | Anti-theft, keyless entry | Anti-theft, keyless entry | Anti-theft, keyless entry | Anti-theft, keyless entry |
| Motor warranty | 12 months | — | 12 months | 12 months | 12 months |
| Battery warranty | 36 months | — | 36 months | 36 months | 36 months |
| RTO registration | Applicable | — | Not applicable | Not applicable | Not applicable |
| ICAT / ARAI approved | Yes | — | Yes | Yes | Yes |
| Colours | — | Black, Blue, Grey, Peach, Red | Red, Blue, White | Blue, Dark Blue, Grey, Red | Black, Grey, Yellow |
| Official page | /e-royce-e-bull-electric-auto-commercial-ev/ | /e-royce-sardar-electric-auto-commercial-ev-online/ | /eroyce-spike-stylish-battery-vehicle-coimbatore-tamilnadu/ | /e-royce-rs-90-electric-scooter-price-battery-scooter-india/ | /ebike-rs180/ |

"—" = not published. Leave it out; do not fill it in.

No prices are published. Do not show prices.

**Official product images (download into `assets/images/`)**
- eBull: https://eroyce.in/wp-content/uploads/2024/02/main-ebull.png
- Sardar: https://eroyce.in/wp-content/uploads/2024/02/1-4.jpg
- Spike: https://eroyce.in/wp-content/uploads/2024/02/Spike-Red1-1.png
- RS90: https://eroyce.in/wp-content/uploads/2024/02/1-10.png
- RS180: https://eroyce.in/wp-content/uploads/2024/03/1.png
- Each product page on eroyce.in also has a 9-photo gallery (`/wp-content/uploads/2024/03/row-1-column-1-*.jpg` etc.).

## 8. Backend, database and API (Google Apps Script + Google Sheets)

- Backend = ONE Google Apps Script web app (`apps-script/Code.gs`). Database = one Google Sheet with one tab per form.
- `js/config.js` holds: `const SHEET_URL = "PASTE_WEB_APP_URL_HERE";`
- **Enquiry / booking / test-drive forms** (Home, Vehicles, every vehicle page, Outlets booking): collect only **Name, Email, Phone** → tab `Enquiries`: Timestamp | Name | Email | Phone | Vehicle | Source.
  (Vehicle is filled automatically from the page, not asked of the user.)
- **Dealer application** (Outlets page) → tab `Dealers`: Timestamp | Name | Email | Phone | City.
- **Grievance ticket** (Outlets page) → tab `Grievances`: Timestamp | Ticket ID | Name | Phone | Vehicle Reg/VIN | Issue Category | Description | Status. Returns a ticket ID like `ER-GRV-000123`.
- **Warranty check** (Outlets page) → reads tab `Warranty` (Chassis No | Model | Warranty Until | Notes), which the E-Royce team fills in manually. If the number is not found, say "Not found — please contact support." NEVER fabricate a result.
- Submit with `fetch(SHEET_URL, { method: "POST", body: new URLSearchParams(data) })`; warranty check uses GET `?action=warranty&chassis=...`.
- Show inline loading, success ("Thank you — our team will call you shortly.") and error states. Disable the button while sending. No `alert()` popups.

## 9. Still pending from the client

- WhatsApp number (leave as marked TODO)
- Payment button requirements (not in the design — do not build a payment flow; leave no placeholder in the UI)
- Replacement photos for the Figma images showing other brands
- Confirmation of unverified Figma wording (ISO, ARAI/FAME-II, opening hours)
