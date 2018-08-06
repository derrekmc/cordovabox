var ModelSchema = new mongoose.Schema({

    id: String,
    name: String,
    
    email: Object,
    
    updated: { type: Date, default: Date.now }
    
});

var Model = mongoose.model('Mail', ModelSchema);
module.exports = Model;