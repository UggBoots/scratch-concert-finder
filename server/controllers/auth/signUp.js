const bcrypt = require('bcrypt');
const { User } = require('../../db/index');

/**
 * @params req.body receives name, email and password from client
 * @description middleware that creates new user in database using bycrpt to hash password
 */

const saltRounds = 10;

const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            'name': name, 
            'email': email, 
            'password': hashedPassword
        });
        return next();
    } catch(err) {
        console.log('signUp error', err);
        return res.status(500).json({message: 'Failed to create user'});
    }
};

module.exports = signUp;