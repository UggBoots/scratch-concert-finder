const axios = require('axios');
const config = require('../config');
const { predictHqClientTemporaryToken } = config;

const predictHQConcerts = async (latLong) => {
  try {
    const radius = 100000;
    const config = {
      method: 'get',
      url: `https://api.predicthq.com/v1/events?category=concerts&location_around.origin=${latLong}&location_around.scale=${radius}mi`,
      headers: {
        Authorization: `Bearer ${predictHqClientTemporaryToken}`,
      },
    };
    return await axios(config).then((response) => response.data.results);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = predictHQConcerts;

const getConcerts = async (req, res, next) => {
  console.log(`req.body = ${JSON.stringify(req.body, null, 2)}`)
  // if (!(lng, lat, date in req.body)) {
    if (!('lng', 'lat', 'date' in req.body)) {
    next({
      log: 'Malformed request received on getConcerts middleware function',
      status: 400,
      message: 'Malformed request - missing required parameters'
    })
  }

  let concertsArray = [];

  const {lng, lat, date} = req.body;
  const radius = 5; // in miles (radius + 'mi')
  const limit = 50;
  
  const apiCallQuery = `https://api.predicthq.com/v1/events?category=concerts&location_around.origin=${lat},${lng}&location_around.scale=${radius}mi&limit=${limit}&start.gte=${date}&start.lte=${date}`;

  console.log(apiCallQuery)

  const concertQuery = function (url, resultsArr = concertsArray) {
    axios.get(url, {headers: {
      'Authorization' : 'Bearer ' + process.env.PREDICT_HQ_TEMPORARY_TOKEN
    }})
    .then(response => {
      console.log(`Received response.data keys: ${pp(Object.keys(response.data))}`)
      if (response.status !== 200) {
        return next({
          log: `getConcert middleware failed. External API call failure. Return status code is ${response.status} not 200.`,
          status: 503,
          message: `Backend functionality is currently down due to a failure in external dependencies. Please contact the site administrator.`
        })
      }
      let results = response.data.results;
      resultsArr.concat(results);
      console.log(`length of resultsArr is ${resultsArr.length}`);
      // if (response.data.next) concertQuery(response.data.next, resultsArr);
      res.locals.concerts = resultsArr;
    })
    .then(() => next())
    .catch(err => console.log(err))
  }

  // let _ = await concertQuery(apiCallQuery);
  // console.log(`calling next in getConcerts`)
  // return next();
}