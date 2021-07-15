const { User } = require('../../db/index');

const removeFavorite = async (req, res, next) => {
    try {
        const {userId, favorite} = req.body;
        const removeFavoriteQuery = await User.findByIdAndUpdate(userId,
            {
                $pull: {
                    'favorites': {
                        'favorite': favorite    
                    }
                }
            }
        );
        // res.locals.removeFavorite = removeFavoriteQuery;
        next();
    } catch(err) {
        console.log('error from removeFavorite', err);
    }
}

module.exports = removeFavorite;