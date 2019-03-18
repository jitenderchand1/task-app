const jwt = require('jsonwebtoken');
const User = require('../models/users');


const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token,'jitenderchand');
        console.log(decoded)
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token});
        if(!user){
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch(e){
        return res.status(400).send({error: 'Please authenticate'})
    }
}

module.exports = auth;