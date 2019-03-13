const mongoose = require('mongoose');
const { isEmail } = require('validator');


const User = mongoose.model('User', {
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowerCase: true,
        validate(value){
            if(!isEmail(value)){
                throw new Error('Email is not Valid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age should be positive number')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password string is insecure');
            }
        }
    }
});

module.exports = User;