/**
 * @description middleware that checks to see if user is already signed out.
 * Used to not stop a query from being made if user clicks on signout button.
 */

const isAlreadySignedOut = (req, res, next) => {
    if (!req.session.user)  return res.status(200).json({message: 'There is no one signed in'});
    next();
}

module.exports = isAlreadySignedOut;