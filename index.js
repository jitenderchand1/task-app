const express = require('express');
require('./src/db/mongooes');
const userRouter = require('./src/routers/user');
const taskRouter = require('./src/routers/task');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


const multer = require('multer');
const upload = multer({
    dest: 'images'
});

app.post('/upload', upload.single('upload'), (req,res) => {
    res.send()
})

app.get('*', (req, res) => {
    res.send('<h1>Page not found</h1>')
})

app.listen(port, ()=> {
    console.log('Server listing on', port)
});

