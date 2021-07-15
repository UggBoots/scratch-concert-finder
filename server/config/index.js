require('dotenv').config();

const config = {
  env: process.env.NODE_ENV,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: process.env.PORT,
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  ticketmasterConsumerKey: process.env.TICKETMASTER_CONSUMER_KEY,
  ticketmasterConsumerSecret: process.env.TICKETMASTER_CONSUMER_SECRET,
  predictHqClientId: process.env.PREDICT_HQ_CLIENT_ID,
  predictHqClientSecret: process.env.PREDICT_HQ_CLIENT_SECRET,
  predictHqClientTemporaryToken: process.env.PREDICT_HQ_TEMPORARY_TOKEN,
};

module.exports = config;
