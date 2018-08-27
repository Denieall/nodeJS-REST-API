const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// DB connection
const {mongoose} = require('./db/mongoose');

// Modals
const {Todo} = require('./model/todo');
const {User} = require('./model/user');

let app = express();

// Creating middleware to use body parse to post json POST request
app.use(bodyParser.json());

// POST request -- create new todos in database
app.post('/todos', (req, res) => {

    // Creating new object from class (modal)
    let todo = new Todo({
        text: req.body.text
    });

    // Saving the object into db
    todo.save().then(
        (doc) => {
            res.status(200).send(doc);
        },

        (err) => {
            res.status(400).send("Unable to save todo");
        }
    );

});

// GET request -- get all todos from db
app.get('/todos', (req, res) => {

    Todo.find().then(
        (todos) => {
            res.send({todos});
        },

        (err) => {
            res.status(400).send(err);
        }

    );

});

// GET request --- get single todo --- /todos/todo1
app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (ObjectID.isValid(id) === false) {
        res.status(404).send({result: "ID is invalid"});
    } else {
        Todo.findById(id).then((todo) => {
            if (todo === null) {
                res.send({});
            }

            res.send({todo});
        });
    }
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});


module.exports = {
    app
};


























