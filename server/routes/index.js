const router = require('express').Router();
const controllers = require('../controllers');
const signUp = require('../controllers/signUp');
const verifyUser = require('../controllers/verifyUser');

router.get('/playlist', controllers.sendPlaylist);
router.get('/location-search', controllers.sendPotentialLocations);

router.post('/signup', signUp, (req, res) => {
    return res.status(200).json({message: 'You successfully signed up!'});
});

router.post('/signin', verifyUser, (req, res) => {
    return res.status(200).json({message:'You succesfully logged in!'})
});

router.post('/token', controllers.handleToken);
// router.post('/login', controllers.verifyUser);
router.post('/playlist', controllers.sendPlaylist);
router.post('/location-search', controllers.sendPotentialLocations);
router.get('/user/:id', controllers.sendUserDetails);
router.post('/spotify-token', controllers.sendSpotifyOAuthToken);

module.exports = router;
