const SHEET_NAME = '시트1';
const NOTIFICATION_EMAIL = 'maniayoung@hanmail.net';

const HEADERS = [
  '접수일시',
  '유입URL',
  '이름',
  '연락처',
  '지역',
  '물탱크종류',
  '개선항목',
  '누수위치',
  '상담희망시간',
  '희망일정',
  '문의내용'
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const data = e.parameter || {};
    const sheet = getConsultationSheet();
    ensureHeaders(sheet);

    const receivedAt = new Date();
    const row = [
      receivedAt,
      data.source || '',
      data.name || '',
      data.phone || '',
      data.region || '',
      data.tank || '',
      data.type || '',
      data.leak || '',
      data.time || '',
      data.schedule || '',
      data.message || ''
    ];

    sheet.appendRow(row);
    sendConsultationEmail(data, receivedAt);

    return jsonResponse({ result: 'success' });
  } catch (error) {
    return jsonResponse({
      result: 'error',
      message: error.message
    });
  } finally {
    lock.releaseLock();
  }
}

function getConsultationSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0];
}

function ensureHeaders(sheet) {
  const firstRowValues = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = firstRowValues.some((value) => String(value).trim());

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function sendConsultationEmail(data, receivedAt) {
  const subject = `[물탱크 리노베이션 상담 접수] ${data.name || '이름 미입력'} / ${data.phone || '연락처 미입력'}`;
  const body = [
    '물탱크 리노베이션 상담 신청이 접수되었습니다.',
    '',
    `접수일시: ${formatDate(receivedAt)}`,
    `유입URL: ${data.source || '-'}`,
    '',
    `이름: ${data.name || '-'}`,
    `연락처: ${data.phone || '-'}`,
    `지역: ${data.region || '-'}`,
    `물탱크 종류: ${data.tank || '-'}`,
    `개선 항목: ${data.type || '-'}`,
    `누수 위치: ${data.leak || '-'}`,
    `상담 희망 시간: ${data.time || '-'}`,
    `희망 일정: ${data.schedule || '-'}`,
    '',
    '문의 내용:',
    data.message || '-'
  ].join('\n');

  MailApp.sendEmail(NOTIFICATION_EMAIL, subject, body);
}

function formatDate(date) {
  return Utilities.formatDate(date, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
