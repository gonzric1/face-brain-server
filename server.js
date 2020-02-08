const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors);
app.use(express.static(__dirname + '/public'));

const bcrypt = require('bcrypt');
const saltRounds = 10;

const database = {
  users: [
    {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      password: 'password',
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.post('/signin', (request, response) => {
  if (request.body.email === database.users[0].email) {
    bcrypt.compare(request.body.password, database.users[0].hash, function(
      err,
      result,
    ) {
      if (result) {
        response.json(database.users[0].id);
      } else {
        response.status(400).json('error logging in'); 
        break;
      }
    });
  } else {
    response.status(400).json('error logging in');
  }
});

app.post('/register', (request, response) => {
  const { email, name, password } = request.body;
  bcryptPassword = bcrypt.hash(myPlaintextPassword, saltRounds, function(
    err,
    hash,
  ) {
    if (hash) {
      return hash;
    } else {
      console.log(err);
    }
  });

  database.users.push({
    id: database.users.length + 1,
    name: name,
    email: email,
    password: bcryptPassword,
    entries: 0,
    joined: new Date(),
  });

  response.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (request, response) => {
  const index = database.users.find(
    element => element.id === parseInt(request.params.id),
  );

  if (index) {
    response.json(index);
  } else {
    response.status(404).json('Page not found');
  }
});

app.put('/image', (request, response) => {
  const user = database.users.find(
    element => element.id === parseInt(request.body.userid),
  );
  if (user) {
    user.entries++;
    response.json(user.entries);
  } else {
    response.status(404).json('User not found');
  }
});

app.listen(3001, () => {
  console.log('FaceBrain api running on port 3001');
});
