const bcrypt = require('bcrypt');
const { User } = require('../db/index');

const createUser = async (req, res, next) => {
    const { name, email, password } = req.query;
    try {
        const salt = await genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await new User({name, email, hashedPassword});
        newUser.save();
        return res.status(200).send('You successfully created a user')
    } catch(err) {
        console.log('createUser error', err);
        return res.status(500).send('Failed to create user');
    }
};

module.exports = createUser;