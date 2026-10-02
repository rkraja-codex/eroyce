const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = process.env.VERCEL ? '/tmp/submissions.json' : path.join(__dirname, 'submissions.json');

app.use(cors());
app.use(express.json());
app.use(express.text({ type: '*/*' }));

// Serve static files locally (Vercel does this automatically)
if (!process.env.VERCEL) {
  app.use(express.static(path.join(__dirname, '../')));
}
// Prepare for Google Sheets integration
// Uncomment and configure these when ready to use Google Sheets:
// const { GoogleSpreadsheet } = require('google-spreadsheet');
// const { JWT } = require('google-auth-library');

app.post('/api/submit', async (req, res) => {
  try {
    let dataObj;
    if (typeof req.body === 'string') {
      try { dataObj = JSON.parse(req.body); } catch(e) { dataObj = { message: req.body }; }
    } else {
      dataObj = req.body;
    }

    dataObj.timestamp = new Date().toISOString();

    // Check if Google Sheets is configured
    if (process.env.GOOGLE_SHEETS_ID && process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      /*
      const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID, serviceAccountAuth);
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];
      
      // Convert dataObj to row format matching your sheet headers
      await sheet.addRow(dataObj);
      */
    } else {
      // Fallback to local JSON if no Google Sheets credentials
      let submissions = [];
      if (fs.existsSync(DATA_FILE)) {
        submissions = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      }
      submissions.push(dataObj);
      fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
    }

    res.status(200).json({ status: 'success', message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error handling submission:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// For Vercel Serverless Function export
module.exports = app;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}
