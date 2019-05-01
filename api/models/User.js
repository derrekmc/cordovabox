// var ModelSchema = new mongoose.Schema({
//     id: { type: "number" },
//     username: { type: "string" },
//     name: { type: "string" },
//     email: { type: "string" },
//
//     tips: { type: "number" },
//     tipGoal: { type: "number" },
//     tipTopic: { type: "string" },
//
//     credits: { type: "number" },
//     inPrivate: Boolean,
//
//     updated: { type: Date, default: Date.now }
// });
//
// // NOTE: methods must be added to the schema before compiling it with mongoose.model()
// ModelSchema.methods.canTip = function canTip(amount) {
//     return (this.credits >= amount);
// };
//
// var Model = mongoose.model('User', ModelSchema);
// module.exports = Model;

module.exports = {
    attributes:{
        
        username: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },

        tips: { type: "number" },
        tipGoal: { type: "number" },
        tipTopic: { type: "string" },

        credits: { type: "number" },
        inPrivate: {
            type: "boolean"
        }
    

    },
    methods:{
        canTip: function canTip(amount) {
            return (this.credits >= amount);
        }
    }
};