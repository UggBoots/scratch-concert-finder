const bcrypt = require('bcrypt');
const { User } = require('../db/index');

// queries User table to check to see if the email provided exsists, if true, will check to make sure the client provided password
// and password from User table are the same

const verifyUser =  async (req, res, next) => {
    try {
        const { email, password } = req.query;
        const findUserInDB = await User.findOne({email: email});
        console.log(findUserInDB)
        if (!findUserInDB) return res.status(400).json({message: 'User does not exsist'});
        const validatePassword = await bcrypt.compare(password, findUserInDB.password);
        if (validatePassword) {
            req.session.user = {
                id: findUserInDB._id,
                name: findUserInDB.name,
                email: findUserInDB.email
            }
            console.log(req.session.user);
            return next();
        } else return res.status(400).json({message: 'Incorrect email/password combination'});
    } catch (err) {
        return res.status(500).json({message: 'Incorrect email/password combination'})
    }
}

module.exports = verifyUser