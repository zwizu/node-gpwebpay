'use strict';

var version = exports.version = require('../package').version;

var supportedPaymentMethods = exports.supportedPaymentMethods = {
    CREDITCARD: 'CRD',
    MASTERCARDMOBILE: 'MCM',
    MASTERPASS: 'MPS'
};

var defaultOptions = exports.defaultOptions = {
    gatewayUrl: 'https://test.3dsecure.gpwebpay.com/pgw/order.do',
    privateKeyPath: '',
    privateKeyPass: '',
    publicKeyPath: ''
};

var defaultData = exports.defaultData = {
    OPERATION: 'CREATE_ORDER',
    DEPOSITFLAG: 1
};


