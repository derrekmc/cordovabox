module.exports = {
    attributes:{
        name: { type: "string"},
        type: { type: "string"}, // Transaction, Log Message,
        description: { type: "string"},
        action: { type: "string"}, // Create, Read, Update, Delete

        user: {
            type: "string",
            defaultsTo: 'System'
        },
        owner: {
            type: "string",
        }

        
    },
    methods:{}

};


