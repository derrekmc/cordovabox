module.exports = {
    attributes:{
        type: { type: "string", defaultsTo: 'transaction'},
        refTransId: { type: "string", defaultsTo: '' },

        amount: { type: "string", defaultsTo: '' },
        package: { type: "string", defaultsTo: '' },

        card_number: { type: "string", defaultsTo: '' },
        card_expire_year: { type: "string", defaultsTo: '' },
        card_expire_month: { type: "string", defaultsTo: '' },
        card_cvv: { type: "string", defaultsTo: '' },
        card_firstname: { type: "string", defaultsTo: '' },
        card_lastname: { type: "string", defaultsTo: '' },
        card_address: { type: "string", defaultsTo: '' },
        card_city: { type: "string", defaultsTo: '' },
        card_state: { type: "string", defaultsTo: '' },
        card_zip: { type: "string", defaultsTo: '' },

        owner: { type: "string", defaultsTo: '' },

        
    }
};


