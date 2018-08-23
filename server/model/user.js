const {mongoose} = require('./../db/mongoose');

// ------------------------------------------------------------------------------------
//  Model for user collection
// ------------------------------------------------------------------------------------

let User = mongoose.model('User', {
    email: {
        type: String,
        minlength: 1,
        require:true,
        trim: true
    }
});

module.exports = {
    User
};