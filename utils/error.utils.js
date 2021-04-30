//-------------------------------GESTION DES ERREURS EN LIEN AVEC LE SIGNUP----------------------------------------------------------

module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: '' }

    if (err.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect ou déjà pris";

    if (err.message.includes('email'))
        errors.email = "Email Incorrect";

    if (err.message.includes('password'))
        errors.password = "Le mot de passe doit faire plus de 6 caractères";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.email = "Ce pseudo est déjà pris "

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = "Cet email est déjà enregistré "

    return errors;
};


//-------------------------------GESTION DES ERREURS EN LIEN AVEC LE SIGNIN----------------------------------------------------------

module.exports.signInErrrors = (err)=>{
    let errors = {email: "", password:""}
    if(err.message.includes("email"))
    errors.email = "Email inconnu";

    if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

    return errors;
}

//-------------------------------GESTION DES ERREURS EN LIEN AVEC L'UPLOAD D'IMAGE----------------------------------------------------------

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: ""}; 

  if(err.message.includes("invalid File"))
  errors.format = "Format incompatible" ;

  if (err.message.includes("max size"))
  errors.maxSize = "Le fichier dépasse 500 ko"; 

  return errors
}