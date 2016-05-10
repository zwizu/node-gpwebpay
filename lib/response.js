'use strict';

var gpwpConfig = require('./config'),
    gpwpUtils = require('./utils'),
    util = require('util'),
    extend = util._extend;

// DIGEST
var SIGN_BASE_KEYS = [
    'OPERATION',
    'ORDERNUMBER',
    'MERORDERNUM',
    'MD',
    'PRCODE',
    'SRCODE',
    'RESULTTEXT',
    'USERPARAM1',
    'ADDINFO'
];
var REQUIRED_FIELDS = [
    'MERCHANTNUMBER',   // this field is not from response but is necessary to DIGEST1 validation
    'OPERATION',
    'ORDERNUMBER',
    'PRCODE',
    'SRCODE',
    'DIGEST',
    'DIGEST1'
];


function CardPayResponse(responseData, options){
    this.data = extend({}, gpwpConfig.defaultData);
    this.data = extend(this.data, responseData);

    // parse codes to number
    this.data.PRCODE = Number(this.data.PRCODE);
    this.data.SRCODE = Number(this.data.SRCODE);

    this.options = extend({}, gpwpConfig.defaultOptions);
    this.options = extend(this.options, options);
}


CardPayResponse.prototype.validateSign = function(cb){
    var signBase = gpwpUtils.getSignatureBase(this.data, SIGN_BASE_KEYS);
    var data = this.data;
    var options = this.options;

    gpwpUtils.validateSign(signBase, options.publicKeyPath, data.DIGEST, function(err, valid){
        if(err){
            return cb(err);
        }

        if(!valid){
            return cb(null, 'DIGEST');
        }

        var digest1Base = signBase + '|' + data.MERCHANTNUMBER;
        gpwpUtils.validateSign(digest1Base, options.publicKeyPath, data.DIGEST1, function(err, valid){
            console.log('DIGEST1' + valid);
            if(err){
                return cb(err);
            }

            if(!valid){
                return cb(null, 'DIGEST1');
            }

            return cb(null, null);
        })
    });
};


CardPayResponse.prototype.validateFields = function(){
    var reqFields = REQUIRED_FIELDS[this.options.cipher] ? REQUIRED_FIELDS[this.options.cipher] : REQUIRED_FIELDS ['default'];
    var data = this.data;
    var reqFailed = reqFields.filter(function(fieldKey){
        return !data[fieldKey] || data[fieldKey] === '';
    });
    if(reqFailed.length > 0){
        return [
            'Missing required fields.',
            reqFailed
        ];
    }
    return null;
};


CardPayResponse.prototype.isSuccess = function(){
    return this.data.PRCODE === 0;
};


module.exports = CardPayResponse;