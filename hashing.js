// const {SHA256} = require('crypto-js');
//
// var message = "I am dj";
// var hash = SHA256(message).toString();
//
// console.log(message);
// console.log(hash);
//
// let data = {
//     id: 4
// };
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somestuff').toString()
// };
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somestuff').toString();
//
// if (token.hash === resultHash) {
//     console.log("Valid token");
// }  else {
//     console.log("Token is invalid");
// }

// --------------------------------------------------------------------------------------------------
//  JWT - JSON Web Token library
// --------------------------------------------------------------------------------------------------
const jwt = require("jsonwebtoken");

var data = {
    id: 95,
    password: '123abc456'
};

var token = jwt.sign(data, "secret");

console.log(token);

var decoded = jwt.verify(token, "secret");
console.log(decoded);
















