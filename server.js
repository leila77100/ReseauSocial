const express = require('express'); // framework léger qui permet de coder plus rapidement
const bodyParser = require('body-parser');// permet de retourner du JSON dans le req
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes')
require('dotenv').config({path:'./configuration/.env'})
require('./configuration/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');

const app = express();

// donne les autorisations à faire des requêtes - si on ne passe rien en paramètre n'importe qui peut requêter et avoir accès à nos données
const corsOptions = {
    origin: process.env.CLIENT_URL, 
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposeHeaders' : ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false
}
app.use(cors(corsOptions));

  app.use(bodyParser.json()); // permet de traiter la data qui va transiter d'un point A à un poinnt B
  app.use(bodyParser.urlencoded({extended: true})); 
  app.use(cookieParser()); //middleware qui permet la lecture de l'information 
  

//jwt
// a chaque requête en GET il va y avoir un check de l'utilisateur 
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res)=>{
    res.status(200).send(res.locals.user._id)
});

//routes 
app.use('/api/user', userRoutes); // toutes les requêtes commençant par /api/user emmeneront vers userRoutes
app.use('/api/post', postRoutes);


//server: toujours en dernier
    app.listen(process.env.PORT, () =>{
        console.log(`listening on port ${process.env.PORT}`);
    })