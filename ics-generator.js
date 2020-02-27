const data = {
  DTSTART: '20200313T200000Z',
  DTEND: '20200313T230000Z',
  DTSTAMP: '20200227T031956Z',
  UID: '6api5sqk9pufjhhlrc9ssn5k86@google.com',
  CREATED: '20200227T031353Z',
  DESCRIPTION: '',
  LASTMODIFIED: '20200227T031353Z',
  LOCATION: 'Thomas Hale Hamilton Library\\, 2550 McCarthy Mall\\, Honolulu\\, HI 96822\\, USA',
  SEQUENCE: 0,
  STATUS: 'CONFIRMED',
  SUMMARY: 'Study For Exam',
  TRANSP: 'OPAQUE'
}

let result = 'BEGIN:VCALENDAR\n' +
    'BEGIN:VEVENT\n';

_.mapObject(data, (val, key) => {
  let line = '';
  if (key != 'LASTMODIFIED') {
    line = key + ':' + val;
  } else {
    line = 'LAST-MODIFIED:' + val;
  }
  let lines = line.match(/.{1,75}/g);
  _.map(lines, line => result = result + line + '\n');
});

result += 'END:VEVENT\n' +
    'END:VCALENDAR\n';
console.log(result);