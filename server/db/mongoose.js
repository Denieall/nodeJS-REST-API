const mongoose = require('mongoose');

// TODO: Tell mongoose to use es6 built in promise library
mongoose.Promise = global.Promise;

// TODO: Create db connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).catch(
    (err) => {
        console.log(err);
    }
);

module.exports = {
    mongoose
};