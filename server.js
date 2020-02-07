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
app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
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
