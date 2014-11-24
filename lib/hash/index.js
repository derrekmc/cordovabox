var crypto = require('crypto'),
    secretKey = require('config').site.secretKey;

exports.hash = function(strMemberId, strTimestamp, callback) {

    debugger;
    var hash = crypto.createHash('md5');
    hash.update(strMemberId + secretKey + strTimestamp);
    var result = hash.digest('hex');

    hash = crypto.createHash('md5');
    hash.update(result);
    result = hash.digest('hex');

    hash = crypto.createHash('md5');
    hash.update(result);

    callback(null, hash.digest('hex'))
};
