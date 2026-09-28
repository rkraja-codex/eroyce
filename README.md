# E-Royce Electric Vehicles Website

This is the front-end codebase for the official E-Royce Motors website. Built with clean HTML, CSS, and Vanilla JavaScript, ensuring fast performance, zero dependencies, and high maintainability.

## Folder Structure

- `/assets/images/` - Product photos and branding assets.
- `/css/` - Global stylesheets. `style.css` contains all styles and tokens.
- `/js/` - Frontend logic.
  - `vehicles-data.js` - Central source of truth for all vehicle specifications.
  - `script.js` - UI logic (tabs, mobile menu, forms).
  - `vehicle.js` - Dynamically populates vehicle spec tables.
- `/apps-script/` - Google Apps Script backend code for processing form submissions.
- `*.html` - Static pages.

## How to run locally

1. Use a local server like **Live Server** in VS Code.
2. Open `index.html`.

## How to edit vehicle specs

All specifications are stored centrally in `js/vehicles-data.js`.
1. Open `js/vehicles-data.js`.
2. Find the vehicle object you want to edit.
3. Update the key-value pair under `specs`. The changes will instantly reflect on the vehicle's detail page and the comparison matrix on the Vehicles page.

## Connecting the Apps Script Backend

1. Create a new Google Sheet.
2. Go to **Extensions > Apps Script** and paste the code from `apps-script/Code.gs`.
3. Deploy as a Web App (Execute as: Me; Who has access: Anyone).
4. Copy the Web App URL.
5. Open `js/script.js` and replace `const GOOGLE_SCRIPT_URL = 'YOUR_SCRIPT_URL_HERE';` with your URL.

## Deployment to Netlify

1. Push this repository to GitHub.
2. Log in to Netlify and choose **Import from Git**.
3. Select your repository. The `netlify.toml` file will automatically configure headers and cache rules.
4. Deploy!

## Custom Domain

1. In Netlify, go to **Domain management > Add custom domain**.
2. Enter your domain (e.g., `eroyce.in`).
3. Update your DNS registrar with the A record and CNAME shown in Netlify.
4. Wait for propagation and verify HTTPS.
