# Lead Form Setup

The site is static, so the form needs two external services:

- EmailJS for website email notifications.
- Google Apps Script for saving leads to Google Sheets.

Successful full-form submissions redirect to `thank-you.html`.

## 1. EmailJS

The website uses `js/leads.js`.

Current values:

```js
serviceId: "service_xgvc5pa"
businessTemplateId: "template_7f7aqwc"
publicKey: "EisHia78uRV6zncJE"
businessEmail: "isaiahjrod5@gmail.com"
```

To send the seller an automatic confirmation email, create a second EmailJS template and paste its ID here:

```js
customerTemplateId: "YOUR_CUSTOMER_TEMPLATE_ID"
```

The EmailJS templates should support these variables:

- `to_email`
- `reply_to`
- `name`
- `phone`
- `email`
- `address`
- `timeline`
- `condition`
- `message`
- `sms_consent`
- `sms_consent_timestamp`
- `sms_consent_language`
- `lead_date`
- `page_url`
- `source`
- `subject`

## 2. Google Sheet

1. Create a Google Sheet named `New Horizons Leads`.
2. Open `Extensions` > `Apps Script`.
3. Delete the starter code.
4. Paste the code from `backend/google-apps-script.js`.
5. Save the project.

## 3. Deploy The Apps Script Web App

1. In Apps Script, click `Deploy` > `New deployment`.
2. Choose type `Web app`.
3. Set `Execute as` to `Me`.
4. Set `Who has access` to `Anyone`.
5. Click `Deploy`.
6. Authorize the script.
7. Copy the Web app URL ending in `/exec`.

## 4. Connect The Website To The Sheet

Open `js/leads.js` and paste the Apps Script URL:

```js
spreadsheetEndpointUrl: "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

## What Happens On Submit

1. The full form sends the business notification through EmailJS.
2. If `customerTemplateId` is filled in, EmailJS sends the seller confirmation.
3. If `spreadsheetEndpointUrl` is filled in, the lead posts to Google Sheets.
4. The seller is redirected to `thank-you.html`.

The Apps Script backend also sends owner and customer emails through Google if you use it. If you do not want duplicate emails, either leave `customerTemplateId` empty in `js/leads.js` or remove the `notifyBusiness_` / `notifyCustomer_` calls from `backend/google-apps-script.js`.

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
- SMS Consent
- SMS Consent Timestamp
- SMS Consent Language
- Page URL
- Source
- User Agent

## A2P / SMS Consent Notes

The full contact form includes a required, unchecked SMS consent checkbox. The language includes message frequency, message/data rates, STOP, HELP, and states that consent is not a condition of purchase.

The site also includes bottom-page `Privacy Policy` and `SMS Terms` sections. The privacy policy states that mobile opt-in data and SMS consent are not shared with third parties or affiliates for marketing or promotional purposes.

For campaign registration, use screenshots or page URLs showing:

- The phone field.
- The unchecked SMS consent checkbox.
- The linked Privacy Policy and SMS Terms.
- The bottom-page privacy language.
