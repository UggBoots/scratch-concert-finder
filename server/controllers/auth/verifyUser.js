const bcrypt = require('bcrypt');
const { User } = require('../../db/index');

// queries User table to check to see if the email provided exsists, if true, will check to make sure the client provided password
// and password from User table are the same

const verifyUser =  async (req, res, next) => {
    console.log('test')
    try {
        const { email, password } = req.body;
        const findUserInDB = await User.findOne({email: email});
        if (!findUserInDB) return res.status(200).json({message: 'User does not exist'});
        const validatePassword = await bcrypt.compare(password, findUserInDB.password);
        if (validatePassword) {
            req.session.user = {
               userId: findUserInDB._id,
               favorites: findUserInDB.favorites,
               email: findUserInDB.email,
               name: findUserInDB.name
            }
            return next();
        } else return res.status(200).json({message: 'Incorrect email/password combination'});
    } catch (err) {
        return res.status(500).json({message: 'unknown error'})
    }
}

module.exports = verifyUser;