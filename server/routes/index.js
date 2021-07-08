const router = require('express').Router();
const controllers = require('../controllers');
const createUser = require('../controllers/createUser')

router.get('/playlist', controllers.sendPlaylist);
router.get('/location-search', controllers.sendPotentialLocations);
router.post('/signup', createUser);
router.post('/token', controllers.handleToken);
// router.post('/login', controllers.verifyUser);
router.post('/playlist', controllers.sendPlaylist);
router.post('/location-search', controllers.sendPotentialLocations);
router.get('/user/:id', controllers.sendUserDetails);
router.post('/spotify-token', controllers.sendSpotifyOAuthToken);

module.exports = router;
