const bcrypt = require('bcrypt');
const { User } = require('../db/index');

// signup middleware 

const saltRounds = 10;

const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.query;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            'name': name, 
            'email': email, 
            'password': hashedPassword
        });
        return next();
    } catch(err) {
        console.log('createUser error', err);
        return res.status(500).json({message: 'Failed to create user'});
    }
};

module.exports = signUp;