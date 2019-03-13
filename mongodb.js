//CRUD 

const mongodb = require('mongodb');
const { MongoClient, ObjectID } = mongodb;


const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (error, client) => {
    if(error){
        return console.log('Unable to connect', error);
    }
    console.log('Connected to databse');
    const db = client.db(databaseName);
    // db.collection('users').insertOne({
    //     name:'Devansh',
    //     age: 32,
    // }, (error, result)=>{
    //     if(error){
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(result.ops);
    // });

    // db.collection('users').insertMany([
    //     {
    //         name:'devansh',
    //         age: 4
    //     },
    //     {
    //         name: 'rahul',
    //         age: 13
    //     }
    // ], (error, result) => {
    //     if(error){
    //          return console.log('Unable to insert users');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Morning reading',
    //         completed: true,
    //     },
    //     {
    //         description: 'Pubg game',
    //         completed: true,
    //     },
    //     {
    //         description: 'Nodejs course',
    //         completed: false,
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert tasks');
    //     }
    //     console.log(result.ops);
    // })


    // Read operation
    // db.collection('users').findOne({_id: new ObjectID('5c876cb1137b8c9245a9ee39')}, (error, user) => {
    //     if(error){
    //         return console.log('Unable to find user');
    //     }
        
    //     console.log(user)
    // })

    // db.collection('users').find({age: 32}).toArray((error, users) => {
    //     if(error){
    //         return console.log('Users not found')
    //     }
        
    //     console.log(users)
    // })

    // db.collection('users').find({age: 32}).count((error, count) => {
    //     if(error){
    //         return console.log('Users not found')
    //     }
        
    //     console.log(count)
    // })

    // db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
    //     if(error){
    //         return console.log('Unable to get tasks')
    //     }
    //     console.log(tasks);
    // })

    // const updatePromise = db.collection('users').updateOne({_id: new ObjectID('5c8766f4bcd712911ab81eea')},{
    //     $set: {
    //         name: 'Jitender'
    //     },
    //     $inc: {
    //         age: 1,
    //     }
    // })


    // updatePromise.then((result)=>{
    //     console.log(result)
    //     console.log(error)
    // }).catch(()=>{
    //     console.log(error)
    // })

    // const updateMany = db.collection('tasks').updateMany({
    //     completed: true
    // },{
    //     $set: {
    //         completed: false
    //     }
    // });

    // updateMany.then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })

    db.collection('users').deleteMany({age: 13}).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })
})