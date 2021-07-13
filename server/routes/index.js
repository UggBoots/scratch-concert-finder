const router = require('express').Router();
const controllers = require('../controllers');
const signUp = require('../controllers/signUp');
const verifyUser = require('../controllers/verifyUser');
const concerts = require('../controllers/concerts');

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

router.post('/location-search', controllers.sendPotentialLocations);

router.post('/concerts', concerts, (req, res) => {
    // console.log(`res.locals.concerts length is ${res.locals.concerts.length}`)
    // console.log(`res.locals.concerts  ${res.locals.concerts}`)
    res.status(200).json(res.locals.concerts);
});

module.exports = router;
