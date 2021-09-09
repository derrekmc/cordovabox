module.exports = {
    homepage: function(req, res){
        res.render('index.html', {stats: _Config.stats})
    }
};
