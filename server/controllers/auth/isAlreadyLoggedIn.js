/**
 * ************************************
 * @description middleware that checks to see if the user is already logged in by checking to see if there is an active session
 * ************************************
 */

const isAlreadyLoggedIn = (req, res, next) => {
    if (req.session.userid)  return res.status(200).json({message: 'User is already logged in'});
    next();
}

module.exports = isAlreadyLoggedIn;