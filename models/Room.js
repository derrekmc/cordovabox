var ModelSchema = new mongoose.Schema({
    id: Number,
    name: String,
    tips: Number,
    owner: String,
    price: Number,
    updated: { type: Date, default: Date.now }
});

var Model = mongoose.model('Room', ModelSchema);
module.exports = Model;