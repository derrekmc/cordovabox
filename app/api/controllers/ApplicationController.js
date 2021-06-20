/**
 * UserController.js
 *
 * @module      :: Controller
 * @description :: Provides the base user
 *                 actions used to make waterlock work.
 *
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = {

    homepage: function(req, res){
        res.render('index.html', {stats: _Config.stats})
    }

};
