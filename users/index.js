const express = require('express');
const app = express();
app.use(express.json());

// variable to store data
var users = {};

// Route to get users data
app.get('/users/', (req, res) => {
  res.send(users);
});

// Route to create new user
app.post('/users/', (req, res) => {
  // Validating the body request
  if (Object.entries(req.body).length === 3 && 'fullName' in req.body && 'userName' in req.body && 'address' in req.body) {
    users = req.body;
    res.send('New user has been created');
  } else {
    res.status(400).send('Invalid input body, body should has fullName, userName, and address');
  }
});

// Server Port
app.listen(3000, () => {
  console.log('Server running on port 3000');
});