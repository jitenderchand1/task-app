require('../src/db/mongooes');
const User = require('../src/models/users');

User.findByIdAndUpdate('5c89494229cc2fd7e567a1b6',{
    age: 1
}).then((result) => {
    console.log(result)
    return User.countDocuments({age:1})
}).then((result)=> {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

const findAndUpdate = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({ age: 1 });
    return count;
}

findAndUpdate('5c89494229cc2fd7e567a1b6', 1).then((user) => {
    console.log(user)
}).catch((error) => {
    console.log(error)
})
