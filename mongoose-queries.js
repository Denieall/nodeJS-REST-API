const {ObjectID} = require('mongodb');
const {mongoose} = require('./server/db/mongoose');
const {Todo} = require('./server/model/todo');
const {User} = require('./server/model/user');

let id = '5b838dc68f92790a28fd9ca1';

let user_id = '5b7d7b97118f490b8c7b40ae';

if (ObjectID.isValid(id) === false || ObjectID.isValid(user_id) === false) {
    throw new Error("ID not valid");
}

// ------------------------------------------------------------------------------------------
// fetch data
// ------------------------------------------------------------------------------------------
// Mongoose will automatically convert id into new ObjectID('5b838dc68f92790a28fd9ca1')
Todo.find({_id: id}).then(
    (todos) => {

        if (todos.length < 1) {
            return console.log("No todos.");
        }

        // Returns an array
        console.log("Todos", todos);
    }
).catch(
    (err) => {
        console.log(err);
    }
);

Todo.findOne({_id: id}).then(
    (todo) => {
        if (todo === null) {
           return console.log("No todo");
        }

        // Returns an object
        console.log("Todo", todo);
    }
).catch(
    (err) => {
        console.log(err);
    }
);

Todo.findById(id).then(
    (todo) => {

        if (todo === null) {
            return console.log("ID not found");
        }

        console.log("Todo by id ", todo);
    }
).catch(
    (err) => {
        console.log(err);
    }
);

User.findById(user_id).then(
    (user) => {
        if (user === null) {
            return console.log("User not found");
        }

        console.log("User", user);
    }
);





























