const mongoose = require("mongoose");

mongoose
    .connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.hoxrz.mongodb.net/XXXXXXXXXXXXX',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }
    ).then(() => console.log('Connected to MongoDb'))
    .catch((err) => console.log("Failed to connect to MongoDb", err));
