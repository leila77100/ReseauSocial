
const UserModel = require('../models/user.model');
//check if ID is known to the database
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');// the -password allows never to return the password in the front
    res.status(200).json(users);
}


// ----------------------------------------------------------allows the search for user information -------------------------------------------------------------

module.exports.userInfo = (req, res) => {
    console.log(req.params);
    // permet de tester si l'ID est connu de la base de données 
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id);
    // si l'Id est vérifié, on prend le user Model get
    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('ID unknown: ' + err);
    }).select('-password');
};

//------------------------------------------------------------allows user data to be updated --------------------------------------------------------

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id);
    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                if (err) return res.status(500).send({ message: err });
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

//------------------------------------------------------------allows the deletion of user data --------------------------------------------------------

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown: ' + req.params.id);
    try {
        await UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: 'Successfully deleted.' });
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}

//------------------------------------------------------------allows the management of follow-unfollow --------------------------------------------------------
module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
        return res.status(400).send('ID unknown: ' + req.params.id);
    try {
        //add to the followers list
        await UserModel.findByIdAndUpdate(
            req.params.id,
            //le addToSet add without overwriting
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err)
            }
        );
        //add to following list
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {

                if (err) return res.status(400).json(err)
            }
        )
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
}

module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow))
        return res.status(400).send('ID unknown: ' + req.params.id);
    try {
        await UserModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(400).json(err)
            }
        );
        //add to following list
        await UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {

                if (err) return res.status(400).json(err)
            }
        )
    }
    catch (err) {
        return res.status(500).json({ message: err })
    }
};
// allows the recording of the note

module.exports.ratingUser = async (req, res) => {
    console.log('test params coté back', req.body)
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.postId))
    return res.status(400).send('ID unknown: ' + req.params.id);
    
    try {
        await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: {
                    rating: {
                        postId: req.body.postId,
                        ratingP: req.body.newRating,
                    },
                },
            },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    }
    catch (err) {
        return res.status(400).send(err);
    }
};
