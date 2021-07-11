const router = require('express').Router();
const controllers = require('../controllers');
const signUp = require('../controllers/signUp');
const verifyUser = require('../controllers/verifyUser');
const signOut = require('../controllers/signOut');

router.get('/location-search', controllers.sendPotentialLocations);

router.post('/signup', signUp, (req, res) => {
    return res.status(200).json({message: 'You successfully signed up!'});
});

router.post('/signin', verifyUser, (req, res) => {
    return res.status(200).json({
        message:'You succesfully logged in!',
        session: req.session.user
    });
});

router.post('/signout', signOut ,(req, res) => {
    return res.redirect('/');
});

router.post('/location-search', controllers.sendPotentialLocations);

module.exports = router;
