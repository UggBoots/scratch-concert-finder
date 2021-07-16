const { User } = require('../../db/index');

/**
 * 
 * @param {userId} req 
 * @description middleware that retrieves all favorites from database for user that matches the userId.
 * @description saves response from database on res.locals.favorites and sends back to client
 */

const getFavorites = async (req, res, next) => {
    try {
        const {userId} = req.body; 
        const getFavoritesQuery =  await User.findById(userId);
        res.locals.favorites = getFavoritesQuery;
        next();
    } catch(err) {
        console.log('error from getFavorites middleware', err);
    }
}

module.exports = getFavorites;