const path = require("path");
const server = require('./lib/app');
const hooks = require('./lib/hooks/index');
const open = require('open');
async function start () {
    const port = process.env.PORT || 3000;
    try{
        await server.listen(port);
        if(!String(process.env.NODE_ENV).includes('prod')) await open(`http://localhost:${port}`);
    }catch (err){
        console.error(err);
    }
}
module.exports = {
    start,
    server: require('./lib/app'),
    hooks: require('./lib/hooks/index')
}
