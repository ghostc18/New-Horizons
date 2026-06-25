# Google Sheets Lead Backend

This site runs on GitHub Pages, so form submissions need an external receiver. The included Apps Script writes each lead into a Google Sheet.

## 1. Create the sheet

1. Create a Google Sheet named `New Horizons Leads`.
2. Open `Extensions` > `Apps Script`.
3. Delete the starter code.
4. Paste the code from `backend/google-apps-script.js`.
5. Save the project.

## 2. Deploy the web app

1. In Apps Script, click `Deploy` > `New deployment`.
2. Choose type `Web app`.
3. Set `Execute as` to `Me`.
4. Set `Who has access` to `Anyone`.
5. Click `Deploy`.
6. Authorize the script.
7. Copy the Web app URL. It ends with `/exec`.

## 3. Connect the website

1. Open `js/leads.js`.
2. Replace the empty endpoint value with your Apps Script Web app URL:

```js
const LEAD_ENDPOINT_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
```

3. Commit and push:

```powershell
git add .
git commit -m "Connect lead forms to Google Sheets"
git push
```

GitHub Pages will update automatically after the push.

## Columns Captured

- Submitted At
- Form Type
- Name
- Phone
- Email
- Address
- Timeline
- Condition
- Message
- Page URL
- Source
- User Agent
