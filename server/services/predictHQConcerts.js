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

// const predictHQConcerts = async (coordinates) => {
//   try {
//     const { lat, lng } = coordinates;
//     const latLong = `${lat},${lng}`;
//     const radius = 50;
//     const config = {
//       method: 'get',
//       url: `https://api.predicthq.com/v1/events?category=concerts&location_around.origin=${latLong}&location_around.scale=${radius}mi`,
//       headers: {
//         Authorization: `Bearer ${predictHqClientTemporaryToken}`,
//       },
//     };
//     return await axios(config).then((response) => response.data.results);
//   } catch (e) {
//     throw new Error(e.message);
//   }
// };

// module.exports = predictHQConcerts;
