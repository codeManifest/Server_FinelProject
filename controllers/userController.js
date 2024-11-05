const jwt = require('jsonwebtoken')
const User = require('../models/user')
const dontenv = require('dotenv')

dontenv.config()
const JWT_secret = process.env.JWT_SECRET

exports.registerUser = async(req,res)=>{
    try{
        const { userName,password,email} = req.body

        const newUser =  user({ userName, password,email})
        await newUser.save()
        res.status(201).json({Message:"User register Sucsessfully"})

    } catch(err){
        if (err.name==='validationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            res.status(400).json({ message: messages.join(', ') }); 
        }else if (err.code && err.code === 11000) {
            // Handle duplicate key errors
            const field = Object.keys(err.keyValue);
            res.status(400).json({ message: `${field} already exists` });
    }else {
        // Handle other errors
        res.status(500).json({ message: 'something wrong in Server !  Please contact DEV.' });
      }
}
}