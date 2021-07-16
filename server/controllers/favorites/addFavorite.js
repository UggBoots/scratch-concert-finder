const { User } = require('../../db/index');

/**
 * 
 * @param {userId, favorite} req 
 * @description middleware that adds a favorite concert from client to the user on database
 */

const addFavorite = async (req, res, next) => {
    try {
        const {userId, favorite} = req.body;
        const addFavoriteQuery = await User.updateOne(
            {'_id': userId},
            {$push: {
                'favorites': {favorite}
            }}
        );
        res.locals.favorite = addFavoriteQuery;
        next();
    } catch(err) {
        console.log('error from add favorite middleware', err);
    }
}

module.exports = addFavorite;