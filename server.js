const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

const bcrypt = require('bcrypt');
const saltRounds = 10;

const database = {
  users: [
    {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      password: '$2y$10$ZPu0.UmKGZcJV0jja.khL.P4s33/sP/xEb8NiGE4a/outFgAeLOGi',
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
        response.json(database.users[0]);
      } else {
        response.status(400).json(err); 
      }
    });
  } else {
    response.status(400).json('error logging in');
  }
});

app.post('/register', (request, response) => {
  const { email, name, password } = request.body;
  
  bcrypt.hash(password, saltRounds, function(
    err,
    hash,
  ) {
    console.log('bcrypting')
    if (hash) {
      database.users.push({
        id: database.users.length + 1,
        name: name,
        email: email,
        password: hash,
        entries: 0,
        joined: new Date()
      }); 
      console.log('new user registered', database.users[database.users.length-1])
      response.status(200).json("User Registered");
    } else {
      console.log(err);
      response.status(400)
    }
  });


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
