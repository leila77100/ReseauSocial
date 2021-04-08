const mongoose = require('mongoose');
// import de la bibliothèque validator spécifique à node.js,permet de controler la validité d'un mail, ça envoi true ou false
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');// bibliothèque qui permet de crypter le mot de passe 

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxlength: 55,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6,
        },
        picture: {
            type: String,
            default: "./uploads/profil/random-user.png" // permet de mettre une photo par default tant que le user n'en met pas 
        },
        bio: {
            type: String,
            max: 1024
        },
        followers: {
            type: [String] // permettra d'avoir un tableau d'Id des followers
        },
        following: {
            type: [String] // permettra d'avoir un tableau d'Id des personnes que le user suit
        },
        likes: {
            type: [String] // permettre d'avoir un tableau des ID des posts likés, pour que le user ne puisse pas liker plusieurs fois un post & retourver les posts likés 
        }
    },
    {
        timestamps: true,
    }// permet de connaittre l'heure précise d'enregistrement 
);

// play function before save into db;crypter avant d'enregistrer le mot de passe 
//pre est une méthode de bcrypt
//le next est une methode qui dit 'une foois que tu as fait ça passe à la suite 
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//Quand on tente de se connecter on compare les mots de passe en fonction de l'email qui est récupéré avec bcrypt
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password') // le throw arrête la fonction et déclenche erreur 
    }
    throw Error('incorrect email')
}

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;