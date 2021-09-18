/**
 * Application Controller
 * This is a sample controller for the homepage. You can override it or delete it.
 */
module.exports = {
    homepage: function(req, res){
        res.render('index.html', {stats: _Config.stats})
        // You can use either .html or .ejs files.
        // res.render('views/homepage', {stats: _Config.stats})
    }
};
