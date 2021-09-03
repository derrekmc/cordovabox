const path = require("path");
// const server = require('./lib/app');
// const hooks = require('./lib/hooks/index');
async function start () {
    const port = process.env.PORT || 3000;
    try{
        await server.listen(port);
    }catch (err){
        console.error(err);
    }
}
console.log(`This is the main library repo. Try npm install cordovabox instead.`)
module.exports = {
    start,
    server: require('./lib/app'),
    hooks: require('./lib/hooks/index')
}
