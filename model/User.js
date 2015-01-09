
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
    // yay!
});

var userSchema = mongoose.Schema({
    name: String,
    email: String
});

var User = mongoose.model('User', userSchema);

var silence = new User({ name: 'Silence' , email: 'derrekmc@gmail.com'});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
userSchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name";
    log.log(greeting);
};

var User = mongoose.model('User', userSchema);


//module.exports = User;