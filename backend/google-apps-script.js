const SHEET_NAME = "Leads";

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
  "Page URL",
  "Source",
  "User Agent"
];

function doPost(e) {
  const sheet = getLeadSheet_();
  const data = e && e.parameter ? e.parameter : {};

  if (data.company_website) {
    return json_({ ok: true });
  }

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
    data.page_url || "",
    data.source || "",
    data.user_agent || ""
  ]);

  return json_({ ok: true });
}

function doGet() {
  return json_({ ok: true, service: "New Horizons lead intake" });
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
  }

  return sheet;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
