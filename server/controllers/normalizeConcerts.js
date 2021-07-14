const localizeTime = function(utcDate, timeZone) {
    // converts UTC time to timezone time (provided by timeZone parameter)
    // utcDate must be in the ISO string format (i.e. Date().toISOString;):
    // 2021-07-31T23:30:00Z
    // timeZone must be in the tz database name format
    // e.g. America/New_York
    const options = {
      timeZone: timeZone,
      // timeZoneName: 'short',
      dateStyle: 'short',
      timeStyle: 'short',
    //   year: 'numeric', month: 'numeric', day: 'numeric',
    //   hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: true,
    }
    return new Intl.DateTimeFormat('en-US', options).format(new Date(utcDate));
  };

module.exports = (req, res, next) => {
    // for blank array
    if (!(res.locals.concerts)) return next();
    
    res.locals.concerts = res.locals.concerts.map((concert) => {
        // console.log(`Processing concert: ${JSON.stringify(concert,null,2)}`)
        const normalizedConcert = {
            id: concert.id,
            title: concert.title,
            description: concert.description,
            entities: concert.entities[0] ? [{
                formatted_address: concert.entities[0].formatted_address,
                name: concert.entities[0].name
            }] : [{
                formatted_address: 'N/A',
                name: 'N/A'
            }],
            start: localizeTime(concert.start),
            startUTC: concert.start,
            location: concert.location
        }

        // adding startDate and startTime properties.
        const [startDate, startTime] = localizeTime(concert.start).split(', ');

        normalizedConcert.startDate = startDate;
        normalizedConcert.startTime = startTime;

        return normalizedConcert;
    });

    res.locals.concerts = res.locals.concerts.reverse();
    return next();
};