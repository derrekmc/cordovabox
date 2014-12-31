module.exports = {
    exec: function exec(req, res){
        res.send('API: /api/exampleName/:id/:value');
    },

    tip: function exec(req, res){
        res.send('tip');
    }
};