const express = require('express');
const router = express.Router();
const User = require('../models/users');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');

const upload = multer({
    dest: 'avatar'
});

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch(e){
        res.status(400).send(e);
    }
});



router.post('/user/login', async (req,res) => {
    try{
        const user = await User.findByCredential(req.body.username, req.body.password);
        console.log(user)
        const token = await user.generateAuthToken();
        res.send({user, token});
    }
    catch(e){
        res.status(500).send();
    }
})


router.post('/user/logout', authMiddleware, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter(({token})=> token !== req.token);
        await req.user.save();
        res.send();
    }
    catch(e){
        res.status(500).send();
    }
});


router.post('/users/logoutAll', authMiddleware, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }
    catch(e){
        res.status(500).send();
    }
})

router.get('/users', authMiddleware , async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(e){
        res.status(400).send(e);
    }
});

router.get('/users/me', authMiddleware , async (req, res) => {
    res.send(req.user)
});


router.get('/users/me/avatar', [authMiddleware, upload.single('upload')] , async (req, res) => {
    res.send()
});

// router.get('/users/:id', authMiddleware, async (req, res) => {
//     try{
//         const user = await User.findById(req.params.id);
//         if(!user){
//             return res.status(404).send();
//         }
//         res.send(user);
//     }
//     catch(e){
//         res.status(500).send(error);
//     }
// });

router.patch('/users/me', authMiddleware, async (req, res)=> {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'password', 'age', 'email'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidUpdate){
        res.status(400).send({error: 'Invalid update'});
    }


    try {
       updates.forEach((update) => req.user[update] = req.body[update]);
       await req.user.save();
       //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators: true});
       await req.user.populate('tasks').execPopulate();
       res.send(req.user);
    }
    catch(e){
        res.status(500).send(e);
    }
});

router.delete('/user/:id', authMiddleware, async (req, res)=> {
    try {
    //    const user = await User.findByIdAndDelete(req.user._id);
    //    if(!user){
    //        return res.status(404).send({error: 'User Not found'});
    //    }
    //    res.send(user);

    await req.user.remove();
    res.send(req.user);
    }
    catch(e){
        res.status(500).send(e);
    }
})


module.exports = router;