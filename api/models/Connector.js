module.exports = {
    attributes:{
        name: { type: "string", defaultsTo: ""},
        type: { type: "string", defaultsTo: ""}, // Transaction, Log Message,
        description: { type: "string", defaultsTo: ""},
        action: { type: "json", defaultsTo: { method:"post", url: "http://"}}, // Create, Read, Update, Delete
        user: { type: "string", defaultsTo: "System" },
        owner: { type: "string", defaultsTo: "" },

        createdAt: {
            type: 'string',
            defaultsTo: String(new Date()).toString()
        },
        updatedAt: {
            type: 'string',
            defaultsTo: String(new Date()).toString()
        },
    },
    methods:{}

};


