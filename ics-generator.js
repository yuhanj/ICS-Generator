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
  startHour: 9,
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

// generic time set
function setTime(time) {
  let timeString = '';
  timeString += time.year;
  timeString += addLeadingZero(time.month);
  timeString += addLeadingZero(time.day);
  timeString += 'T'
  timeString += addLeadingZero(time.hour + 10); //HST to UTC
  timeString += addLeadingZero(time.minute);
  timeString += addLeadingZero(time.second);
  timeString += 'Z';
  return timeString;
}

function setStartTime(data, input) {
  const startTime = {
    year: input.startYear,
    month: input.startMonth,
    day: input.startDay,
    hour: input.startHour,
    minute: input.startMinute,
    second: input.startSecond,
  }
  data.DTSTART = setTime(startTime);
}

function setEndTime(data, input) {
  const endTime = {
    year: input.endYear,
    month: input.endMonth,
    day: input.endDay,
    hour: input.endHour,
    minute: input.endMinute,
    second: input.endSecond,
  }
  data.DTEND= setTime(endTime);
}

//copy location to data
function setLocation(data, input){
  data.LOCATION = input.location;
}

//copy summary to data
function setSummary(data, input){
  data.SUMMARY = input.summary;
}

//format the data before generating ics file
function setData(data, input) {
  setStartTime(data, input);
  setEndTime(data, input);
  setLocation(data, input);
  setSummary(data, input);
}

//generate the ics file in plain text with the formatted data
function generateResult(data) {

  let result = 'BEGIN:VCALENDAR\n';

  result += generateEvent(data);

  result += 'END:VCALENDAR\n';

  return(result);

}

//generate an event
function generateEvent(data) {

  let event = 'BEGIN:VEVENT\n';

  _.mapObject(data, (val, key) => {
    let line = '';
    if (key != 'LASTMODIFIED') {
      line = key + ':' + val;
    } else {
      line = 'LAST-MODIFIED:' + val;
    }
    let lines = line.match(/.{1,75}/g);
    _.map(lines, line => event = event + line + '\n');

  });

  event += 'END:VEVENT\n';
  return event;
}

const data = makeCopy(template);
setData(data, userInput);
let result = generateResult(data);
console.log(result);