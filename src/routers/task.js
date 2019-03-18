const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const authMiddleware = require('../middleware/auth');


router.post('/task', authMiddleware, async (req, res) => {
    const task = new Task({...req.body, owner: req.user._id });
    try{
        await task.save();
        res.status(201).send(task);
    }
    catch(e){
        res.status(400).send(e);
    }
});



router.get('/tasks', authMiddleware, async (req, res) => {
    try{
        //const tasks = await Task.find({owner: req.user._id});
        const match ={};
        const sort = {};
        if(req.query.completed){
            match.completed = req.query.completed === 'true';
        }
        if(req.query.sortBy){
            const parts = req.query.sortBy.split(':');
            sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        }
        await req.user.populate({
            path: 'tasks',
            match,
            options:{
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: {
                    createdAt: 1
                }
            }
        }).execPopulate();
        res.send(req.user.tasks);
    }catch(e){
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', authMiddleware, async (req, res) => {
    try {
        //const task = await Task.findById(req.params.id);
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        await task.populate('owner').execPopulate();
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }
    catch(e){
        res.status(500).send(error);
    }
});

router.patch('/task/:id', authMiddleware, async (req, res)=> {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidUpdate){
        res.status(400).send({error: 'Invalid update'});
    }

    try {
        const task = await Task.findOne({_id:req.params.id, owner: req.user._id});
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save(); 
       //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators: true});
       if(!task){
           return res.status(404).send();
       }
       res.send(task);
    }
    catch(e){
        res.status(500).send(e);
    }

})


router.delete('/task/:id', authMiddleware, async (req, res)=> {
    try {
       const task = await Task.findOneAndDelete({_id:req.params.id, owner: req.user});
       if(!task){
           return res.status(404).send({error: 'Task Not found'});
       }
       res.send(task);
    }
    catch(e){
        res.status(500).send(e);
    }
})


module.exports = router;