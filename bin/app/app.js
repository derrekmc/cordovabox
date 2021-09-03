(function() {
    let cordovabox;
    try {
        cordovabox = require('cordovabox');
    } catch (e) {
        console.error('To run an app using `node app.js`, you usually need to have a version of `cordovabox` installed in the same directory as your app.');
        console.error('To do that, run `npm install cordovabox`');
        console.error('');
        return;
    }
    // Start server
    cordovabox.start(process.env.PORT || 3000);
})();
