const express = require('express'),
      bodyParser = require('body-parser'),
      router = require('./route'),
      cors = require('cors'),
      morgan = require('morgan'),
      session = require('express-session');
      const fileUpload = require('express-fileupload');
      var https = require('https');
var http = require('http');
var fs = require('fs');
var options = {
    key: fs.readFileSync('./ssl/privkey.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
    ca:[
      fs.readFileSync('./ssl/chain.pem'),
      fs.readFileSync('./ssl/fullchain.pem')
    ]
  };
  
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use(express.static('public'));
app.use(cors());
app.use(morgan('combined'));
app.use(session({
    secret: 'secret',
    resave: true,
	saveUninitialized: true
}))

app.use('/', router);

// app.listen(11000,"0.0.0.0", ()=>{
//     console.log('Server started on port 11000' )
// })
http.createServer(app).listen(11000);
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(11111);