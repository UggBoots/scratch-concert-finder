const axios = require('axios');

// DESCRIPTION:
// Grabs concert data from predictHQ and 

//dependency injection
// const [lat, lng] = [40.730610, -73.935242];
// const date = '2021-08-01';

const pp = (stuff) => JSON.stringify(stuff, null, 2);

const malformedRequestError = () => {next({
  log: 'Malformed request received on getConcerts middleware function',
  status: 400,
  message: 'Malformed request - missing required parameters'
})};

const getConcerts = async (req, res, next) => {
  // console.log(`req.body = ${pp(req.body)}`)
  // if (!(lng, lat, date in req.body)) {
    if (!('lng', 'lat' in req.body)) {
    malformedRequestError();
  }

  let concertsArray = [];
  res.locals.concerts = [];

  const {lng, lat} = req.body;

  let startDate;
  let endDate;

  if (req.body.date) {
    startDate = req.body.date;
    endDate = req.body.date;
  } else if ('startDate', 'endDate' in req.body) {
    startDate = req.body.startDate;
    endDate = req.body.endDate;
  } else {
    malformedRequestError();
  }

  const radius = req.body.radius || 5; // in miles (radius + 'mi')
  const limit = req.body.limit || 100;
  
  // const apiCallQuery = `https://api.predicthq.com/v1/events?category=concerts&location_around.origin=${lat},${lng}&location_around.scale=${radius}mi&limit=${limit}&start.gte=${date}&start.lte=${date}`;
  const apiCallQuery = `https://api.predicthq.com/v1/events?category=concerts&within=${radius}mi@${lat},${lng}&start.gte=${startDate}&start.lte=${endDate}&limit=${limit}`

  // console.log(apiCallQuery)
  
  const concertQuery = async function (url, resultsArr = concertsArray) {
    
    try {
    const response = await axios.get(url, {headers: {
      'Authorization' : 'Bearer ' + process.env.PREDICT_HQ_TEMPORARY_TOKEN
    }});
    
      // console.log(`Received response.data keys: ${pp(Object.keys(response.data))}`)
      if (response.status !== 200) {
        return next({
          log: `getConcert middleware failed. External API call failure. Return status code is ${response.status} not 200.`,
          status: 503,
          message: `Backend functionality is currently down due to a failure in external dependencies. Please contact the site administrator.`
        });
      }
      let results = response.data.results;

      // console.log(`Total results: ${results.data}`)

      resultsArr = resultsArr.concat(results);
      // console.log(`length of resultsArr is ${resultsArr.length}`);
      if (response.data.next) await concertQuery(response.data.next, resultsArr);
      res.locals.concerts = res.locals.concerts.concat(resultsArr);
      // console.log(res.locals.concerts)

    } catch(err) {
      next(err);
    }
  }

  let _ = await concertQuery(apiCallQuery);
  return next();
  // let _ = await concertQuery(apiCallQuery);
  // console.log(`calling next in getConcerts`)
  // return next();
}

module.exports = getConcerts;