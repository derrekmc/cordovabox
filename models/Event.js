var ModelSchema = new mongoose.Schema({

    name: { type: String, default: ''}, 
    type: { type: String, default: ''}, // Transaction, Log Message, 
    description: { type: String, default: ''}, 
    action: { type: String, default: ''}, // Create, Read, Update, Delete 
    
    user: { type: String, default: 'System' },
    owner: { type: String, default: '' },
    
    createDate: { type: Date, default: Date.now}, 
    updated: { type: Date, default: Date.now},

});

var Model = mongoose.model('Event', ModelSchema);
module.exports = Model;


