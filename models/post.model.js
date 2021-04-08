const mongoose = require('mongoose'); 

const PostSchema = new mongoose.Schema(
    {
        posterId: {
            type: String, 
            required: true
        }, 
        message: {
            type: String, 
            trim: true, 
            maxlength: 280,
        },
        picture: {
            type: String,
        },
        video: {
            type: String,
        },
        likers: {
            type: [String],
            required: true,
        },
        comments : {
            type : [
                {
                    commenterId: String,
                    commenterPseudo: String, 
                    text: String,
                    timestamps: Number,
                }
            ], 
            required: true,
        }
    },
    {
        timestamps: true,
    }
)
const PostModel = mongoose.model('post', PostSchema);

module.exports = PostModel;