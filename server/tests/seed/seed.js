const {ObjectID} = require('mongodb');
const {Todo} = require("../../model/todo");
const {User} = require("../../model/user");
const jwt = require('jsonwebtoken');

// Dummy data
// new ObjectID() method generates a random id automatically.
const user1ID = new ObjectID();
const user2ID = new ObjectID();

const users = [
    {
        _id: user1ID,
        email: 'user1@gmail.com',
        password: 'password1',
        tokens: [
            {
                access: 'auth',
                token: jwt.sign({_id: user1ID, access: 'auth'}, 'bearWHS99').toString()
            }
        ]
    },

    {
        _id: user2ID,
        email: 'user2@gmail.com',
        password: 'password2'
    }
];

const todos = [
    {_id: new ObjectID(), text: "First todo", _creator: user1ID},
    {_id: new ObjectID(), text: "Second todo", completed: true, completedAt: 333, _creator: user2ID}
];




const populateTodos = (done) => {
    // Delete all data in todos collection
    Todo.deleteMany({}).then(() => {

        return Todo.insertMany(todos);

    }).then(
        () => {
            done();
        }
    ).catch(
        (err) => {
            console.log("Error: ", err);
        }
    );
};




const populateUsers = (done) => {
    User.remove({}).then(
        () => {

            // Store promise inside variable
            let userOne = new User(users[0]).save();
            let userTwo = new User(users[1]).save();

            // Promise utility method
            // Wait for the two promises to complete before running
            return Promise.all([userOne, userTwo]);
        }
    ).then(
        () => {
            done();
        }
    );
};

module.exports = {
    todos,
    populateTodos,
    populateUsers,
    users
};
