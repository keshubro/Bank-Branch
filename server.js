const fs = require('fs');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const path = require('path');
const base64ToImage = require('base64-to-image');

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

server.post('/image',(req, res) => {
  console.log(req.body);

  const objKey = Object.keys(req.body)[0];
  console.log(objKey);

  let objValue = req.body[objKey];
  console.log(objValue);

  // let base64Str = objValue.replace("data:", "").replace(/^.+,/,"");

  console.log("After replacing : "+ objValue);

    // const imageName = `profile${}`

  var path ='./src/images/';
  var optionalObj = {'fileName': objKey};

  var imageInfo= base64ToImage(objValue,path,optionalObj); 

  //var responseMessage = JSON.stringify(imageInfo);

  //console.log(responseMessage);
  
    
// Note base64ToImage function returns imageInfo which is an object with imageType and fileName.
// var imageInfo = base64ToImage(base64Str,path,optionalObj);


  res.status(200).send(imageInfo);
})


server.post('/image/save', (req, res) => {
    console.log(req.body);
    
    fs.writeFile(req.body.fileName, req.body.fileData);

    //Store image in db here
    
    res.status(200).send("OK");
})



server.use(router)

server.listen(3000, () => {
  console.log('Backend Server Started')
})