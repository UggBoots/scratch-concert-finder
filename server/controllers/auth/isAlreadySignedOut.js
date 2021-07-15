const isAlreadySignedOut = (req, res, next) => {
    if (!req.session.user)  return res.status(200).json({message: 'There is no one signed in'});
    next();
}

module.exports = isAlreadySignedOut;