const express = require ('express');
const router = express.Router();
const User = require ('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//Register
router.post('/register', (req, res) =>{
    let newUser = new User (req.body);
    bcrypt.genSalt(10,(err, salt) =>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err){
                res.json({success: false, msg:'Failed to register user'});
            }else{
                newUser.password = hash;
                newUser.save();
                res.json({success: true, msg: 'User registered'});
            }
        });
    });
});

//login
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const query = {email: email}
    User.findOne(query).then((user)=> {
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch){
                const token = jwt.sign(user.toJSON(), 'abcd', {
                    expiresIn: 604800 //1 week
                });
    
                res.json({
                    success: true,
                    token :  token
                });
            }else{
                return res.json({success: false, msg: 'Wrong Password'});
            }
        });
      
    });
});

module.exports= router;
