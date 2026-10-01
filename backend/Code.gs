/*************************************************************************
 * E-ROYCE MOTORS — GOOGLE APPS SCRIPT BACKEND
 * One Web App endpoint that receives all website form submissions and
 * appends each one as a new row in the correct worksheet of the Google
 * Sheet this script is bound to.
 *
 * Forms currently live on the website (verified by inspecting the
 * frontend — there are no other forms in the project right now):
 *   1. Contact form        — frontend/contact.html             formType: "contact"
 *   2. Book Your Vehicle   — frontend/book.html                formType: "booking"
 *   3. Dealership Enquiry  — frontend/dealership-entities.html  formType: "dealership"
 *
 * All three pages already POST to the same deployed Web App URL
 * (see GOOGLE_SCRIPT_URL inside each page's <script> block), so no
 * frontend changes are required to use this file — only deploy it.
 *
 * DEPLOYMENT
 *   1. Open the Google Sheet that should receive submissions.
 *   2. Extensions -> Apps Script.
 *   3. Replace the contents of Code.gs with this entire file.
 *   4. Save.
 *   5. Deploy -> New deployment -> type: Web app.
 *        Execute as: Me
 *        Who has access: Anyone
 *   6. Deploy, authorize when prompted, copy the Web App URL.
 *   7. If the URL differs from the one already in the frontend, update
 *      the GOOGLE_SCRIPT_URL constant in: frontend/book.html,
 *      frontend/contact.html, frontend/dealership-entities.html.
 *************************************************************************/

/*************************************************
 * CONFIGURATION
 * Map each formType value sent by the website to the exact worksheet
 * (tab) name it should be written to. Rename the values on the right
 * to match your actual spreadsheet tabs — they are NOT auto-discovered
 * from the spreadsheet, since this script has no prior access to it.
 * If a tab with this name does not exist, it is created automatically
 * (existing tabs and their data are never touched, cleared, or renamed).
 *************************************************/
const SHEET_MAP = {
  contact:    'Contact',
  booking:    'Bookings',
  dealership: 'Dealership Enquiry'
};

/*************************************************
 * FORM FIELD DEFINITIONS
 * Column order = row order written to the sheet. "required" fields are
 * validated before anything is written. These match the exact field
 * names each form's JS currently sends (see each page's fetch() body).
 *************************************************/
const FORM_SCHEMAS = {
  contact: {
    required: ['name', 'email', 'phone', 'message'],
    columns: [
      { header: 'Timestamp', field: '__timestamp' },
      { header: 'Name',      field: 'name' },
      { header: 'Email',     field: 'email' },
      { header: 'Phone',     field: 'phone' },
      { header: 'Subject',   field: 'subject' },
      { header: 'Message',   field: 'message' }
    ]
  },
  booking: {
    required: ['name', 'phone', 'email', 'vehicle', 'location'],
    columns: [
      { header: 'Timestamp', field: '__timestamp' },
      { header: 'Name',      field: 'name' },
      { header: 'Phone',     field: 'phone' },
      { header: 'Email',     field: 'email' },
      { header: 'Vehicle',   field: 'vehicle' },
      { header: 'Colour',    field: 'color' },
      { header: 'Location',  field: 'location' },
      { header: 'Message',   field: 'message' },
      { header: 'Source',    field: 'source' }
    ]
  },
  dealership: {
    required: ['name', 'phone', 'email', 'city'],
    columns: [
      { header: 'Timestamp',      field: '__timestamp' },
      { header: 'Name',           field: 'name' },
      { header: 'Phone',          field: 'phone' },
      { header: 'Email',          field: 'email' },
      { header: 'City',           field: 'city' },
      { header: 'Business Type',  field: 'businessType' },
      { header: 'Message',        field: 'message' }
    ]
  }
};

/*************************************************
 * ENTRY POINTS
 *************************************************/
function doGet(e) {
  return jsonResponse_({ status: 'ok', message: 'E-Royce form backend is live.' });
}

function doPost(e) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      return jsonResponse_({ success: false, status: 'error', message: 'Script must be bound to a Google Sheet.' });
    }

    const data = parseRequestBody_(e);
    if (!data) {
      return jsonResponse_({ success: false, status: 'error', message: 'Invalid or empty request body.' });
    }

    const formType = (data.formType || '').toString().trim();
    const schema = FORM_SCHEMAS[formType];
    const sheetName = SHEET_MAP[formType];

    if (!formType || !schema || !sheetName) {
      return jsonResponse_({
        success: false,
        status: 'error',
        message: 'Unknown form type: "' + formType + '". Expected one of: ' + Object.keys(SHEET_MAP).join(', ')
      });
    }

    const missing = getMissingFields_(data, schema.required);
    if (missing.length > 0) {
      return jsonResponse_({
        success: false,
        status: 'error',
        message: 'Required fields are missing: ' + missing.join(', ')
      });
    }

    const sheet = getOrCreateSheet_(spreadsheet, sheetName, schema.columns.map(c => c.header));
    const timestamp = new Date();
    const row = schema.columns.map(col => {
      if (col.field === '__timestamp') return timestamp;
      const value = data[col.field];
      return (value === undefined || value === null) ? '' : value;
    });

    sheet.appendRow(row);

    return jsonResponse_({ success: true, status: 'success', message: 'Form submitted successfully.' });
  } catch (err) {
    // Full error goes to the Apps Script execution log only — never to the client.
    console.error('doPost error: ' + err + (err && err.stack ? '\n' + err.stack : ''));
    return jsonResponse_({ success: false, status: 'error', message: 'Unable to submit the form. Please try again.' });
  }
}

// Handles CORS preflight requests from browsers.
function doOptions(e) {
  return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.TEXT);
}

/*************************************************
 * HELPERS
 *************************************************/

// The frontend posts with Content-Type: text/plain (to avoid CORS preflight
// failures on Apps Script), so the JSON body always arrives in e.postData.contents.
function parseRequestBody_(e) {
  if (!e || !e.postData || !e.postData.contents) return null;
  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    return null;
  }
}

function getMissingFields_(data, requiredFields) {
  return requiredFields.filter(field => {
    const value = data[field];
    return value === undefined || value === null || value.toString().trim() === '';
  });
}

// Returns the named sheet, creating it (with a bold, frozen header row)
// only if it does not already exist. Never clears or alters existing sheets.
function getOrCreateSheet_(spreadsheet, sheetName, headers) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
