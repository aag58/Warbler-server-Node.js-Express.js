const mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.Promise = Promise; 

// mongoose.connect("mongodb://localhost/warbler", {
//     keepAlive: true,
//     // useMongoClienr: true        // just so we dont get any warnings related to mongo db
// });

// aoSk0QhzcQ8Rw6uL
var uri ="mongodb://Aditya:aoSk0QhzcQ8Rw6uL@warbler-shard-00-00-nf4vq.mongodb.net:27017,warbler-shard-00-01-nf4vq.mongodb.net:27017,warbler-shard-00-02-nf4vq.mongodb.net:27017/test?ssl=true&replicaSet=Warbler-shard-0&authSource=admin"
mongoose.connect(uri, {
    keepAlive: true,
    // useMongoClient: true        // just so we dont get any warnings related to mongo db
});



module.exports.User = require("./user");
module.exports.Message = require("./message");