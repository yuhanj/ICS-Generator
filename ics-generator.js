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
  startMonth: 2,
  startDay: 29,
  startHour: 10,
  startMinute: 0,
  startSecond: 0,
  endYear: 2020,
  endMonth: 2,
  endDay: 29,
  endHour: 15,
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
function setTime(localTime) {
  time = localTimeToUniversalTime(-10, localTime);
  let timeString = '';
  timeString += time.year;
  timeString += addLeadingZero(time.month);
  timeString += addLeadingZero(time.day);
  timeString += 'T'
  timeString += addLeadingZero(time.hour);
  timeString += addLeadingZero(time.minute);
  timeString += addLeadingZero(time.second);
  timeString += 'Z';
  return timeString;
}

function localTimeToUniversalTime(timeZone, localTime) {
  const months1 = [1, 3, 5, 7, 8, 10];
  const months2 = [4, 6, 9, 11];

  universalTime = localTime;
  universalTime.hour -= timeZone;
  if (universalTime.hour > 24) {
    universalTime.day ++;
    universalTime.hour -= 24;
    if (universalTime.day > 28) {
      if (months1.includes(universalTime.month) && universalTime.day > 31) {
        universalTime.month++;
        universalTime.day = 1;
      } else if (months2.includes(universalTime.month) && universalTime.day > 30) {
        universalTime.month++;
        universalTime.day = 1;
      } else if (universalTime.month == 12 && universalTime.day > 31) {
        universalTime.year++;
        universalTime.month = 1;
        universalTime.day = 1;
      } else if (universalTime.month == 2 && universalTime.day > 28 && universalTime.year % 4 != 0) {
        //common year
        universalTime.month++;
        universalTime.day = 1;
      } else if (universalTime.month == 2 && universalTime.day > 29 && universalTime.year % 4 == 0) {
        //leap year, assume year is in range 2000~2099
        universalTime.month++;
        universalTime.day = 1;
      }
    }
  } else if (universalTime.hour < 0) {
    // not implemented yet
    universalTime.day --;
    universalTime.hour += 24;
  }

  return universalTime;
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