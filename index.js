const express = require('express');
require('./src/db/mongooes');
const User = require('./src/models/users');
const Task = require('./src/models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.status(201).send(user);
    } catch(e){
        res.status(400).send(e);
    }
    


//    const user = new User(req.body).save().then((result)=>{
//         res.status(201).send(result);
//     }).catch((error)=>{
//         res.status(400).send(error);
//     })
});

app.post('/task', async (req, res) => {
    const task = new Task(req.body);
    try{
        await task.save();
        res.status(201).send(task);
    }
    catch(e){
        res.status(400).send(e);
    }
});

app.get('/users', async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(e){
        res.status(400).send(e);
    }
});

app.get('/users/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).send();
        }
        res.send(user);
    }
    catch(e){
        res.status(500).send(error);
    }
});

app.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({});
        res.send(tasks);
    }catch(e){
        res.status(500).send(error);
    }
});

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }
    catch(e){
        res.status(500).send(error);
    }
});

app.patch('/users/:id', async (req, res)=> {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'password', 'age', 'email'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidUpdate){
        res.status(400).send({error: 'Invalid update'});
    }

    try {
       const user = await User.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators: true});
       if(!user){
           return res.status(404).send();
       }
       res.send(user);
    }
    catch(e){
        res.status(500).send(e);
    }

})

app.patch('/task/:id', async (req, res)=> {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidUpdate){
        res.status(400).send({error: 'Invalid update'});
    }

    try {
       const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new : true, runValidators: true});
       if(!task){
           return res.status(404).send();
       }
       res.send(task);
    }
    catch(e){
        res.status(500).send(e);
    }

})


app.delete('/user/:id', async (req, res)=> {
    try {
       const user = await User.findByIdAndDelete(req.params.id);
       if(!user){
           return res.status(404).send({error: 'User Not found'});
       }
       res.send(user);
    }
    catch(e){
        res.status(500).send(e);
    }
})

app.delete('/task/:id', async (req, res)=> {
    try {
       const task = await Task.findByIdAndDelete(req.params.id);
       if(!task){
           return res.status(404).send({error: 'Task Not found'});
       }
       res.send(task);
    }
    catch(e){
        res.status(500).send(e);
    }
})

app.get('*', (req, res) => {
    res.send('<h1>Page not found</h1>')
})

app.listen(port, ()=> {
    console.log('Server listing on', port)
});

