const SHEET_MAP = {
  contact:    'Contact',
  booking:    'Bookings',
  dealership: 'Dealership Enquiry'
};

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
    console.error('doPost error: ' + err + (err && err.stack ? '\n' + err.stack : ''));
    return jsonResponse_({ success: false, status: 'error', message: 'Unable to submit the form. Please try again.' });
  }
}

function doOptions(e) {
  return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.TEXT);
}

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
