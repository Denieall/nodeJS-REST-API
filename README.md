<div align="center">
<img src="https://github.com/Denieall/nodeJS-REST-API/blob/master/images/logo.png" width="200" height="200" />
<h1 align="center">NodeJS REST API using MongoDB</h1>
</div>

<div>
<p></p>
<p>This api was deployed on <b>heroku</b> and it's a simple todo api that handles the following request:</p>
<img src="https://github.com/Denieall/nodeJS-REST-API/blob/master/images/request.PNG" />
</div>

## Example for listing all todos of a particular user from heroku
* Use GET request to the url: https://deniealltodoapi.herokuapp.com/todos and set header ('x-auth', token)
* PS: Running without setting the header will result in HTTP error code 401

<p>Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjk2YWViYjA3ZWM2NjAwMTRkYjcxNmMiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM2NjAxNzg3fQ.dV9IZJrEp3uGI9fEWvT5WNPnp_3EOrIDL720DH5qcyI</p>


## Objective
This api was built in order to learn about web services and:

* Deploying to heroku and setup mLab
* Adjust npm scripts
* Learn about Node environment variables
* Create and manage routes using Express
* Authenticating users using express middleware
* Sending responses to different api request
* Create model and instance methods in Mongoose
* Perform filtering for user input in mongoose schema
* Create Mongoose middleware that hashes the password on every save()
* Set and get HTTP headers
* Provide secure and private api access by using tokens(JWT).
* Learn about NoSQL and MongoDB
* To perform unit testing on specific routes

## Library/API Used

<ul>
 <li>
 Dependencies
 <ol type="1">
 <li><a href="https://github.com/dcodeIO/bcrypt.js">&nbsp;bcryptjs </a>by dcodeIO</li>
 <li><a href="https://github.com/expressjs/body-parser">&nbsp;body-parser </a>by expressjs</li>
 <li><a href="https://github.com/expressjs/express">&nbsp;express </a>by expressjs</li>
 <li><a href="https://github.com/auth0/node-jsonwebtoken">&nbsp;jsonwebtoken </a>by auth0</li>
 <li><a href="https://github.com/lodash/lodash">&nbsp;lodash </a>by lodash</li>
 <li><a href="https://github.com/mongodb/node-mongodb-native">&nbsp;mongodb </a>by mongodb</li>
 <li><a href="https://github.com/Automattic/mongoose">&nbsp;mongoose </a>by Automattic</li>
 <li><a href="https://github.com/chriso/validator.js">&nbsp;validator </a>by chriso</li>
 </ol>
 </li>
 
 <br>
 
 <li>
 Testing Dependencies
 <ol type="1">
  <li><a href="https://github.com/mjackson/expect">&nbsp;expect </a>by mjackson</li>
  <li><a href="https://github.com/mochajs/mocha">&nbsp;mocha </a>by mochajs</li>
  <li><a href="https://github.com/visionmedia/supertest">&nbsp;supertest </a>by visionmedia</li>
 </ol>
 </li>
</ul>

## Test Screenshot
<table broder="0">
  <tr>
    <td><img src="https://github.com/Denieall/nodeJS-REST-API/blob/master/images/test.PNG" /></td>
  </tr>
<table>

## Screenshots (API called using Postman)
<table broder="0">
  <tr>
    <td><img src="https://github.com/Denieall/nodeJS-REST-API/blob/master/images/create%20new%20user.PNG" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/Denieall/nodeJS-REST-API/blob/master/images/login%20user.PNG" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/Denieall/nodeJS-REST-API/blob/master/images/create%20new%20note.PNG" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/Denieall/nodeJS-REST-API/blob/master/images/list%20all%20todo.PNG" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/Denieall/nodeJS-REST-API/blob/master/images/get%20specific%20todo.PNG" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/Denieall/nodeJS-REST-API/blob/master/images/update%20todo.PNG" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/Denieall/nodeJS-REST-API/blob/master/images/delete%20todo.PNG" /></td>
  </tr>
<table>
