const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

// fonction qui va nous permettre de vérifier à chaque moment que c'est bien le bon utilisateur 
// pour lire un cookie avec node.js il faut importer la librairie cookie-parser

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                // res.cookie('jwt', '', { maxAge: 1 });
                next();
            } else {
                console.log("test de decodedtoken" + decodedToken);
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                console.log(res.locals.user);
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err);
             }else{
                 console.log(decodedToken.id);
                 next();
             }
        })
    }else{
        console.log('no token')
    }
}