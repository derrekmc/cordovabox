#!/usr/bin/env node

var cordovaBuild = require('./build.js');
const package = require('../package.json');
const server = require('../lib/app');

// Delete the 0 and 1 argument (node and script.js)
var args = process.argv.splice(process.execArgv.length + 2);

switch (args[0]){
    case "-v":
        console.log("v" + package.version)
        break;
    case "new":
        if (args[1]){
            console.log("Generating App", args[0]);
            cordovaBuild.new(args[1]);
        }else{
            console.error("You did not specify a name for your application");
        }
        break;
    case "start":
        console.error("CordovaBox - Starting Server...");
        const port = process.env.PORT || 3000;
        try{
            server.listen(port);
        }catch (err){
            console.error(err);
        }
        break;
    default:
        console.log("Please specify what you would like to do such as: `cordovabox new appname`, `cordovabox -v` or `cordovabox start`");

}
