const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// DB connection
const {mongoose} = require('./db/mongoose');

// Modals
const {Todo} = require('./model/todo');
const {User} = require('./model/user');

let app = express();

const port = process.env.PORT || 3000;

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
                res.status(404).send({});
            } else {
                res.send({todo});
            }
        });
    }
});

// TODO: Remove a todo
app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (ObjectID.isValid(id) === false) {
        res.status(404).send({result: "ID is invalid"});
    } else {

        Todo.findByIdAndDelete(id).then(
            (todo) => {
                if (todo === null) {
                    res.status(404).send("No documents with that id");
                } else {
                    res.send({todo});
                }
            },

            (err) => {
                res.send("Unable to delete");
            }
        );

    }
});

// TODO: Updating a todo
app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;

    var body = _.pick(req.body, ['text', 'completed']);

    if (ObjectID.isValid(id) === false) {
        res.status(404).send({result: "ID is invalid"});
    } else {

        if(_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findByIdAndUpdate(id, {
            $set: body
        }, {
            new: true
        }).then(
            (todo) => {
                if (todo === null) {

                    res.status(404).send();

                } else {

                    res.status(200).send({todo});

                }
            }
        ).catch(
            (err) => {
                res.status(404).send();
            }
        );

    }
});


app.listen(port, () => {
    console.log("App started on port: " + port);
});


module.exports = {
    app
};


























