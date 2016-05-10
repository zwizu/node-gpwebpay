'use strict';

var crypto = require('crypto'),
    fs = require('fs');


exports.getSignatureBase = function(data, signBaseKeys) {
    var base = '';
    signBaseKeys.forEach(function(val){
        // skip on undefined
        if(typeof data[val] !== 'undefined'){
            base += data[val] + '|';
        }
    });

    base = base.substr(0, base.length-1);

    return base;
};


exports.sign = function(data, privateKeyPath, passphrase, cb ) {
    var sign = crypto.createSign('sha1');

    sign.update(data);
    fs.readFile(privateKeyPath, 'utf8', function (err, privateKey) {
        if(err){
            return cb(err);
        }
        var str = sign.sign({ key: privateKey, passphrase: passphrase }, 'base64');
        cb(null, str);
    });
};


exports.validateSign = function(data, publicKeyPath, signature, cb) {
    var verify = crypto.createVerify('sha1');

    verify.update(data);
    fs.readFile(publicKeyPath, 'utf8', function (err, publicKey) {
        if(err){
            return cb(err);
        }
        var valid = verify.verify(publicKey, signature, 'base64');
        cb(null, valid);
    });
};