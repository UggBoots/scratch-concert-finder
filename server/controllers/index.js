const { getLocationSearchResults } = require('../services/getLocationSearchResults');

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
      message: e.message
    });
  }
};

module.exports = {
  sendPotentialLocations
};
