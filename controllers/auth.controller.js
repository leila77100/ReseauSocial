//file containing the registration login and logout of the user 
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrrors } = require('../utils/error.utils');


// expiration in milliseconds
const maxAge =  3 * 24 * 60 * 60 * 1000;


// function that creates the token 
const createToken=(id)=>{
    return jwt.sign({id}, process.env.TOKEN_SECRET,{
        expiresIn: maxAge 
    })
}

// -----------------------------------User register---------------------------------
module.exports.signUp = async (req, res) => {
    const { pseudo, email, password } = req.body
// destructuring: when I call pseudo it calls req.body.pseudo etc
    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors= signUpErrors(err)
        res.status(200).send({errors})
    }
}

// --------------------------------User login ----------------------------------------
module.exports.signIn = async (req, res) => {
    // destructuring: when I call email it calls req.body.email etc
    const{email, password} = req.body
    try{
const user =  await UserModel.login(email, password);
const token = createToken(user._id);
// create cookie, 1er param: cookie's name, 2eme param: token, 3eme param: token security
res.cookie('jwt', token, {httpOnly: true, maxAge})
res.status(200).json({user: user._id})    
}
    catch(err){
        const errors = signInErrrors(err)
res.status(200).json({errors});
    }
}

// ------------------------------------user logout------------------------------------ 
module.exports.logout = (req, res)=>{
res.cookie('jwt', '', {maxAge:1});
res.redirect('/');
}