const template = {
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

const userInput = {
  startYear: 2020,
  startMonth: 3,
  startDay: 9,
  startHour: 10,
  startMinute: 0,
  startSecond: 0,
  endYear: 2020,
  endMonth: 3,
  endDay: 9,
  endHour: 13,
  endMinute: 0,
  endSecond: 0,
  location: 'At home',
  summary: 'Play Rainbow 6 Siege',
}

function makeCopy(temp){
   return temp;
}

function addLeadingZero(num){
  let withZero = '';
  if (num < 10) {
    withZero += '0';
  }
  withZero += num;
  return withZero;
}

function setStartTime(data, input) {
  let startTime = '';

  startTime += input.startYear;
  startTime += addLeadingZero(input.startMonth);
  startTime += addLeadingZero(input.startDay);
  startTime += 'T'
  startTime += addLeadingZero(input.startHour + 10); //HST to UTC
  startTime += addLeadingZero(input.startMinute);
  startTime += addLeadingZero(input.startSecond);
  startTime += 'Z';
  data.DTSTART = startTime;
}

function setEndTime(data, input) {

  let endTime = '';
  endTime += input.startYear;
  endTime += addLeadingZero(input.endMonth);
  endTime += addLeadingZero(input.endDay);
  endTime += 'T';
  endTime += addLeadingZero(input.endHour + 10); //HST to UTC
  endTime += addLeadingZero(input.endMinute);
  endTime += addLeadingZero(input.endSecond);
  endTime += 'Z';
  data.DTEND= endTime;

}

function setLocation(data, input){
  data.LOCATION = input.location;
}
function setSummary(data, input){
  data.SUMMARY = input.summary;
}

function setData(data, input) {
  setStartTime(data, input);
  setEndTime(data, input);
  setLocation(data, input);
  setSummary(data, input);
}

function  generateResult(data) {
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

  return(result);
}

const data = makeCopy(template);
setData(data, userInput);
let result = generateResult(data);
console.log(result);