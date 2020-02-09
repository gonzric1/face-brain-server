const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'ricky',
    password : 'rqer4134',
    database : 'facebrain-dev'
  }
});

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

const saltRounds = 10;


app.post('/signin', (request, response) => {

  db('users').where({
    email: request.body.email
  }).select('hash', 'id').then( resp => {
      bcrypt.compare(request.body.password, resp[0].hash.toString(), function(
      err,
      result,
      ) {

      if (result) {

        db('profile').where('userid', resp[0].id).then(profile => response.json(profile[0]));
      } else {
        console.log(err)
      }
    })
  })
})
    


app.post('/register', (request, response) => {
  const { email, name, password } = request.body;
  
  bcrypt.hash(password, saltRounds, function(
    err,
    hash,
  ) {

    if (hash) {
      db('users')
        .returning('*')  
        .insert({email: email, hash: hash})
        .then( user => { 
          db('profile')
          .returning('*')
          .insert({name: name, userid: user[0].id})
          .then( profile => response.status(200).json(profile[0]))
          .catch(error => response.status(400).json('unable to create profile'));
        })
        .catch(error => response.status(400).json('unable to register'));
    } else {

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
  const user = database.users[0]
  
  /*.find(
    element => element.id === parseInt(request.body.userid),
  );?*/
  if (user) {
    user.entries++;
    response.json({entries: user.entries});
  } else {
    response.status(404).json('User not found');
  }
});

app.listen(3001, () => {
  console.log('FaceBrain api running on port 3001');
});
