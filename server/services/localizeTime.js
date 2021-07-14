const localizeTime = function(utcDate, timeZone) {
  // converts UTC time to timezone time (provided by timeZone parameter)
  // utcDate must be in the ISO string format (i.e. Date().toISOString;):
  // 2021-07-31T23:30:00Z
  // timeZone must be in the tz database name format
  // e.g. America/New_York
  const options = {
    timeZone: timeZone,
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
  }
  return new Intl.DateTimeFormat('en-US', options).format(new Date(utcDate));
}

module exports = localizeTime;

// unit test
// let timestamp = '2021-07-31T23:30:00Z';
// let timezone = 'America/New_York'

// console.log(localizeTime(timestamp, timezone)); // expect: 7/31/2021, 19:30:00