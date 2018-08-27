const express = require('express');
const bodyParser = require('body-parser');

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

app.listen(3000, () => {
    console.log("http://localhost:3000");
});


module.exports = {
    app
};


























