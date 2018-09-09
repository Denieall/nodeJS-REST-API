const validator = require('validator');
const {mongoose} = require('./../db/mongoose');
const jwt = require("jsonwebtoken");
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// ------------------------------------------------------------------------------------
//  Model for user collection
//  Token only supported in mongo db
// ------------------------------------------------------------------------------------

// User schema passed into model
let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 1,
        required:true,
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

// UserSchema.methods == instance methods
// UserSchema.statics == model methods

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

UserSchema.statics.findByToken = function (token) {

    let decoded;

    try {
        decoded = jwt.verify(token, 'bearWHS99');
    } catch (e) {

        // return new Promise((resolve, reject) => {
        //     reject(e);
        // });

        return Promise.reject(); // same as comment above
    }

    return this.findOne({
        '_id': decoded._id,
        'tokens': {$elemMatch : {token: token , access: 'auth'}} // how to query nested arrays
    });
};

UserSchema.statics.findByCredentials = function (email, password) {

    return User.findOne({email}).then(
        (user) => {

            if (!user) {
                return Promise.reject("Invalid email");
            }

            // If some method dont support promise wrap it in (new Promise)
            return new Promise((resolve, reject) => {

                bcrypt.compare(password, user.password, (err, bool) => {

                    if (err) {
                        reject("Error");
                    }

                    if (bool) {
                        resolve(user.tokens[0].token);
                    } else {
                        reject("Invalid password");
                    }

                });

            });

        }
    );

};

// Setting up pre Mongoose Middleware
// Run some code before saving a document to db
// this middleware is for hashing the password before inserting into db
UserSchema.pre('save', function (next) {

    if (this.isModified('password')) {

        bcrypt.genSalt(10, (err, salt) => {

            bcrypt.hash(this.password, salt, (err, hash) => {

                this.password = hash;
                next();

            });

        });

    } else {
        next();
    }

});

let User = mongoose.model('User', UserSchema);

module.exports = {
    User
};