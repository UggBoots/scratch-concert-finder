const { User } = require('../../db/index');

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