const validator = require('validator');
const {mongoose} = require('./../db/mongoose');
const jwt = require("jsonwebtoken");
const _ = require('lodash');

// ------------------------------------------------------------------------------------
//  Model for user collection
//  Token only supported in mongo db
// ------------------------------------------------------------------------------------

// User schema passed into model
let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 1,
        require:true,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email'
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    tokens: [
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
});

// Overriding the existing function in mongoose
// to JSON run when res.send() is called
UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// Where instance methods are defined
// 'this' keyword can be only used with functions that have the 'function' keyword
UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'bearWHS99').toString();

    user.tokens.push({access, token});

    // Inside then method you don't have to return another promise a simple value is fine to trigger another success method
    return user.save().then(
        () => {
            return token;
        }
    );
};

let User = mongoose.model('User', UserSchema);

module.exports = {
    User
};