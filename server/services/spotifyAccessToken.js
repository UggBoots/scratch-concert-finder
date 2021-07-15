const moment = require('moment');
const axios = require('axios');
const qs = require('qs');
const { Token } = require('../db/index');

const config = require('../config');

const { spotifyClientId, spotifyClientSecret } = config;

const spotifyAccessToken = async (tokenId) => {
  try {
    // Lookup token information in db
    const token = await Token.findOne({ tokenId });
    const spotifyToken = token.tokenId;
    const spotifyTokenGeneratedAt = token.timestamp;
    // If token hasn't expired (1 hour), return the token
    if (spotifyToken && moment() <= moment(spotifyTokenGeneratedAt).add(1, 'hour')) return spotifyToken;
    // Generate a new Spotify access token
    const encodedIdAndSecret = Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString(
      'base64'
    );
    var scope = 'user-read-private user-read-email user-read-playback-state streaming user-modify-playback-state';
    const data = qs.stringify({ grant_type: 'client_credentials', scope: scope });
    const config = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token/',
      headers: {
        Authorization: `Basic ${encodedIdAndSecret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie:
          '__HOST-sp_fid=a7da538e-87c8-45a4-a501-dacffb886502; __Host-device_id=AQAffng0g1h-tannBBHECzx_Ovl6sFYgUvDdLqJylYk5MzfhNJ194FiLIjlVz9Tgb32fDruNPjvGBFr9r0yrKqFdIJSh54XPlwE',
      },
      data: data,
    };
    const newToken = await axios(config).then(response => response.data.access_token);
    // Save new access token to database
    const source = 'Spotify';
    tokenId = newToken;
    const timestamp = moment();
    const newTokenData = await new Token({ source, tokenId, timestamp });
    newTokenData.save();
    return newToken;
  } catch (e) {
    throw new Error('spotifyAccessToken error: ' + e.message);
  }
};

module.exports = {
  spotifyAccessToken,
};
