module.exports = {

    get: async function (req, res){
        let Model = global[req.modelName];
        const query = {id: req.params['id']};
        try{
            const response = await Model.find(query)
            res.status(200).send(response);
        }catch(err){
            res.status(403).send(err);
        }
    },

    post: async function (req, res){
        let Model = global[req.modelName];
        const body = req.body;
        const query = {id: req.params['id']};
        try{
            const response = await Model.create(body)
            res.status(201).send(response);
        }catch(err){
            res.status(403).send(err);
        }
    },

    put: async function (req, res){
        let Model = global[req.modelName];
        const body = req.body;
        const query = {id: req.params['id']};
        try{
            const response = await Model.update(query, body)
            res.status(203).send(response);
        }catch(err){
            res.status(403).send(err);
        }
    },

    delete: async function (req, res){
        let Model = global[req.modelName];
        const query = {id: req.params['id']};
        try{
            const response = await Model.delete(query)
            res.status(203).send(response);
        }catch(err){
            res.status(403).send(err);
        }
    }
}
