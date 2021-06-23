const path = require("path");
const server = require('./lib/app');
async function start () {
    const port = process.env.PORT || 3000;
    try{
        await server.listen(port);
    }catch (err){
        console.error(err);
    }
}
module.exports.start = start();
