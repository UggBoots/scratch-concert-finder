const { getPlaylist } = require('../services/getPlaylist');
const { getLocationSearchResults } = require('../services/getLocationSearchResults');
const { getUserDetails } = require('../services/getUserDetails');
const spotifyAccessToken = require('../services/spotifyAccessToken');
const spotifyAccessTokenOAuth = require('../services/spotifyAccessTokenOAuth');
const { Token, User } = require('../db/index');

// const createUser = async (req, res, next) => {
//   const { name, email, password } = req.query;
//   try {
//     const newUser = await new User({ name, email, password });
//     newUser.save();
//     res.locals.id = newUser._doc._id;
//     res.status(200).json(newUser);
//     next();
//   } catch (e) {
//     console.log('createUser error: ', e.message);
//     res.sendStatus(500) && next(e);
//   }
// };

const handleToken = async (req, res, next) => {
  let { tokenId } = req.query;
  if (!tokenId) return next('No token!');
  try {
    tokenId = await spotifyAccessToken(tokenId);
    res.status(200).json(tokenId);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500) && next(e);
  }
};

// const verifyUser = async (req, res, next) => {
//   const { email, password } = req.query;
//   if(!email || !password) return next('Missing email and/or password');
//   try {
//     const user = await User.findOne({ email });
//     if(!user) return next('User not found');
//     if(!(user.password === password)) return next('Passwords do not match');
//     res.locals.id = user._doc._id;
//     res.status(200).json(user);
//     console.log('verifyUser', res.locals.id);
//     next();
//   }
//   catch(e){
//     console.log('verifyUser error: ', e.message);
//     res.sendStatus(500) && next(e);
//   }
// };

const sendPlaylist = async (req, res, next) => {
  try {
    const playlist = await getPlaylist(req.body);
    res.status(200).json(playlist);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
    next(e);
  }
};

const sendPotentialLocations = async (req, res, next) => {
  const { searchQuery } = req.body;
  try {
    const searchResults = await getLocationSearchResults(searchQuery);
    res.status(200).json(searchResults);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
    next(e);
  }
};

const sendUserDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUserDetails(id);
    res.status(200).json(user);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
    next(e);
  }
};

const sendSpotifyOAuthToken = async (req, res, next) => {
  const { code } = req.body;
  try {
    let token;
    if (code) {
      const newSpotifyToken = await spotifyAccessTokenOAuth(code);
      token = newSpotifyToken.access_token;
    } else {
      const spotifyToken = await Token.findOne({ source: 'Spotify OAuth' })
        .limit(1)
        .sort({ $natural: -1 });
      token = spotifyToken.tokenId;
    }
    res.status(200).json(token);
    next();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
    next(e);
  }
};

module.exports = {
  handleToken,
  sendPlaylist,
  sendPotentialLocations,
  sendUserDetails,
  sendSpotifyOAuthToken,
};
