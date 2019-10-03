module.exports = {
    get: function exec(req, res){
        res.send('API: /api/exampleName/:id/:value');
    },

    tip: function exec(req, res){
        User.findOne({id: req.param('username')}, function(err, user){
            res.send('tip' + user);
        });
    }
};