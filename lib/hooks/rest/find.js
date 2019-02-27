module.exports = {
    /**
     * * Not yet used same a controllers/crud.js
     * @param req
     * @param res
     */
    find: function find(req, res){
        var Model = req.model;
        log.info(Model.name + ".find");
        Model
            .find({})
            .exec()
            .then(function (doc){
                res.send(200, doc);
            })
            .catch(function (err) {
                res.send(403, err)
            });
    },
    
    get: function get(req, res){
        log.debug("Get");
        this.find(req, res);
    }
}