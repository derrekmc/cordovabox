module.exports = {
    model: null,
    /**
     * Needs matching auto routes class
     * Not yet used
     * @param req
     * @param res
     */
    get: function get(req, res){
        var Model = req.model;
        log.info(req.method, req.modelName);
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
    
    post: function post(req, res){
        var Model = req.model;
        log.info(req.method, req.modelName);
        Model
            .create(req.body)
            .then(function (doc){
                res.send(201, doc._doc);
            })
            .catch(function (err) {
                res.send(403, err)
            });
    },
    
    put: function post(req, res){
        var Model = req.model;
        log.info(req.method, req.modelName);
        Model
            .findAndModify(req.body)
            .then(function (doc){
                res.send(203, doc._doc);
            })
            .catch(function (err) {
                res.send(403, err)
            });
    },
    
    delete: function post(req, res){
        var Model = req.model;
        log.info(req.method, req.modelName);
        Model
            .delete(req.body)
            .then(function (doc){
                res.send(200);
            })
            .catch(function (err) {
                res.send(403, err)
            });
    },
}