
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function (callback) {
    // yay!
});

var kittySchema = mongoose.Schema({
    name: String,
    email: String
})

var Kitten = mongoose.model('Kitten', kittySchema)

var silence = new Kitten({ name: 'Silence' , email: 'derrekmc@gmail.com'})

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name"
    log.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema)


module.exports = Kitten;