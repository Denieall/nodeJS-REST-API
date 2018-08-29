const {ObjectID} = require('mongodb');
const {mongoose} = require('./server/db/mongoose');
const {Todo} = require('./server/model/todo');
const {User} = require('./server/model/user');

// Remove all
Todo.deleteMany({}).then((res) => {
    console.log(res);
});


// Remove one document matching the filter
Todo.findOneAndDelete({_id: '5b854a49da00ae18b4d9e3f6', text: "Some text"}).then(
    (res) => {
        console.log(res);
    },

    (err) => {
        console.log("Unable to delete");
    }
);

Todo.findByIdAndDelete('5b85499eda00ae18b4d9e3f5').then(
    (todo) => {
        console.log(todo);
    },

    (err) => {
        console.log("Failed");
    }
);