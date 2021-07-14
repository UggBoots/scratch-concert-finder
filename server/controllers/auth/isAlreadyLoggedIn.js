const isAlreadyLoggedIn = (req, res, next) => {
    if (req.session.userid)  return res.json({message: 'User is already logged in'});
    next();
}

module.exports = isAlreadyLoggedIn;