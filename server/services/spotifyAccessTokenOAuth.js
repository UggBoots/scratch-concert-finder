const axios = require('axios');
const qs = require('qs');
const moment = require('moment');

const config = require('../config');
const { Token } = require('../db/index');

const spotifyAccessTokenOAuth = async (code) => {
  const { spotifyClientId, spotifyClientSecret } = config;
  try {
    const encodedIdAndSecret = Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString(
      'base64'
    );
    const data = qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'http://localhost:8080/callback',
    });
    const config = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token/',
      headers: {
        Authorization: `Basic ${encodedIdAndSecret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };
    const token = await axios(config).then((response) => response.data);
    const dbPayload = {
      source: 'Spotify OAuth',
      tokenId: token.access_token,
      timestamp: moment(),
    };
    await new Token(dbPayload).save();
    return token;
  } catch (e) {
    throw new Error('spotifyAccessTokenOAuth error: ' + e.message);
  }
};

module.exports = spotifyAccessTokenOAuth;
