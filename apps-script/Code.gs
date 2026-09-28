function doPost(e) {
  const sheetId = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with actual Spreadsheet ID
  let doc;
  try {
    doc = SpreadsheetApp.openById(sheetId);
  } catch (err) {
    // If ID is not set or accessible, fallback gracefully (useful if just deployed)
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Spreadsheet ID not configured correctly.' }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
  
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Invalid JSON data' }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
  
  const formType = data.formType;
  let sheetName = '';
  let rowData = [];
  const timestamp = new Date();
  
  if (formType === 'contact') {
    sheetName = 'Contact';
    rowData = [timestamp, data.name || '', data.email || '', data.phone || ''];
  } else if (formType === 'booking') {
    sheetName = 'Bookings';
    rowData = [timestamp, data.name || '', data.email || '', data.phone || '', data.vehicle || ''];
  } else if (formType === 'dealer') {
    sheetName = 'Dealers';
    rowData = [timestamp, data.name || '', data.email || '', data.phone || '', data.city || ''];
  } else if (formType === 'grievance') {
    sheetName = 'Grievances';
    rowData = [timestamp, data.name || '', data.phone || '', data.vin || '', data.category || '', data.description || ''];
  } else {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: 'Unknown form type' }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
  
  let sheet = doc.getSheetByName(sheetName);
  
  // Create sheet if it doesn't exist
  if (!sheet) {
    sheet = doc.insertSheet(sheetName);
    // Add headers based on type
    if (formType === 'contact') sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone']);
    if (formType === 'booking') sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Vehicle']);
    if (formType === 'dealer') sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'City']);
    if (formType === 'grievance') sheet.appendRow(['Timestamp', 'Name', 'Phone', 'VIN', 'Category', 'Description']);
    
    // Freeze header row
    sheet.setFrozenRows(1);
    // Bold headers
    sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight('bold');
  }
  
  sheet.appendRow(rowData);
  
  return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Data saved successfully' }))
                       .setMimeType(ContentService.MimeType.JSON);
}

// Add CORS headers support for preflight requests
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}
