const bcrypt = require('bcrypt');
const { User } = require('../../db/index');

/**
 * 
 * @param {email, password} req.body 
 * @description middleware that uses email and password from req.body to create a new session.
 * @description the middleware will return a message saying user does not exist.  If user is found the hashed password from database will be 
 * @description to password provided by the client.  If passwords match a session will be created in database
 * 
 * @returns message saying that user was signed in and req.session.user
 */

const verifyUser =  async (req, res, next) => {
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