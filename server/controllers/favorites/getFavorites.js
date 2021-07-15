const { User } = require('../../db/index');

const getFavorites = async (req, res, next) => {
    try {
        const {userId} = req.body; 
        const getFavoritesQuery =  await User.findById(userId);
        res.locals.favorites = getFavoritesQuery.favorites;
        next();
    } catch(err) {
        console.log('error from getFavorites middleware', err);
    }
}

module.exports = getFavorites;