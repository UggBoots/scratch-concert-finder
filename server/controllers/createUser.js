const bcrypt = require('bcrypt');
const { User } = require('../db/index');

const saltRounds = 10;

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.query;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            'name': name, 
            'email':email, 
            'password':hashedPassword
        });
        return res.status(200).send('You successfully created a user')
    } catch(err) {
        console.log('createUser error', err);
        return res.status(500).send('Failed to create user');
    }
};

module.exports = createUser;