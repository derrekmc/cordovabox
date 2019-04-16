module.exports = {
    attributes:{
        name: { type: "string", default: ''},
        type: { type: "string", default: ''}, // Transaction, Log Message,
        description: { type: "string", default: ''},
        action: { type: "string", default: ''}, // Create, Read, Update, Delete

        user: { type: "string", default: 'System' },
        owner: { type: "string", default: '' },

        createDate: { type: Date, default: Date.now},
        updated: { type: Date, default: Date.now},
        id: { type: "number", autoIncrement: true },
    },
    methods:{}

};


