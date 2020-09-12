const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../db/database');

// create user Schema & model
const UserSchema = new Schema ({
    email:{
        type: String,
        required: [true,'email field is required']
    },
    password:{
        type: String,
        required: [true,'password field is required']
    },
   
});

const User = mongoose.model('user',UserSchema);

module.exports = User;