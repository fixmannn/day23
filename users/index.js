const express = require('express');
const app = express();
app.use(express.json());

// variable to store data
var users = [];

// Route to get users data
app.get('/users/', (req, res) => {
  res.send(users);
});

// Route to create new user
app.post('/users/', (req, res) => {
  
  // Validator
  let body = req.body[0]; 
  let hasFullName = 'fullName' in body; // body key must contain fullName
  let hasUserName = 'userName' in body; // body key must contain userName
  let hasAddress = 'address' in body; // body key must contain address
  let checkLength = Object.keys(body).length; // the length of the body should be 3
  let userNameExist = users.some(user => user.userName == body.userName); // username must be unique
  
  // Validating the body request
  if (userNameExist) {
    res.status(400).send(`username ${body.userName} exist, try another one`);
  } else if (checkLength == 3 && hasFullName && hasUserName && hasAddress) {
    users.push(...req.body);
    res.send('New user has been created');
  // throw error if body is not valid
  }  else {
    res.status(400).send('Invalid input body, body should has fullName, userName, and address');
  }
});

// Server Port
app.listen(3000, () => {
  console.log('Server running on port 3000');
});