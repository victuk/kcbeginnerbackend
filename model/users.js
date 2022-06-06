const mongoose = require('mongoose');
const { Schema } = mongoose;

const user = new Schema({
    username: String,
    email: String,
    password: String,
    role: String
});

const userSchema = mongoose.model('users', user);

module.exports = { userSchema };
