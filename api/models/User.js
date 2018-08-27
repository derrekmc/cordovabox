// var ModelSchema = new mongoose.Schema({
//     id: Number,
//     username: String,
//     name: String,
//     email: String,
//
//     tips: Number,
//     tipGoal: Number,
//     tipTopic: String,
//
//     credits: Number,
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
        id: Number,
        username: String,
        name: String,
        email: String,

        tips: Number,
        tipGoal: Number,
        tipTopic: String,

        credits: Number,
        inPrivate: Boolean,

        updated: { type: Date, default: Date.now }
    },
    methods:{
        canTip: function canTip(amount) {
            return (this.credits >= amount);
        }
    }
};