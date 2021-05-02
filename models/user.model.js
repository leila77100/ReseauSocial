const mongoose = require('mongoose');
// import from library validator ,allows check the  the validity of an email, send true or false
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');// library that allows you to encrypt the password

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
            default: "./uploads/profil/random-user.png" // allows to put a picture default  at registration
        },
        bio: {
            type: String,
            max: 1024
        },
        followers: {
            type: [String] // array follower Id
        },
        following: {
            type: [String] // array following Id
        },
        likes: {
            type: [String] // array liked post id 
        },
        rating: {
            type: [
                {
                    postId: String,
                    ratingP: Number,
                }
            ]
        },
    },
    {
        timestamps: true,
    }
);

// play function before save into db;crypted before saving the password 
//pre is a method of bcrypt
//le next is a method which says 'once you have done it goes on' 
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//When we try to connect we compare the passwords according to the email with bcrypt
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password') // le throw stop the function and and trigger the error
    }
    throw Error('incorrect email')
}

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;