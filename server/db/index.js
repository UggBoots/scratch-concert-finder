const mongoose = require('mongoose');
const config = require('../config');
const { database } = config;

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'inTheLoop',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: {type: Array, required: false},
  image: {type: String, required: false },
});


const User = mongoose.model('users', userSchema);

module.exports = {
  User
};
