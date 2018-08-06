var ModelSchema = new mongoose.Schema({
    
    type: { type: String, default: 'transaction'},
    refTransId: { type: String, default: '' },
    
    amount: { type: String, default: '' },
    package: { type: String, default: '' },
    
    card_number: { type: String, default: '' },
    card_expire_year: { type: String, default: '' },
    card_expire_month: { type: String, default: '' },
    card_cvv: { type: String, default: '' },
    card_firstname: { type: String, default: '' },
    card_lastname: { type: String, default: '' },
    card_address: { type: String, default: '' },
    card_city: { type: String, default: '' },
    card_state: { type: String, default: '' },
    card_zip: { type: String, default: '' },
    
    owner: { type: String, default: '' },
    
    created: { type: Date, default: Date.now}, 
    updated: { type: Date, default: Date.now}
    
});

var Model = mongoose.model('Transaction', ModelSchema);
module.exports = Model;


