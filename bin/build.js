module.exports = {
    new: function (name){
        const fse = require('fs-extra');

        const srcDir = __dirname + `/../app`;
        const destDir = `${name}`;

        fse.copySync(srcDir, destDir, { overwrite: false });

        console.log(`Done creating app ${name}`);
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
