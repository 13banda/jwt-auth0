const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan')
const cors = require('cors');

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

// import the configration
const config = require("./conf")
// import todo route
const todo = require('./router/todo')

app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// cors settings
const whitelist  = ['http://localhost:3001','http://192.168.43.45:3001']
app.use(cors({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin ) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods:['GET','POST','OPTIONS'],
  allowedHeaders:['Content-Type','Authorization'],
  credentials: true,
}));


var jwtCheck = jwt({
      secret: jwks.expressJwtSecret(config.auth0.jwt),
    audience: config.auth0.audience,
    issuer: config.auth0.issuer,
    algorithms: config.auth0.algorithms
});

app.use(jwtCheck);

app.use('/todo',todo)

app.listen(config.port,()=>{
  console.log(`Todo app listen on ${config.port}`);
})
