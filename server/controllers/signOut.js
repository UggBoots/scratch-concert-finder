const signOut = (req, res) => {
    req.session.destroy(error => {
        if (error) return console.log(error);//return res.redirect('/');
        res.clearCookie('userid');
        res.redirect('/');
    });
}

module.exports = signOut;