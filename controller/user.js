module.exports = {

    exec: function exec(req, res){
        res.send(User.findOne(req.param('id')));
    },

    tip: function tip(req, res){
        log.silly(User);
        User.find({ id: req.param('id') }).exec(function(err, model) {
            model.save({ id: req.param('id') }, req.param('value'));
            res.send(model.toJSON()); // Will return only the name
        });

    }
};