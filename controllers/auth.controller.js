//fichier qui abrite l'inscription la connexion et deconnexion de l'utilisateur 
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrrors } = require('../utils/error.utils');


// expiration en milliseconde
const maxAge =  3 * 24 * 60 * 60 * 1000;


// fonction qui créé le token 
const createToken=(id)=>{
    return jwt.sign({id}, process.env.TOKEN_SECRET,{
        expiresIn: maxAge 
    })
}


module.exports.signUp = async (req, res) => {
    const { pseudo, email, password } = req.body
// ici nous avons destructurer la fonction cad que dans le try quand on appelle pseudo ça appelle req.body.pseudo grace à la variable du haut
    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors= signUpErrors(err)
        res.status(200).send({errors})
    }
}

// permet la connection de l'utilisateur 
module.exports.signIn = async (req, res) => {
    // destructuring email sera égal à req.body.email...
    const{email, password} = req.body
    try{
const user =  await UserModel.login(email, password);
const token = createToken(user._id);
res.cookie('jwt', token, {httpOnly: true, maxAge})// création d'un cookie, 1er param: jwt est le nom du cookie, 3eme param c'est les caractéristiques et notament la sécurisation du token 
res.status(200).json({user: user._id})    
}
    catch(err){
        const errors = signInErrrors(err)
res.status(200).json({errors});
    }
}

// permets la deconnexion de l'utilisateur 
module.exports.logout = (req, res)=>{
res.cookie('jwt', '', {maxAge:1});
res.redirect('/');
}