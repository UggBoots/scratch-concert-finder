const axios = require('axios');
const config = require('../config');

const spotifyArtistSearch = async ({ title, spotifyToken }) => {
  try {
    const config = {
      method: 'get',
      url: `https://api.spotify.com/v1/search?q=${title}&type=artist&market=US&limit=5`,
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    };
    return await axios(config).then((response) => response.data.artists.items);
  } catch (e) {
    throw new Error('spotifyArtistSearch error: ' + e.message);
  }
};

module.exports = spotifyArtistSearch;
