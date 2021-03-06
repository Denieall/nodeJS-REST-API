let {env} = require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

// DB connection
const {mongoose} = require('./db/mongoose');

// Modals
const {Todo} = require('./model/todo');
const {User} = require('./model/user');

// Middleware
const {authenticate} = require('./middleware/authenticate');

let app = express();

const port = process.env.PORT;

// Creating middleware to use body parse to post json POST request
app.use(bodyParser.json());

// Allow CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// -----------------------------------------------------------------------------------------------
// Todos route
// -----------------------------------------------------------------------------------------------

// POST request -- create new todos in database
app.post('/todos', authenticate, (req, res) => {

    // Creating new object from class (modal)
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
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
app.get('/todos', authenticate, (req, res) => {

    Todo.find({_creator: req.user._id}).then(
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

// -----------------------------------------------------------------------------------------------
// Users route
// -----------------------------------------------------------------------------------------------

// res.header() --- set a header value
// req.header() --- get a header value

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then(
        () => {
            return user.generateAuthToken();
        }
    ).then(
        (token) => {
            res.header('x-auth', token).send(user);
        }
    ).catch(
        (err) => {
            res.status(400).send(err);
        }
    );
});

// Using middleware to authenticate token
// Does middleware first if pass then do the actual request callback method
app.get('/users/me', authenticate, (req, res) => {

    res.send(req.user);

});

app.post('/users/login', (req, res) => {

    // line below should return body = {email: "something", password: "something"}
    let body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then(
        (token) => {
            res.header('x-auth', token).send({token});
        }

    ).catch(
        (errMsg) => {
            res.status(401).send({result: errMsg});
        }
    );

});

app.listen(port, () => {
    console.log(env + " environment");
    console.log("App started on port: " + port);
});


module.exports = {
    app
};


























