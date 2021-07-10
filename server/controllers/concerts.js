const axios = require('axios');

// DESCRIPTION:
// Grabs concert data from predictHQ and 

//dependency injection
const [lat, lng] = [40.730610, -73.935242];
const date = '2021-08-01';

const getConcerts = (req, res, next) => {
  if (!(lng, lat, date in req.body)) {
    next({
      log: 'Malformed request received on getConcerts middleware function',
      status: 400,
      message: 'Malformed request - missing required parameters'
    })
  }

  const concertsArray = [];

  const {lng, lat, date} = req.body;
  const radius = 5; // in miles (radius + 'mi')
  const limit = 50;
  
  const api_call_query = `https://api.predicthq.com/v1/events?category=concerts&location_around.origin=${lat},${lng}&location_around.scale=${radius}mi&limit=${limit}&start.gte=${date}&start.lte=${date}`;

  const concertQuery = async (url, resultsArr = concertsArray) => {
    axios.get(url, headers : {
      'Authorization' : 'Bearer ' + process.env.PREDICT_HQ_TEMPORARY_TOKEN
    })
    .then(response => {
      if (response.status !== 200) {
        return next({
          log: `getConcert middleware failed. External API call failure. Return status code is ${response.status} not 200.`,
          status: 503,
          message: `Backend functionality is currently down due to a failure in external dependencies. Please contact the site administrator.`
        })
      }
      resultsArr.concat(response.results);
      if (response.next) concertQuery(response.next, resultsArr);
      res.locals.concerts = resultsArr;
    })
    .then(next())
    .catch(err => console.log(err))
  }
}

module.exports = {
  getConcerts,
};