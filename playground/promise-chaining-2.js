require('../src/db/mongooes');
const Tasks = require('../src/models/task');

Tasks.findByIdAndDelete('5c894c4918f8b2d83cce29fd').then((task) => {
    console.log(task)
    return Tasks.countDocuments()
}).then((result)=> {
    console.log(result);
}).catch((error) => {
    console.log(error);
});

const findAndDelete = async (id) => {
    const task = await Tasks.findByIdAndDelete(id);
    const count = await Tasks.countDocuments();
}

findAndDelete('5c894c4918f8b2d83cce29fd').then((result)=>{
    console.log(result);
}).catch((error) => {
    console.log(error);
})