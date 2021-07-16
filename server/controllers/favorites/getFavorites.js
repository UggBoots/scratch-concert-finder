const { User } = require('../../db/index');

//**NOTE - changing to send back entire user, will use this to update in state */
// const getFavorites = async (req, res, next) => {
//     try {
//         const {userId} = req.body; 
//         const getFavoritesQuery =  await User.findById(userId);
//         res.locals.favorites = getFavoritesQuery.favorites;
//         next();
//     } catch(err) {
//         console.log('error from getFavorites middleware', err);
//     }
// }

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