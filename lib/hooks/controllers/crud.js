module.exports = {
    model: null,
    /**
     * Needs matching auto routes class
     * Not yet used
     * @param req
     * @param res
     */
    get: function (req, res){
        var Model = global[req.modelName];
        log.info(req.method, req.modelName);
        let query = {}
        if(req.param('id')) query.id = req.param('id')
        Model
            .find(query)
            .then(function (doc){
                res.send(200, doc);
            })
            .catch(function (err) {
                res.send(403, err)
            });
    },
    
    post: function (req, res){
        
        //var Model = req.model;
        var Model = global[req.modelName];
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
    
    put: function (req, res){
        //var Model = req.model;
        let query = {}
        if(req.param('id')) query.id = req.param('id')
        var Model = global[req.modelName];
        log.info(req.method, req.modelName);
        Model
            .update(query, req.body)
            .then(function (doc){
                res.send(203, doc._doc);
            })
            .catch(function (err) {
                res.send(403, err)
            });
    },
    
    delete: function (req, res){
        //var Model = req.model;
        var id = req.param('id');
        var Model = global[req.modelName];
        log.info(req.method, req.modelName, id);
        Model
            .destroy(id)
            .then(function (doc){
                res.send(200);
            })
            .catch(function (err) {
                res.send(403, err)
            });
    },
}