module.exports = [
    {
        route: '/',
        method: 'get',
        controller: function(req, res){
            res.render('index.html', {stats: _Config.stats});
        },
        action: 'homepage',
        policies: []
    }
]
