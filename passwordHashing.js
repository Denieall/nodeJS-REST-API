const bcrypt = require('bcryptjs');

let password = 'abc123';

// Run the algorithm 10 rounds then hash the password
bcrypt.genSalt(10, (err, salt) => {

    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });

});

// Compare the entered password and the hashed password
let hashedPassword = '$2a$10$v1vrfGPOIuUEPeRf/jDbK.LXGF1LEim29f8sHBwkenEvKaalnWL4W';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});