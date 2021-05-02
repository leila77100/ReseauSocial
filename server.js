const express = require('express'); 
const bodyParser = require('body-parser');// return JSON in the req
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes')
require('dotenv').config({path:'./configuration/.env'})
require('./configuration/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');

const app = express();

// gives permissions to make requests - if we do not pass anything in parameter anyone can request and have access to our data
const corsOptions = {
    origin: process.env.CLIENT_URL, 
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposeHeaders' : ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));

  app.use(bodyParser.json()); 
  app.use(bodyParser.urlencoded({extended: true})); 
  app.use(cookieParser()); //middleware which allows to read the cookie
  

//jwt
// check user  at each request
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res)=>{
    res.status(200).send(res.locals.user._id)
});

//routes 
app.use('/api/user', userRoutes); 
app.use('/api/post', postRoutes);


//server: always last
    app.listen(process.env.PORT, () =>{
        console.log(`listening on port ${process.env.PORT}`);
    })