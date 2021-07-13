const router = require('express').Router();
const controllers = require('../controllers');
const signUp = require('../controllers/signUp');
const verifyUser = require('../controllers/verifyUser');
const signOut = require('../controllers/signOut');
const isAlreadyLoggedIn = require('../controllers/isAlreadyLoggedIn');
const isAlreadySignedOut = require('../controllers/isAlreadySignedOut');
const addFavorite = require('../controllers/favorites/addFavorite');
const getFavorites = require('../controllers/favorites/getFavorites');

router.get('/location-search', controllers.sendPotentialLocations);

router.post('/signup', isAlreadyLoggedIn, signUp, (req, res) => {
    return res.status(200).json({message: 'You successfully signed up!'});
});

router.post('/signin', isAlreadyLoggedIn, verifyUser, (req, res) => {
    return res.status(200).json({
        message:'You succesfully logged in!',
        userid: req.session.userid
    });
});

router.post('/signout', isAlreadySignedOut, signOut ,(req, res) => {
    return res.redirect('/');
});

router.post('/addFavoriteToUser', addFavorite, (req, res) => {
    return res.status(200).json(res.locals.favorite);
});

router.get('/getFavorites', getFavorites, (req, res) => {
    return res.status(200).json(res.locals.favorites);
});

router.post('/location-search', controllers.sendPotentialLocations);

router.post('/getConcerts', controllers.getPredictHQConcerts);

module.exports = router;
