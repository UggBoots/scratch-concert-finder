/**
 * @description middleware that removes session from database and clears session cookie from browser
 */

const signOut = (req, res, next) => {
    req.session.destroy(error => {
        if (error) return console.log(error);//return res.redirect('/');
        res.clearCookie(process.env.COOKIE_KEY);
        next();
    });
}

module.exports = signOut;