var ModelSchema = new mongoose.Schema({

    id: String,
    name: String,
    
    url: String,
    
    updated: { type: Date, default: Date.now }
    
});

var Model = mongoose.model('Tracking', ModelSchema);
module.exports = Model;


