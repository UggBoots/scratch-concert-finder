const axios = require('axios');
const config = require('../config');

const spotifyArtistTopTracks = async ({ artistId, spotifyToken }) => {
  try {
    const config = {
      method: 'get',
      url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
      headers: {
        Authorization: `Bearer ${spotifyToken}`,
      },
    };
    return await axios(config).then((response) =>
      response.data.tracks.filter((t) => t.is_playable)
    );
  } catch (e) {
    throw new Error('spotifyArtistTopTracks error: ' + e.message);
  }
};

module.exports = spotifyArtistTopTracks;
