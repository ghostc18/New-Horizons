const SHEET_NAME = "Leads";
const BUSINESS_EMAIL = "isaiahjrod5@gmail.com";
const BUSINESS_NAME = "New Horizons";

const HEADERS = [
  "Submitted At",
  "Form Type",
  "Name",
  "Phone",
  "Email",
  "Address",
  "Timeline",
  "Condition",
  "Message",
  "SMS Consent",
  "SMS Consent Timestamp",
  "SMS Consent Language",
  "Page URL",
  "Source",
  "User Agent"
];

function doPost(e) {
  const data = e && e.parameter ? e.parameter : {};

  if (data.company_website) {
    return json_({ ok: true });
  }

  appendLeadRow_(data);
  notifyBusiness_(data);
  notifyCustomer_(data);

  return json_({ ok: true });
}

function doGet() {
  return json_({ ok: true, service: "New Horizons lead intake" });
}

function appendLeadRow_(data) {
  const sheet = getLeadSheet_();

  sheet.appendRow([
    new Date(),
    data.form_type || "",
    data.name || "",
    data.phone || "",
    data.email || "",
    data.address || "",
    data.timeline || "",
    data.condition || "",
    data.message || "",
    data.sms_consent || "",
    data.sms_consent_timestamp || "",
    data.sms_consent_language || "",
    data.page_url || "",
    data.source || "",
    data.user_agent || ""
  ]);
}

function notifyBusiness_(data) {
  const subject = "New Horizons lead request";
  const body = [
    "A new lead request was submitted.",
    "",
    `Name: ${data.name || ""}`,
    `Phone: ${data.phone || ""}`,
    `Email: ${data.email || ""}`,
    `Address: ${data.address || ""}`,
    `Timeline: ${data.timeline || ""}`,
    `Condition: ${data.condition || ""}`,
    `SMS Consent: ${data.sms_consent || ""}`,
    `SMS Consent Timestamp: ${data.sms_consent_timestamp || ""}`,
    "",
    "Message:",
    data.message || "",
    "",
    `Page URL: ${data.page_url || ""}`,
    `Source: ${data.source || ""}`
  ].join("\n");

  MailApp.sendEmail({
    to: BUSINESS_EMAIL,
    subject,
    body,
    replyTo: data.email || BUSINESS_EMAIL,
    name: BUSINESS_NAME
  });
}

function notifyCustomer_(data) {
  if (!data.email) {
    return;
  }

  const subject = "We received your New Horizons request";
  const body = [
    `Hi ${data.name || "there"},`,
    "",
    "Thank you for reaching out to New Horizons. We received your request and someone from our team will reach out soon to talk through your property and next steps.",
    "",
    "Here is what you shared:",
    `Property address: ${data.address || ""}`,
    `Timeline: ${data.timeline || "Not sure yet"}`,
    `Condition: ${data.condition || "Not sure yet"}`,
    "",
    "New Horizons"
  ].join("\n");

  MailApp.sendEmail({
    to: data.email,
    subject,
    body,
    replyTo: BUSINESS_EMAIL,
    name: BUSINESS_NAME
  });
}

function getLeadSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  } else {
    ensureHeaders_(sheet);
  }

  return sheet;
}

function ensureHeaders_(sheet) {
  const existingHeaders = sheet
    .getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1))
    .getValues()[0]
    .filter(String);

  const missingHeaders = HEADERS.filter(header => existingHeaders.indexOf(header) === -1);

  if (missingHeaders.length) {
    sheet
      .getRange(1, existingHeaders.length + 1, 1, missingHeaders.length)
      .setValues([missingHeaders]);
  }
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
