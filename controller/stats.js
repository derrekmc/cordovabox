module.exports = {
    exec: function(req, res){
        res.send({success: 1, message: 'worked ' + req.body.api});
    }
}