const express = require('express')

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(__dirname + '/public'))

app.post('/signin', (req, res) => {

})

/* /signin -> POST success/fail
 * /register -> POST success => return user
 * /profile/:userId -> GET user 
 * /image -> Put -> user => update user.count
 * 
 * 
 */ 

app.listen(3000, () =>{
    console.log('FaceBrain api running on port 3000')
})