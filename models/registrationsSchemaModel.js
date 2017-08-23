var mongoose = require('mongoose');

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/registrationNumbers";

mongoose.connect(mongoURL, {
    useMongoClient: true
}, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("we are connected");
    }
});

var regNumberSchema = new  mongoose.Schema({
         registrationPlates: String,

});

const plateNumbers = mongoose.model('plateNumbers' , regNumberSchema)

module.exports = plateNumbers;
