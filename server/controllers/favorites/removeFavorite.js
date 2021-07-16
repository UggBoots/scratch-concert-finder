const { User } = require('../../db/index');

/**
 * 
 * @param {userId, favorite} req 
 * @description removes the selected favorite from the user that matches the userId
 */

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
        next();
    } catch(err) {
        console.log('error from removeFavorite', err);
    }
}

module.exports = removeFavorite;