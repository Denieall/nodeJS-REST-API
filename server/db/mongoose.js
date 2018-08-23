const mongoose = require('mongoose');

// TODO: Tell mongoose to use es6 built in promise library
mongoose.Promise = global.Promise;

// TODO: Create db connection
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }).catch(
    (err) => {
        console.log(err);
    }
);

module.exports = {
    mongoose
};