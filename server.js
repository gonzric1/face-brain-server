const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(__dirname + "/public"));

const database = {
  users: [
    {
      id: 1,
      name: "John",
      email: "john@example.com",
      password: "password",
      entries: 0,
      joined: new Date()
    }
  ]
};

app.post("/signin", (request, response) => {
  if (
    request.body.email === database.users[0].email &&
    request.body.password === database.users[0].password
  ) {
    response.json("success");
  } else {
    response.status(400).json("error logging in");
  }
});

app.post("/register", (request, response) => {
  const { email, name, password } = request.body;
  database.users.push({
    id: database.users.length + 1,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });
  response.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (request, response) => {
  const index = database.users.find(
    element => element.id === parseInt(request.params.id)
  );
  console.log("index is: ", index);
  if (index !== undefined) {
    response.json(index);
    console.log("returning:", index);
  } else {
    response.status(404).json("Page not found");
    console.log("error 404");
  }
});

/* /signin -> POST success/fail
 * /register -> POST success => return user
 * /profile/:userId -> GET user
 * /image -> Put -> user => update user.count
 *
 *
 */

app.listen(3000, () => {
  console.log("FaceBrain api running on port 3000");
});
