'use strict';

var gpwpConfig = require('./config'),
    gpwpUtils = require('./utils'),
    util = require('util'),
    extend = util._extend;

var SIGN_BASE_KEYS = [
    'MERCHANTNUMBER',
    'OPERATION',
    'ORDERNUMBER',
    'AMOUNT',
    'CURRENCY',
    'DEPOSITFLAG',
    'MERORDERNUM',
    'URL',
    'DESCRIPTION',
    'MD',
    'USERPARAM1',
    'FASTPAYID',
    'PAYMETHOD',
    'DISABLEPAYMETHOD',
    'PAYMETHODS',
    'EMAIL',
    'REFERENCENUMBER',
    'ADDINFO'
];
var REQUIRED_FIELDS = [
    'MERCHANTNUMBER',
    'OPERATION',
    'ORDERNUMBER',
    'AMOUNT',
    'DEPOSITFLAG',
    'URL'
]; //+DIGEST


function GPWebPayRequest(paymentData, options) {
    this.data = extend({}, gpwpConfig.defaultData);
    this.data = extend(this.data, paymentData);

    this.options = extend({}, gpwpConfig.defaultOptions);
    this.options = extend(this.options, options);
}


GPWebPayRequest.prototype.sign = function(cb) {
    var signBase = gpwpUtils.getSignatureBase(this.data, SIGN_BASE_KEYS);
    var that = this;

    gpwpUtils.sign(signBase, this.options.privateKeyPath, this.options.privateKeyPass, function(err, sign){
        if(err){
            return cb(err);
        }
        that.data.DIGEST = sign;
        cb();
    });

};


GPWebPayRequest.prototype.getRedirectUrl = function() {
    var params = '?';

    for(var dataKey in this.data){
        if(this.data[dataKey]){
            params += dataKey + '=' + encodeURIComponent(this.data[dataKey]) + '&';
        }
    }

    params = params.substr(0, params.length-1);

    return this.options.gatewayUrl + params;
};


GPWebPayRequest.prototype.validateFields = function() {

    var data = this.data;
    var reqFailed = REQUIRED_FIELDS.filter(function(fieldKey){
        return !data[fieldKey] || data[fieldKey] === '';
    });
    if(reqFailed.length > 0){
        return ['Missing required fields.', reqFailed];
    }
};


module.exports = GPWebPayRequest;