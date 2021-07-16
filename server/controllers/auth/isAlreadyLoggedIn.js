const isAlreadyLoggedIn = (req, res, next) => {
    if (req.session.userid)  return res.status(200).json({message: 'User is already logged in'});
    next();
}

module.exports = isAlreadyLoggedIn;