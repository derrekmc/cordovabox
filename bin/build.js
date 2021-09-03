module.exports = {
    new: async function (name){
        const fse = require('fs-extra');
        const srcDir = __dirname + `/app`;
        const destDir = require('path').resolve(`./${name}`) ;
        try{
            // console.log(srcDir);
            fse.copySync(srcDir, destDir, { overwrite: false });
        } catch (err){
            let message =``;
            if(err.message.indexOf(`EEXIST`) != -1) message = `Application ${name} already exists. Please select another name.`
            console.error(`Something went wrong with the generation`, message, err);
            process.exit();
        }
        try {
            const packageJson = require(`${destDir}/package.json`);
            packageJson.name = name;
            await fse.outputFile(`${destDir}/package.json`, JSON.stringify(packageJson, null, 2), { overwrite: true });
            console.log(`Done creating app ${name}`);
        }catch (err){
            let message =``;
            if(err.message.indexOf(`EEXIST`) != -1) message = `Application ${name} already exists. Please select another name.`
            console.error(`Something went wrong`, message, err);
        }
    },

    "generate-api": async function (name) {
        const fse = require('fs-extra');

        const controllerDirectory = `./api/controllers/${name}Controller.js`;
        try {
            await fse.outputFile(controllerDirectory, `
module.exports = {
    example: function(req, res){
        res.ok();
    }
};`)

        } catch (err) {
            console.error(err)
        }


        const modelDirectory = `./api/models/${name}.js`;
        try {
            await fse.outputFile(modelDirectory, `
module.exports = {
    attributes:{
        /**
         * name: {
         *   type: 'string',
         *   defaultsTo: ''
         * }
         **/      
    },
    methods:{
        /**
         * beforeCreate: (data) => {
         *   data.createdAt = new Date();
         *   return data;
         * }
         **/      
    }
};`)
            console.log(`${name} API creation complete `);
        } catch (err) {
            console.error(err)
        }


    }

}



































// const mkdirp = require('mkdirp');
// const base = `./test`;
// const folders =[
//     { path: `${base}/api/controllers` },
//     { path: `${base}/api/models` },
//     { path: `${base}/api/services` },
//     { path: `${base}/api/policies` },
//     { path: `${base}/api/sockets` },
//     { path: `${base}/config` },
//     { path: `${base}/assets` },
//     { path: `${base}/assets/js` },
//     { path: `${base}/assets/css` },
// ];
//
// for (const folder of folders){
//     const created = mkdirp.sync(folder.path);
//     if(created) console.log(`Created ${created}`);
// }
