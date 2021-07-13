const {
  getLocationSearchResults,
} = require('../services/getLocationSearchResults');

const predictHQConcerts = require('../services/predictHQConcerts');

const sendPotentialLocations = async (req, res, next) => {
  const { searchQuery } = req.body;
  try {
    const searchResults = await getLocationSearchResults(searchQuery);
    res.status(200).json(searchResults);
    next();
  } catch (e) {
    console.log(e.message);
    next({
      log: 'Failure in sendPotentialLocations',
      status: 500,
      message: e.message,
    });
  }
};

const getPredictHQConcerts = async (req, res, next) => {
  const { latLong } = req.body;
  console.log('req.body: ', req.body);
  try {
    const concerts = await predictHQConcerts(latLong);
    res.status(200).json(concerts);
  } catch (e) {
    console.log(e.message);
    next({
      log: 'Failure in controllers/getConcerts',
      status: 500,
      message: e.message,
    });
  }
};

module.exports = {
  sendPotentialLocations,
  getPredictHQConcerts,
};
