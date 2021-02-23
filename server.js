const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();


const router = jsonServer.router(path.join(__dirname, 'db.json'))

const userdb = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'UTF-8'));

server.use(jsonServer.defaults());

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json())

// Check if the user exists in database
function isAuthenticated({username, password}){
    console.log(userdb.users);
    return userdb.users.findIndex(user => user.username === username && user.password === password) !== -1
    
  }

server.post('/auth/login', (req, res) => {
    console.log(req.body);
    const {username, password} = req.body
    if (!isAuthenticated( {username, password} ) ) {
      const status = 401;
      const message = 'Incorrect Username or Password';
      res.status(status).json({status, message});
      return;
    }
    res.status(200).send("OK");
})



server.use(router)

server.listen(3000, () => {
  console.log('Backend Server Started')
})