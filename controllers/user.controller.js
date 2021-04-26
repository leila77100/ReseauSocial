
const UserModel = require('../models/user.model');
//sert à la vérification: controler que les ID sont reconnus par la bd
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');// le -password permet de ne jamais renvoyer le password dans le front 
    res.status(200).json(users);
}


// ----------------------------------------------------------permet la recherche des informations de l'utilisateur -------------------------------------------------------------

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

//------------------------------------------------------------permet la mise à jour des données user --------------------------------------------------------

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

//------------------------------------------------------------permet la suppression des données user --------------------------------------------------------

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

//------------------------------------------------------------permet la gestion des follow-unfollow --------------------------------------------------------
module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
        return res.status(400).send('ID unknown: ' + req.params.id);
    try {
        //add to the followers list
        await UserModel.findByIdAndUpdate(
            req.params.id,
            //le addToSet veut dire rajoute à ce qu'on a déjà mis
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
// permet l'enregistrement de la note

module.exports.ratingUser = async (req, res) => {
    console.log('test params coté back', req.body)
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown: ' + req.params.id);
    try {
        await UserModel.findByIdAndUpdate(
            req.params.id,
            console.log('tralala'),
            {
                $push: {
                    rating: {
                        postId: req.body.postId,
                        ratingP: req.body.newRating,
                    },
                },
            },
            { new: true },
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